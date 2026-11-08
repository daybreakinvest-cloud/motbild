import { Link } from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { Menu, X, Mail, Phone, MapPin, Heart } from "lucide-react";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart skroll: gömmer headern när man skrollar ner, visar den när man skrollar upp
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Alltid synlig högst upp på sidan
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Skrollar neråt -> göm headern
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Skrollar uppåt -> visa headern direkt
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#090023] flex flex-col font-serif selection:bg-[#FFA8CD] selection:text-[#090023]">
      {/* 1. SMART HEADER (Glider undan nedåt, glider fram uppåt) */}
      <header
        className={`h-20 bg-[#FFFFFF] border-b border-black/10 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0 shadow-sm" : "-translate-y-full"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/logo-header.svg" alt="Motbild" className="h-4 md:h-5 w-auto object-contain" />
        </Link>

        {/* MENY FÖR DATOR */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-[#090023]">
          <Link
            to="/artiklar"
            className="hover:underline transition-colors [&.active]:font-bold"
          >
            Artiklar
          </Link>
        </nav>

        {/* MOBILKNAPP */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#090023]"
          aria-label="Meny"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* MOBILMENY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090023] text-[#F9F8F5] px-6 py-6 border-b border-white/10 space-y-4 font-sans fixed top-20 left-0 right-0 z-40">
          <Link to="/artiklar" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Artiklar
          </Link>
          <Link to="/debatt" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Debatt
          </Link>
          <Link to="/medarrangor" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#FFA8CD] font-bold">
            Medarrangör
          </Link>
        </div>
      )}

      {/* SIDANS INNEHÅLL (pt-20 så att inte headern täcker översta delen av sidan) */}
      <main className="flex-1 pt-20">{children}</main>

      {/* 2. FOOTER */}
      <footer className="bg-[#090023] text-[#F9F8F5] pt-14 pb-12 border-t border-white/10 font-sans">
        <div className="max-w-5xl mx-auto px-6">
          {/* ÖVRE DEL: MENY, INFORMATION & KONTAKT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
            {/* Kolumn 1 */}
            <div>
              <p className="text-xs text-[#F9F8F5]/70 max-w-sm leading-relaxed mb-4 font-serif">
                Plattform för självständig prövning, biblisk forskning och öppen teologisk debatt.
              </p>
            </div>
            {/* Kolumn 2 */}
            <div className="space-y-2 text-xs">
              <p className="font-bold uppercase tracking-wider text-white text-[11px] mb-2">Information &amp; Förening</p>
              <p>
                <Link to="/om-oss" className="text-[#F9F8F5]/80 hover:text-white hover:underline">
                  Om oss &amp; Vår tro
                </Link>
              </p>
              <p>
                <Link to="/bli-medlem" className="text-[#F9F8F5]/80 hover:text-white hover:underline">
                  Ansök om medlemskap
                </Link>
              </p>
              <p>
                <Link to="/stadgar" className="text-[#F9F8F5]/80 hover:text-white hover:underline">
                  Föreningens stadgar
                </Link>
              </p>
            </div>

            {/* Kolumn 3 */}
            <div className="space-y-2 text-xs text-[#F9F8F5]/80 md:text-right">
              <p className="font-bold uppercase tracking-wider text-white text-[11px] mb-2">Kontakt</p>
              <p className="flex md:justify-end items-center gap-2">
                <MapPin className="size-3.5 text-[#F9F8F5]/60" /> Kavaljersstigen 16, 165 57 Hässelby
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Mail className="size-3.5 text-[#F9F8F5]/60" /> support@motbild.se
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Phone className="size-3.5 text-[#F9F8F5]/60" /> 073-330 29 83
              </p>
            </div>
          </div>

          {/* MITTENDEL: ENORM FULLBREDS-LOGO I FOOTERN */}
          <div className="py-12 border-b border-white/10 text-center">
            <Link to="/" className="block w-full" aria-label="Till startsidan">
              <img
                src="/logo-footer.svg"
                alt="Motbild"
                className="w-full max-h-36 sm:max-h-48 md:max-h-60 mx-auto object-contain"
              />
            </Link>
          </div>

          {/* NEDRE DEL: COPYRIGHT, FÖRENINGEN & SÄTE */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9F8F5]/60">
            <p>
              © {new Date().getFullYear()} Föreningen Motbild. Säte: Stockholm, Sverige.
            </p>
            <div className="flex gap-4">
              <Link to="/stadgar" className="hover:underline">Stadgar</Link>
              <Link to="/integritetspolicy" className="hover:underline">Integritetspolicy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
