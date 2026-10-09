/**
 * ============================================================
 *  PHOTOGRAPHY REGISTRY
 * ------------------------------------------------------------
 *  All photos are placeholders from Pexels (free licence).
 *  Swap any URL below with your own photography — the alt text
 *  is written for screen readers and for SEO, so update it too.
 * ============================================================
 */

const pexels = (id: number, w = 1600, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

export type Photo = { src: string; alt: string; credit?: string };

export const IMAGES = {
  /** 1. Hero — a polished dark sedan on a quiet street in first light. */
  hero: {
    src: pexels(35628774, 2200),
    alt: "A polished black executive sedan parked on a quiet city street in soft early-morning light.",
    credit: "Oli Liao / Pexels",
  },
  /** 2. Chauffeur holding the rear door open for a professional. */
  doorService: {
    src: pexels(18183694, 1600),
    alt: "A chauffeur in a dark suit holding open the rear door of a sedan for a professional passenger.",
    credit: "Gustavo Henrique / Pexels",
  },
  doorServiceAlt: {
    src: pexels(8425044, 1400),
    alt: "A driver's hand opening the rear door of a luxury car on wet stone pavement.",
    credit: "Pavel Danilyuk / Pexels",
  },
  /** 3. Interior of a luxury sedan, leather seats, warm light. */
  interior: {
    src: pexels(15264154, 1600),
    alt: "Warm sunlight falling across the leather seats and open door of a luxury sedan interior.",
    credit: "Vitali Adutskevich / Pexels",
  },
  interiorNight: {
    src: pexels(31779519, 1400),
    alt: "The illuminated dashboard and steering wheel of a luxury car at dusk.",
    credit: "Dmitry Ovsyannikov / Pexels",
  },
  /** 4. Airport arrivals. */
  airport: {
    src: pexels(3885527, 1600),
    alt: "A business traveler walking out of an airport terminal with luggage, ready to be met by a driver.",
    credit: "Gustavo Fring / Pexels",
  },
  /** 5. Washington DC skyline and monuments at golden hour. */
  dcSkyline: {
    src: pexels(32275432, 2000),
    alt: "The United States Capitol dome in Washington, D.C. at golden hour.",
    credit: "Jimmy Padilla / Pexels",
  },
  dcMonument: {
    src: pexels(16131072, 1800),
    alt: "The Lincoln Memorial in Washington, D.C. at sunset with an American flag in the foreground.",
    credit: "David Dibert / Pexels",
  },
  dcBridge: {
    src: pexels(39586594, 1800),
    alt: "The Washington Monument rising above Arlington Memorial Bridge on a radiant afternoon.",
    credit: "Mark Stebnicki / Pexels",
  },
  /** 6. Business traveler working calmly in the back seat. */
  working: {
    src: pexels(8052209, 1600),
    alt: "A businessman in a suit working calmly on a laptop in the back seat of a chauffeured car.",
    credit: "RDNE Stock project / Pexels",
  },
  workingClose: {
    src: pexels(8052212, 1400),
    alt: "Close-up of a traveler typing on a laptop inside a quiet car interior.",
    credit: "RDNE Stock project / Pexels",
  },
  /** 7. Portrait placeholder for Ben — older, kind, professional. */
  ben: {
    src: pexels(29481124, 1200, 1500),
    alt: "Portrait of an older professional chauffeur in a dark suit, standing outdoors with a warm, kind expression.",
    credit: "Ravinder Ravi / Pexels",
  },
  benAlt: {
    src: pexels(19414282, 1200, 1400),
    alt: "A senior gentleman smiling warmly in a light suit — a placeholder portrait for Ben.",
    credit: "João Saplak / Pexels",
  },
  benDetail: {
    src: pexels(8899953, 1200, 1400),
    alt: "A senior man adjusting the cuff of his suit jacket before a ride.",
    credit: "SHVETS production / Pexels",
  },
  /** 8. Executive SUV in front of a modern office building. */
  suv: {
    src: pexels(3370332, 1600),
    alt: "A sleek black executive SUV parked on a city street in front of modern glass office buildings.",
    credit: "Ricky Esquivel / Pexels",
  },
  corporate: {
    src: pexels(31959282, 1600),
    alt: "A professional in a suit standing beside a black executive SUV in front of modern architecture.",
    credit: "Vika Glitter / Pexels",
  },
  /** 9. Human touches — keys, coffee, folded newspaper. */
  details: {
    src: pexels(8008626, 1400),
    alt: "A hand holding a coffee cup with car keys resting nearby — the small morning details of a chauffeured ride.",
    credit: "Nguyen Huy / Pexels",
  },
  /** 10. Road at dusk with soft light trails. */
  nightRoad: {
    src: pexels(6894528, 2000),
    alt: "A highway at dusk with soft red and white light trails from evening traffic.",
    credit: "Geni Hoka / Pexels",
  },
  nightRoadAlt: {
    src: pexels(22668130, 1800),
    alt: "Long-exposure lights on a quiet road at twilight.",
    credit: "Roman Stavila / Pexels",
  },
  sedan: {
    src: pexels(34852197, 1600),
    alt: "A sleek black luxury sedan parked on a calm, historic street.",
    credit: "Furkan Aktaş / Pexels",
  },
  citySedan: {
    src: pexels(15535501, 1600),
    alt: "An elegant black Mercedes sedan waiting on a city street.",
    credit: "Сергей Тарасов / Pexels",
  },
  airportDepartures: {
    src: pexels(3885601, 1400),
    alt: "A traveler with a suitcase checking the departures board inside a bright airport terminal.",
    credit: "Gustavo Fring / Pexels",
  },
} satisfies Record<string, Photo>;

export type ImageKey = keyof typeof IMAGES;
