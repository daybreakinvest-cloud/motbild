import { supabase } from "@/lib/supabase";

export interface Fotnot {
  nr: number;
  text: string;
}

export interface ArtikelRow {
  id: string;
  slug: string;
  slug_en: string | null;
  titel: string;
  titel_en: string | null;
  ingress: string | null;
  ingress_en: string | null;
  innehall: string | null;
  innehall_en: string | null;
  fotnoter: Fotnot[] | null;
  fotnoter_en: Fotnot[] | null;
  forfattare: string | null;
  publicerad_at: string | null;
  publicerad: boolean;
  kategori_id: string | null;
  taggar: string[] | null;
  taggar_en: string[] | null;
  reviderad_at: string | null;
  sammanfattning: string | null;
  sammanfattning_en: string | null;
  inledning: string | null;
  inledning_en: string | null;
  problemformulering: string | null;
  problemformulering_en: string | null;
  text_och_kontext: string | null;
  text_och_kontext_en: string | null;
  exegetisk_analys: string | null;
  exegetisk_analys_en: string | null;
  teologisk_analys: string | null;
  teologisk_analys_en: string | null;
  slutsats: string | null;
  slutsats_en: string | null;
  referenser: string | null;
  referenser_en: string | null;
  oversatt_till_engelska: boolean;
  oversattningsstatus: string;
  substack_url: string | null;
}

export interface KategoriNod {
  id: string;
  namn: string;
  namnEn: string;
  underkategorier?: KategoriNod[];
}

export const KATEGORI_TRAD: KategoriNod[] = [
  {
    id: "teologi-proper",
    namn: "Teologi proper (Läran om Gud)",
    namnEn: "Theology Proper (Doctrine of God)",
    underkategorier: [
      {
        id: "fadern",
        namn: "Fadern – den ende sanne Guden",
        namnEn: "The Father – the Only True God",
      },
      {
        id: "treenigheten",
        namn: "Treenigheten och kyrkohistorien",
        namnEn: "The Trinity and Church History",
      },
    ],
  },
  {
    id: "kristologi",
    namn: "Kristologi (Läran om Kristus)",
    namnEn: "Christology (Doctrine of Christ)",
    underkategorier: [
      {
        id: "preexistens",
        namn: "Kristi preexistens",
        namnEn: "Pre-existence of Christ",
        underkategorier: [
          { id: "johannes-pre", namn: "Johannes evangelium", namnEn: "Gospel of John" },
          { id: "paulus-pre", namn: "Paulus brev", namnEn: "Pauline Epistles" },
          { id: "gt-pre", namn: "Gamla Testamentet", namnEn: "Old Testament" },
        ],
      },
      {
        id: "gudom",
        namn: "Kristi gudomlighet",
        namnEn: "Divinity of Christ",
        underkategorier: [
          {
            id: "titlar",
            namn: "Herren, Frälsaren, Alfa & Omega",
            namnEn: "Lord, Savior, Alpha & Omega",
          },
          {
            id: "ambeten",
            namn: "Profeten, Översteprästen, Kungen",
            namnEn: "Prophet, High Priest, King",
          },
        ],
      },
      {
        id: "manniskan-jesus",
        namn: "Människan Jesus",
        namnEn: "The Human Jesus",
      },
    ],
  },
  {
    id: "pneumatologi",
    namn: "Pneumatologi (Den helige Ande)",
    namnEn: "Pneumatology (The Holy Spirit)",
    underkategorier: [
      {
        id: "faderns-ande",
        namn: "Faderns egen ande och kraft",
        namnEn: "The Father's Own Spirit and Power",
      },
      {
        id: "livgivande-ande",
        namn: "Kristus – den livgivande anden",
        namnEn: "Christ – the Life-Giving Spirit",
      },
    ],
  },
  {
    id: "soteriologi",
    namn: "Soteriologi (Frälsningen)",
    namnEn: "Soteriology (Salvation)",
  },
];

export async function fetchSwedishArticles(): Promise<ArtikelRow[]> {
  const { data, error } = await supabase
    .from("artiklar")
    .select("*")
    .eq("publicerad", true)
    .order("publicerad_at", { ascending: false });

  if (error) {
    console.error("Error fetching Swedish articles:", error);
    return [];
  }
  return (data ?? []) as ArtikelRow[];
}

export async function fetchSwedishArticleBySlug(slug: string): Promise<ArtikelRow | null> {
  const { data, error } = await supabase
    .from("artiklar")
    .select("*")
    .eq("publicerad", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching Swedish article:", error);
    return null;
  }
  return (data as ArtikelRow | null) ?? null;
}

export async function fetchEnglishArticles(): Promise<ArtikelRow[]> {
  const { data, error } = await supabase
    .from("artiklar")
    .select("*")
    .eq("publicerad", true)
    .eq("oversatt_till_engelska", true)
    .eq("oversattningsstatus", "klar")
    .not("slug_en", "is", null)
    .order("publicerad_at", { ascending: false });

  if (error) {
    console.error("Error fetching English articles:", error);
    return [];
  }
  return (data ?? []) as ArtikelRow[];
}

export async function fetchEnglishArticleBySlug(slugEn: string): Promise<ArtikelRow | null> {
  const { data, error } = await supabase
    .from("artiklar")
    .select("*")
    .eq("publicerad", true)
    .eq("oversatt_till_engelska", true)
    .eq("oversattningsstatus", "klar")
    .eq("slug_en", slugEn)
    .maybeSingle();

  if (error) {
    console.error("Error fetching English article:", error);
    return null;
  }
  return (data as ArtikelRow | null) ?? null;
}

export function formatArticleDate(iso: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function parseReferenser(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
