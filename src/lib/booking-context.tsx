"use client";

import * as React from "react";
import {
  EMPTY_DRAFT,
  type BookingDraft,
  type BookingStatus,
  type StoredBooking,
} from "./booking";
import { generateReference } from "./utils";

const STORAGE_KEY = "bntran.demo.bookings.v1";
const LAST_KEY = "bntran.demo.lastBooking.v1";
const DRAFT_KEY = "bntran.demo.draft.v1";

type Ctx = {
  bookings: StoredBooking[];
  lastBooking: StoredBooking | null;
  draft: BookingDraft;
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  resetDraft: () => void;
  saveDraft: () => void;
  submitBooking: (draft: BookingDraft) => Promise<StoredBooking>;
  updateStatus: (id: string, status: BookingStatus) => Promise<void>;
  clearAll: () => void;
  storageMode: "synced" | "local";
  ready: boolean;
};

const BookingContext = React.createContext<Ctx | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / full storage — the demo still works in memory */
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = React.useState<StoredBooking[]>([]);
  const [lastBooking, setLastBooking] = React.useState<StoredBooking | null>(null);
  const [draft, setDraft] = React.useState<BookingDraft>(EMPTY_DRAFT);
  const [storageMode, setStorageMode] = React.useState<"synced" | "local">("local");
  const [ready, setReady] = React.useState(false);
  /** Local reference counter — survives rapid consecutive submits. */
  const seqRef = React.useRef(0);

  /* hydrate */
  React.useEffect(() => {
    const stored = read<StoredBooking[]>(STORAGE_KEY, []);
    seqRef.current = stored.length;
    setBookings(stored);
    setLastBooking(read<StoredBooking | null>(LAST_KEY, null));
    const savedDraft = read<Partial<BookingDraft>>(DRAFT_KEY, {});
    setDraft({ ...EMPTY_DRAFT, ...savedDraft, date: savedDraft.date || EMPTY_DRAFT.date });

    // Best-effort sync with the API (Postgres). If it's unavailable the
    // demo keeps running from local state — nothing breaks.
    (async () => {
      try {
        const res = await fetch("/api/bookings", { cache: "no-store" });
        if (!res.ok) throw new Error("offline");
        const data = (await res.json()) as { ok: boolean; bookings?: StoredBooking[] };
        if (data.ok && Array.isArray(data.bookings)) {
          setStorageMode("synced");
          setBookings((local) => {
            const byRef = new Map<string, StoredBooking>();
            data.bookings?.forEach((b) => byRef.set(b.reference, b));
            local.forEach((b) => {
              if (!byRef.has(b.reference)) byRef.set(b.reference, b);
            });
            const merged = [...byRef.values()].sort((a, b) =>
              b.createdAt.localeCompare(a.createdAt),
            );
            write(STORAGE_KEY, merged);
            return merged;
          });
        }
      } catch {
        setStorageMode("local");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const saveDraft = React.useCallback(() => {
    write(DRAFT_KEY, draft);
  }, [draft]);

  const resetDraft = React.useCallback(() => {
    setDraft(EMPTY_DRAFT);
    write(DRAFT_KEY, {});
  }, []);

  const submitBooking = React.useCallback(
    async (values: BookingDraft): Promise<StoredBooking> => {
      const localRecord: StoredBooking = {
        ...values,
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `local-${Date.now()}`,
        reference: generateReference(++seqRef.current),
        status: "New",
        createdAt: new Date().toISOString(),
      };

      let record = localRecord;
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          const data = (await res.json()) as { ok: boolean; booking?: StoredBooking };
          if (data.ok && data.booking) {
            record = { ...localRecord, ...data.booking };
            setStorageMode("synced");
          }
        }
      } catch {
        setStorageMode("local");
      }

      setBookings((prev) => {
        const next = [record, ...prev.filter((b) => b.reference !== record.reference)];
        write(STORAGE_KEY, next);
        return next;
      });
      setLastBooking(record);
      write(LAST_KEY, record);
      return record;
    },
    [],
  );

  const updateStatus = React.useCallback(async (id: string, status: BookingStatus) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id || b.reference === id ? { ...b, status } : b));
      write(STORAGE_KEY, next);
      return next;
    });
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch {
      /* demo continues locally */
    }
  }, []);

  const clearAll = React.useCallback(() => {
    setBookings([]);
    write(STORAGE_KEY, []);
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({
      bookings,
      lastBooking,
      draft,
      setDraft,
      resetDraft,
      saveDraft,
      submitBooking,
      updateStatus,
      clearAll,
      storageMode,
      ready,
    }),
    [
      bookings,
      lastBooking,
      draft,
      resetDraft,
      saveDraft,
      submitBooking,
      updateStatus,
      clearAll,
      storageMode,
      ready,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used inside <BookingProvider>");
  }
  return ctx;
}
