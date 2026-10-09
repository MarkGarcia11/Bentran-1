import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Demo booking requests captured by the public booking wizard.
 * The wizard works entirely from local state; this table is the
 * "plug in a real backend later" seam — nothing else changes.
 */
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  reference: text("reference").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  tripDate: text("trip_date").notNull(),
  tripTime: text("trip_time").notNull(),
  returnTime: text("return_time"),
  pickup: text("pickup").notNull(),
  destination: text("destination").notNull(),
  tripType: text("trip_type").notNull().default("one-way"),
  passengers: integer("passengers").notNull().default(1),
  vehicleId: text("vehicle_id").notNull().default("executive-sedan"),
  vehicleName: text("vehicle_name"),
  company: text("company"),
  flightNumber: text("flight_number"),
  notes: text("notes"),
  status: text("status").notNull().default("New"),
  source: text("source").notNull().default("web"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Contact-form messages. */
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  topic: text("topic"),
  body: text("body").notNull(),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Corporate "team setup" requests. */
export const teamRequests = pgTable("team_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  teamSize: text("team_size"),
  monthlyRides: text("monthly_rides"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Ben's demo dashboard status: availability + where he is right now. */
export const siteStatus = pgTable("site_status", {
  id: integer("id").primaryKey().default(1),
  availableToday: boolean("available_today").notNull().default(true),
  currentLocation: text("current_location").notNull().default("Arlington, VA"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type BookingRow = typeof bookings.$inferSelect;
export type NewBookingRow = typeof bookings.$inferInsert;
