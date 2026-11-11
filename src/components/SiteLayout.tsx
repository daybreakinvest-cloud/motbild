import { Link } from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#090023] flex flex-col font-serif selection:bg-[#FFA8CD] selection:text-[#090023]">
      {/* 1. HEADER (Kritvit bakgrund för skarp kontrast) */}
      <header
        className={`h-20 bg-[#FFFFFF] border-b border-black/10 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0 shadow-sm" : "-translate-y-full"
        }`}
      >
        {/* LOGO & MENY TILL VÄNSTER */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src="/logo-header.svg" alt="Motbild" className="h-4 md:h-5 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-serif font-medium text-[#090023]">
            <Link
              to="/artiklar"
              className="hover:underline transition-colors [&.active]:font-bold"
            >
              Artiklar
            </Link>
          </nav>
        </div>

        {/* MOBILKNAPP */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#090023] cursor-pointer"
          aria-label="Meny"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* MOBILMENY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090023] text-[#F9F8F5] px-6 py-6 border-b border-white/10 space-y-4 font-serif fixed top-20 left-0 right-0 z-40">
          <Link
            to="/artiklar"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:underline text-[#F9F8F5]"
          >
            Artiklar
          </Link>
        </div>
      )}

      {/* SIDANS INNEHÅLL */}
      <main className="flex-1 pt-20">{children}</main>

      {/* 2. FOOTER (4 kolumner, centrerad fullbreddslogo och copyright) */}
      <footer className="bg-[#090023] text-[#F9F8F5] pt-14 pb-12 border-t border-white/10 font-serif">
        <div className="max-w-6xl mx-auto px-6">
          {/* FYRA KOLUMNER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Kolumn 1: Utbildning & Debatt */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Utbildning &amp; Debatt
              </p>
              <p>
                <Link to="/artiklar" className="text-[#F9F8F5] hover:underline">
                  Artiklar
                </Link>
              </p>
              <p>
                <Link to="/debatt" className="text-[#F9F8F5] hover:underline">
                  Debatt
                </Link>
              </p>
              <p>
                <Link to="/medarrangor" className="text-[#F9F8F5] hover:underline">
                  Medarrangör
                </Link>
              </p>
            </div>

            {/* Kolumn 2: Tro & Uppdrag */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Tro &amp; Uppdrag
              </p>
              <p>
                <Link to="/om-oss" className="text-[#F9F8F5] hover:underline">
                  Om oss
                </Link>
              </p>
              <p>
                <Link to="/bli-medlem" className="text-[#F9F8F5] hover:underline">
                  Ansök om medlemskap
                </Link>
              </p>
            </div>

            {/* Kolumn 3: Juridik */}
            <div className="space-y-2.5 text-xs">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Juridik
              </p>
              <p>
                <Link to="/stadgar" className="text-[#F9F8F5] hover:underline">
                  Stadgar
                </Link>
              </p>
              <p>
                <Link to="/integritetspolicy" className="text-[#F9F8F5] hover:underline">
                  Integritetspolicy
                </Link>
              </p>
            </div>

            {/* Kolumn 4: Kontakt */}
            <div className="space-y-2.5 text-xs text-[#F9F8F5]">
              <p className="font-serif font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Kontakt
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#F9F8F5] shrink-0" /> Kavaljersstigen 16, 165 57 Hässelby
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#F9F8F5] shrink-0" /> support@motbild.se
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#F9F8F5] shrink-0" /> 073-330 29 83
              </p>
            </div>
          </div>

          {/* Fullbreddslogo */}
          <div className="py-12 border-b border-white/10 text-center">
            <Link to="/" className="block w-full" aria-label="Till startsidan">
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
              © {new Date().getFullYear()} Föreningen Motbild. Säte: Stockholm, Sverige. Alla rättigheter förbehållna. Kavaljersstigen 16, 165 57 Hässelby. Organisationsnummer: 802557-3059
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
