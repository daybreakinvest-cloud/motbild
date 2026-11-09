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
      {/* 1. HEADER */}
      <header
        className={`h-20 bg-[#FFFFFF] border-b border-black/10 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0 shadow-sm" : "-translate-y-full"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/logo-header.svg" alt="Motbild" className="h-4 md:h-5 w-auto object-contain" />
        </Link>

        {/* MENY DATOR (Endast Artiklar i Inter Tight) */}
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

      {/* MOBILMENY (Endast Artiklar i Inter Tight) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090023] text-[#F9F8F5] px-6 py-6 border-b border-white/10 space-y-4 font-sans fixed top-20 left-0 right-0 z-40">
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

      {/* 2. FOOTER */}
      <footer className="bg-[#090023] text-[#F9F8F5] pt-14 pb-12 border-t border-white/10 font-sans">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-white/10">
            {/* Länkar */}
            <div className="space-y-2.5 text-xs">
              <p className="font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Information &amp; Sidor
              </p>
              <p>
                <Link to="/om-oss" className="text-[#F9F8F5] hover:underline">
                  Om oss
                </Link>
              </p>
              <p>
                <Link to="/artiklar" className="text-[#F9F8F5] hover:underline">
                  Artiklar
                </Link>
              </p>
              <p>
                <Link to="/debatt" className="text-[#F9F8F5] hover:underline">
                  Debatter
                </Link>
              </p>
              <p>
                <Link to="/medarrangor" className="text-[#F9F8F5] hover:underline">
                  Medarrangör
                </Link>
              </p>
              <p>
                <Link to="/bli-medlem" className="text-[#F9F8F5] hover:underline">
                  Ansök om medlemskap
                </Link>
              </p>
              <p>
                <Link to="/stadgar" className="text-[#F9F8F5] hover:underline">
                  Föreningens stadgar
                </Link>
              </p>
              <p>
                <Link to="/integritetspolicy" className="text-[#F9F8F5] hover:underline">
                  Integritetspolicy
                </Link>
              </p>
            </div>

            {/* Kontakt */}
            <div className="space-y-2.5 text-xs text-[#F9F8F5] md:text-right">
              <p className="font-bold uppercase tracking-wider text-[#F9F8F5] text-[11px] mb-3">
                Kontakt
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <MapPin className="size-3.5 text-[#F9F8F5]" /> Kavaljersstigen 16, 165 57 Hässelby
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Mail className="size-3.5 text-[#F9F8F5]" /> support@motbild.se
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Phone className="size-3.5 text-[#F9F8F5]" /> 073-330 29 83
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

          {/* Centrerad Copyright med organisationsnummer */}
          <div className="pt-8 text-center text-xs text-[#F9F8F5]">
            <p>
              © {new Date().getFullYear()} Föreningen Motbild. Säte: Stockholm, Sverige. Alla rättigheter förbehållna. Kavaljersstigen 16, 165 57 Hässelby. Organisationsnummer: 802557-3059
            </p>
          </div>
