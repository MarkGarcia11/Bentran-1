import { FLEET, type TripTypeId } from "./content";
import { isValidEmail, isValidPhone, todayISO } from "./utils";

export type BookingDraft = {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  returnTime: string;
  pickup: string;
  destination: string;
  tripType: TripTypeId;
  passengers: number;
  vehicleId: string;
  company: string;
  flightNumber: string;
  notes: string;
};

export type StoredBooking = BookingDraft & {
  id: string;
  reference: string;
  status: BookingStatus;
  createdAt: string;
};

export type BookingStatus = "New" | "Confirmed" | "Completed";

export const STATUSES: BookingStatus[] = ["New", "Confirmed", "Completed"];

export const EMPTY_DRAFT: BookingDraft = {
  fullName: "",
  phone: "",
  email: "",
  date: todayISO(),
  time: "",
  returnTime: "",
  pickup: "",
  destination: "",
  tripType: "one-way",
  passengers: 1,
  vehicleId: FLEET[0].id,
  company: "",
  flightNumber: "",
  notes: "",
};

export type FieldErrors = Partial<Record<keyof BookingDraft, string>>;

/** Kind, plain-language validation. Messages explain *why*. */
export function validateStep(step: number, draft: BookingDraft): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (draft.fullName.trim().length < 2) {
      errors.fullName = "Please add your name so I know who I'm meeting.";
    }
    if (!isValidPhone(draft.phone)) {
      errors.phone = "Please add a phone number so Ben can reach you.";
    }
    if (draft.email && !isValidEmail(draft.email)) {
      errors.email = "That email looks incomplete — mind checking it?";
    }
    if (!draft.date) {
      errors.date = "Please choose the day you need the car.";
    } else if (draft.date < todayISO()) {
      errors.date = "That day has already passed — pick today or later.";
    }
    if (!draft.time) {
      errors.time = "Please choose a pickup time. Fifteen minutes early is my habit.";
    }
    if (draft.tripType === "round-trip" && !draft.returnTime) {
      errors.returnTime = "Add a return time — I'll hold the car for you.";
    }
    if (draft.tripType === "round-trip" && draft.returnTime && draft.returnTime <= draft.time) {
      errors.returnTime = "The return should be after your pickup time.";
    }
    if (draft.pickup.trim().length < 4) {
      errors.pickup = "Where should I collect you? A street address or terminal works best.";
    }
    if (draft.destination.trim().length < 4) {
      errors.destination = "And where are we headed?";
    }
  }

  if (step === 1) {
    const vehicle = FLEET.find((v) => v.id === draft.vehicleId);
    if (!vehicle) {
      errors.vehicleId = "Please choose a vehicle.";
    } else if (draft.passengers > vehicle.passengers) {
      errors.vehicleId = `${vehicle.name} seats ${vehicle.passengers}. Please choose a larger vehicle for ${draft.passengers} passengers.`;
    }
  }

  return errors;
}

export function validateAll(draft: BookingDraft): FieldErrors {
  return { ...validateStep(0, draft), ...validateStep(1, draft) };
}

export function vehicleById(id: string) {
  return FLEET.find((v) => v.id === id) ?? FLEET[0];
}

/** Serialises a draft into a shareable URL for the confirmation page. */
export function draftToParams(draft: BookingDraft): string {
  const params = new URLSearchParams();
  Object.entries(draft).forEach(([key, value]) => {
    if (value === "" || value === undefined || value === null) return;
    params.set(key, String(value));
  });
  return params.toString();
}

export function draftFromParams(search: string): Partial<BookingDraft> {
  const params = new URLSearchParams(search);
  const out: Partial<BookingDraft> = {};
  (Object.keys(EMPTY_DRAFT) as (keyof BookingDraft)[]).forEach((key) => {
    const value = params.get(key);
    if (value === null) return;
    if (key === "passengers") {
      const n = Number(value);
      if (!Number.isNaN(n)) out.passengers = Math.min(12, Math.max(1, Math.round(n)));
      return;
    }
    out[key] = value as never;
  });
  return out;
}
