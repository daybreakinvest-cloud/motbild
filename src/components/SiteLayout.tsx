import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { Menu, X, Mail, Phone, MapPin, Globe } from "lucide-react";

const BASE_URL = "https://www.motbild.se";

const SV_TO_EN: Record<string, string> = {
  "/": "/en",
  "/artiklar": "/en/articles",
  "/om-oss": "/en/about",
  "/debatt": "/en/debate",
  "/medarrangor": "/en/co-host",
  "/bli-medlem": "/en/join",
  "/stadgar": "/en/bylaws",
  "/integritetspolicy": "/en/privacy-policy",
  "/cookiepolicy": "/en/cookie-policy",
};

const EN_TO_SV: Record<string, string> = Object.fromEntries(
  Object.entries(SV_TO_EN).map(([sv, en]) => [en, sv])
);

const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Motbild – Bibliskt Unitariskt Nätverk",
    description:
      "Bibliskt unitariskt nätverk för självständig bibelforskning, språklig exegetik och öppna teologiska debatter i Sverige.",
  },
  "/en": {
    title: "Motbild – Biblical Unitarian Network",
    description:
      "Biblical Unitarian network for independent biblical scholarship, linguistic exegesis, and open theological debate.",
  },
  "/artiklar": {
    title: "Artiklar | Motbild",
    description:
      "Akademiska och exegetiska artiklar utifrån ett bibliskt unitariskt perspektiv – grundtextanalys fri från kyrkotradition.",
  },
  "/en/articles": {
    title: "Articles | Motbild",
    description:
      "Scholarly and exegetical articles from a Biblical Unitarian perspective—original-text analysis free from church tradition.",
  },
  "/om-oss": {
    title: "Om oss | Motbild",
    description:
      "Vårt uppdrag, vår bibliskt unitariska trosgrund och vår övertygelse att hålla Skriften som högsta auktoritet.",
  },
  "/en/about": {
    title: "About us | Motbild",
    description:
      "Our mission, Biblical Unitarian statement of faith, and commitment to holding Scripture as the highest authority.",
  },
  "/debatt": {
    title: "Offentliga debatter | Motbild",
    description:
      "Varför offentliga debatter? Läs om Motbilds pedagogiska debattformat och hur en debattkväll går till.",
  },
  "/en/debate": {
    title: "Public debates | Motbild",
    description:
      "Why public debates? Learn about Motbild’s pedagogical debate format and how a three-hour debate evening is structured.",
  },
  "/medarrangor": {
    title: "Medarrangör | Motbild",
    description:
      "Låt er församling stå som värd för en modererad offentlig debatt om Treenigheten, Kristi gudom och Bibeln.",
  },
  "/en/co-host": {
    title: "Co-host a debate | Motbild",
    description:
      "Partner with Motbild to host a moderated public debate in your congregation on the Trinity, Christology, and Scripture.",
  },
  "/bli-medlem": {
    title: "Bli medlem | Motbild",
    description:
      "Ansök om avgiftsfritt medlemskap i Motbild – Bibliskt Unitariskt Nätverk och engagera dig i arbetet.",
  },
  "/en/join": {
    title: "Join us | Motbild",
    description:
      "Apply for free membership in Motbild – Biblical Unitarian Network and contribute to research, debate, and education.",
  },
  "/stadgar": {
    title: "Stadgar | Motbild",
    description:
      "Officiella föreningsstadgar för Motbild – Bibliskt Unitariskt Nätverk (säte: Stockholm).",
  },
  "/en/bylaws": {
    title: "Bylaws | Motbild",
    description:
      "Official association bylaws for Motbild – Biblical Unitarian Network (registered office: Stockholm, Sweden).",
  },
  "/integritetspolicy": {
    title: "Integritetspolicy | Motbild",
    description:
      "Information om hur Motbild behandlar personuppgifter i enlighet med dataskyddsförordningen (GDPR).",
  },
  "/en/privacy-policy": {
    title: "Privacy Policy | Motbild",
    description:
      "Information on how the Motbild association processes personal data in accordance with the GDPR.",
  },
  "/cookiepolicy": {
    title: "Cookiepolicy | Motbild",
    description:
      "Information om hur motbild.se använder cookies och liknande tekniker.",
  },
  "/en/cookie-policy": {
    title: "Cookie Policy | Motbild",
    description:
      "Information on how motbild.se uses cookies and similar technologies.",
  },
};

function getTargetPaths(pathname: string) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const isEnglish = clean === "/en" || clean.startsWith("/en/");

  if (isEnglish) {
    if (clean.startsWith("/en/articles/")) {
      return { isEnglish: true, svPath: "/artiklar", enPath: clean };
    }
    return {
      isEnglish: true,
      svPath: EN_TO_SV[clean] ?? "/",
      enPath: clean,
    };
  }

  if (clean.startsWith("/artiklar/")) {
    return { isEnglish: false, svPath: clean, enPath: "/en/articles" };
  }
  return {
    isEnglish: false,
    svPath: clean,
    enPath: SV_TO_EN[clean] ?? "/en",
  };
}

function upsertHeadLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertMetaTag(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

interface SiteLayoutProps {
  children: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
}

export function SiteLayout({ children, seoTitle, seoDescription }: SiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { pathname } = useLocation();
  const { isEnglish, svPath, enPath } = getTargetPaths(pathname);

  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "sv";

    const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const defaultSeo = PAGE_SEO[cleanPath] ?? {
      title: isEnglish
        ? "Motbild – Biblical Unitarian Network"
        : "Motbild – Bibliskt Unitariskt Nätverk",
      description: isEnglish
        ? "Biblical Unitarian network for independent biblical scholarship, linguistic exegesis, and open theological debate."
        : "Bibliskt unitariskt nätverk för självständig bibelforskning, språklig exegetik och öppna teologiska debatter i Sverige.",
    };

    document.title = seoTitle ? `${seoTitle} | Motbild` : defaultSeo.title;
    upsertMetaTag("description", seoDescription || defaultSeo.description);

    const canonicalUrl = `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;
    upsertHeadLink("canonical", canonicalUrl);

    const isArticleDetail =
      cleanPath.startsWith("/artiklar/") || cleanPath.startsWith("/en/articles/");

    if (!isArticleDetail) {
      const svUrl = `${BASE_URL}${svPath === "/" ? "" : svPath}`;
      const enUrl = `${BASE_URL}${enPath}`;
      upsertHeadLink("alternate", svUrl, "sv");
      upsertHeadLink("alternate", enUrl, "en");
      upsertHeadLink("alternate", svUrl, "x-default");
    } else {
      for (const lang of ["sv", "en", "x-default"]) {
        document.head
          .querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
          ?.remove();
      }
    }
  }, [isEnglish, pathname, svPath, enPath, seoTitle, seoDescription]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const homePath = isEnglish ? "/en" : "/";
  const articlesPath = isEnglish ? "/en/articles" : "/artiklar";

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#090023] flex flex-col font-serif selection:bg-[#FFA8CD] selection:text-[#090023]">
      {/* 1. HEADER */}
      <header
        className={`h-20 bg-[#FFFFFF] border-b border-black/10 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0 shadow-sm" : "-translate-y-full"
        }`}
      >
        {/* LOGO & MENY TILL VÄNSTER */}
        <div className="flex items-center gap-8">
          <Link to={homePath as "/"} className="flex items-center">
            <img src="/logo-header.svg" alt="Motbild" className="h-4 md:h-5 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-serif font-medium text-[#090023]">
            <Link
              to={articlesPath as "/artiklar"}
              className="hover:underline transition-colors [&.active]:font-bold"
            >
              {isEnglish ? "Articles" : "Artiklar"}
            </Link>
          </nav>
        </div>

        {/* SPRÅKVÄXLARE + MOBILKNAPP TILL HÖGER */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-1.5 text-xs font-serif tracking-wider text-[#090023] bg-[#f3f0ed] px-3 py-1.5 rounded-full border border-black/10"
            aria-label={isEnglish ? "Language selector" : "Språkval"}
          >
            <Globe className="size-3.5 text-[#090023]" />
            {isEnglish ? (
              <Link to={svPath as "/"} className="hover:underline opacity-70 hover:opacity-100">
                SV
              </Link>
            ) : (
              <span className="font-bold">SV</span>
            )}
            <span className="opacity-40">|</span>
            {isEnglish ? (
              <span className="font-bold">EN</span>
            ) : (
              <Link to={enPath as "/"} className="hover:underline opacity-70 hover:opacity-100">
                EN
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#090023] cursor-pointer"
            aria-label={isEnglish ? "Menu" : "Meny"}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* MOBILMENY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090023] text-[#F9F8F5] px-6 py-6 border-b border-white/10 space-y-4 font-serif fixed top-20 left-0 right-0 z-40">
          <Link
            to={articlesPath as "/artiklar"}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:underline text-[#F9F8F5]"
          >
            {isEnglish ? "Articles" : "Artiklar"}
          </Link>
        </div>
      )}

      {/* SIDANS INNEHÅLL */}
      <main className="flex-1 pt-20">{children}</main>

      {/* 2. FOOTER */}
      <footer className="bg-[#090023] text-[#F9F8F5] pt-14 pb-12 border-t border-white/10 font-serif">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Kolumn 1: Utbildning / Education */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                {isEnglish ? "Education" : "Utbildning"}
              </p>
              <p>
                <Link to={(isEnglish ? "/en/articles" : "/artiklar") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "Articles" : "Artiklar"}
                </Link>
              </p>
              <p>
                <Link to={(isEnglish ? "/en/debate" : "/debatt") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "Debate" : "Debatt"}
                </Link>
              </p>
              <p>
                <Link to={(isEnglish ? "/en/co-host" : "/medarrangor") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "Co-host" : "Medarrangör"}
                </Link>
              </p>
            </div>

            {/* Kolumn 2: Nätverk / Network */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                {isEnglish ? "Network" : "Nätverk"}
              </p>
              <p>
                <Link to={(isEnglish ? "/en/about" : "/om-oss") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "About us" : "Om oss"}
                </Link>
              </p>
              <p>
                <Link to={(isEnglish ? "/en/join" : "/bli-medlem") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "Join us" : "Bli medlem"}
                </Link>
              </p>
              <p>
                <Link to={(isEnglish ? "/en/bylaws" : "/stadgar") as "/"} className="text-[#F9F8F5] hover:underline">
                  {isEnglish ? "Bylaws" : "Stadgar"}
                </Link>
              </p>
            </div>

            {/* Kolumn 3: Juridik / Legal */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                {isEnglish ? "Legal" : "Juridik"}
              </p>
              <p>
                <Link
                  to={(isEnglish ? "/en/privacy-policy" : "/integritetspolicy") as "/"}
                  className="text-[#F9F8F5] hover:underline"
                >
                  {isEnglish ? "Privacy Policy" : "Integritetspolicy"}
                </Link>
              </p>
              <p>
                <Link
                  to={(isEnglish ? "/en/cookie-policy" : "/cookiepolicy") as "/"}
                  className="text-[#F9F8F5] hover:underline"
                >
                  {isEnglish ? "Cookie Policy" : "Cookiepolicy"}
                </Link>
              </p>
            </div>

            {/* Kolumn 4: Kontakt / Contact */}
            <div className="space-y-2.5 text-xs text-[#F9F8F5]">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                {isEnglish ? "Contact" : "Kontakt"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#F9F8F5] shrink-0" />{" "}
                {isEnglish
                  ? "Kavaljersstigen 16, 165 57 Hässelby, Sweden"
                  : "Kavaljersstigen 16, 165 57 Hässelby"}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#F9F8F5] shrink-0" /> support@motbild.se
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#F9F8F5] shrink-0" />{" "}
                {isEnglish ? "+46 73-330 29 83" : "073-330 29 83"}
              </p>
            </div>
          </div>

          {/* Fullbreddslogo */}
          <div className="py-12 border-b border-white/10 text-center">
            <Link
              to={homePath as "/"}
              className="block w-full"
              aria-label={isEnglish ? "Go to homepage" : "Till startsidan"}
            >
              <img
                src="/logo-footer.svg"
                alt="Motbild"
                className="w-full max-h-36 sm:max-h-48 md:max-h-60 mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Centrerad Copyright */}
          <div className="pt-8 text-center text-xs text-[#F9F8F5]">
            <p>
              {isEnglish
                ? `© ${new Date().getFullYear()} Motbild Association. Registered office: Stockholm, Sweden. All rights reserved. Kavaljersstigen 16, 165 57 Hässelby, Sweden. Organization No.: 802557-3059`
                : `© ${new Date().getFullYear()} Föreningen Motbild. Säte: Stockholm, Sverige. Alla rättigheter förbehållna. Kavaljersstigen 16, 165 57 Hässelby. Organisationsnummer: 802557-3059`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
