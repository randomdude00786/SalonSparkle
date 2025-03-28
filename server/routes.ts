import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for submitting appointment requests
  app.post("/api/appointments", async (req: Request, res: Response) => {
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

  // API endpoint to get all appointments (for admin purposes)
  app.get("/api/appointments", async (req: Request, res: Response) => {
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
