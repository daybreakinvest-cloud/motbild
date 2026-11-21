import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.motbild.se";

const STATIC_PAIRS = [
  { sv: "/", en: "/en", priority: "1.0" },
  { sv: "/artiklar", en: "/en/articles", priority: "0.9" },
  { sv: "/om-oss", en: "/en/about", priority: "0.8" },
  { sv: "/debatt", en: "/en/debate", priority: "0.8" },
  { sv: "/medarrangor", en: "/en/co-host", priority: "0.8" },
  { sv: "/bli-medlem", en: "/en/join", priority: "0.8" },
  { sv: "/stadgar", en: "/en/bylaws", priority: "0.5" },
  { sv: "/integritetspolicy", en: "/en/privacy-policy", priority: "0.3" },
  { sv: "/cookiepolicy", en: "/en/cookie-policy", priority: "0.3" },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(options: {
  loc: string;
  lastmod?: string | null;
  priority: string;
  alternates?: { lang: string; href: string }[];
}): string {
  const lines = [`  <url>`, `    <loc>${escapeXml(options.loc)}</loc>`];
  if (options.lastmod) {
    lines.push(`    <lastmod>${escapeXml(options.lastmod.slice(0, 10))}</lastmod>`);
  }
  if (options.alternates) {
    for (const alt of options.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}" />`
      );
    }
  }
  lines.push(`    <priority>${options.priority}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
}

export default {
  async fetch() {
    const supabaseUrl =
      process.env.VITE_SUPABASE_URL || "https://mcglpgfmyqscmemeszgd.supabase.co";
    const supabaseKey =
      process.env.VITE_SUPABASE_ANON_KEY ||
      "sb_publishable_NWVbRb1w62MTcMmW0ImfNg_-N4vaTj6";

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles } = await supabase
      .from("artiklar")
      .select(
        "slug, slug_en, publicerad_at, reviderad_at, oversatt_till_engelska, oversattningsstatus"
      )
      .eq("publicerad", true)
      .order("publicerad_at", { ascending: false });

    const entries: string[] = [];

    for (const pair of STATIC_PAIRS) {
      const svUrl = `${BASE_URL}${pair.sv === "/" ? "" : pair.sv}`;
      const enUrl = `${BASE_URL}${pair.en}`;
      const alts = [
        { lang: "sv", href: svUrl },
        { lang: "en", href: enUrl },
        { lang: "x-default", href: svUrl },
      ];

      entries.push(buildUrlEntry({ loc: svUrl, priority: pair.priority, alternates: alts }));
      entries.push(buildUrlEntry({ loc: enUrl, priority: pair.priority, alternates: alts }));
    }

    for (const art of articles ?? []) {
      const svUrl = `${BASE_URL}/artiklar/${art.slug}`;
      const lastmod = art.reviderad_at || art.publicerad_at || null;
      const hasEn =
        Boolean(art.oversatt_till_engelska) &&
        art.oversattningsstatus === "klar" &&
        Boolean(art.slug_en);

      if (hasEn && art.slug_en) {
        const enUrl = `${BASE_URL}/en/articles/${art.slug_en}`;
        const alts = [
          { lang: "sv", href: svUrl },
          { lang: "en", href: enUrl },
          { lang: "x-default", href: svUrl },
        ];
        entries.push(
          buildUrlEntry({ loc: svUrl, lastmod, priority: "0.9", alternates: alts })
        );
        entries.push(
          buildUrlEntry({ loc: enUrl, lastmod, priority: "0.9", alternates: alts })
        );
      } else {
        entries.push(
          buildUrlEntry({
            loc: svUrl,
            lastmod,
            priority: "0.9",
            alternates: [{ lang: "sv", href: svUrl }],
          })
        );
      }
    }

    const xml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
      ...entries,
      `</urlset>`,
    ].join("\n");

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    });
  },
};
