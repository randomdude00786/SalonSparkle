import { users, type User, type InsertUser, type Appointment, type InsertAppointment } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Create the proper MemoryStore type
const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private userCurrentId: number;
  private appointmentCurrentId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.userCurrentId = 1;
    this.appointmentCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const createdAt = new Date();
    // Handle optional fields properly
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      createdAt,
      stylist: insertAppointment.stylist || null,
      notes: insertAppointment.notes || null
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
}

export const storage = new MemStorage();
