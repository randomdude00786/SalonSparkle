import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import session from "express-session";
import MemoryStore from "memorystore";

// Declare session data for TypeScript
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

// Helper function to hash passwords
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${hash}.${salt}`;
}

// Helper function to verify passwords
function verifyPassword(storedPassword: string, suppliedPassword: string): boolean {
  const [hashedPassword, salt] = storedPassword.split(".");
  const suppliedHash = scryptSync(suppliedPassword, salt, 64).toString("hex");
  return hashedPassword === suppliedHash;
}

// We'll use the session store from our storage module

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(
    session({
      store: storage.sessionStore,
      secret: "salon-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
    })
  );
  
  // Register user endpoint
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Hash the password before storing
      const hashedUserData = {
        ...userData,
        password: hashPassword(userData.password)
      };
      
      // Create the user
      const user = await storage.createUser(hashedUserData);
      
      // Set session
      req.session.userId = user.id;
      
      // Return the user without the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Invalid user data", 
          errors: validationError.message 
        });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });
  
  // Login endpoint
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Find the user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Verify password
      if (!verifyPassword(user.password, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Return the user without the password
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });
  
  // Logout endpoint
  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  // Get current user endpoint
  app.get("/api/user", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return the user without the password
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // API endpoint for submitting appointment requests
  app.post("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Validate the request body using the insert schema
      const appointmentData = insertAppointmentSchema.parse(req.body);
      
      // Create the appointment in storage
      const appointment = await storage.createAppointment(appointmentData);
      
      // Return the created appointment
      res.status(201).json({
        message: "Appointment request received successfully",
        appointment
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Invalid appointment data", 
          errors: validationError.message 
        });
      } else {
        // Handle other errors
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Failed to create appointment" });
      }
    }
  });

  // API endpoint to get all appointments (for authenticated users)
  app.get("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
