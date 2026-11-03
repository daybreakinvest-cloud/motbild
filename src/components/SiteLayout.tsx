import { Link } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#090023] flex flex-col font-serif selection:bg-[#FFA8CD] selection:text-[#090023]">
      {/* HEADER */}
      <header className="h-20 bg-[#FFFFFF] border-b border-black/10 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#090023] font-serif lowercase">
                motbild
              </span>
              <span className="text-xl font-mono text-[#090023] font-black">&gt;&lt;</span>
            </div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#090023]/60 -mt-1 font-semibold">
              Bibliskt Unitariskt Nätverk
            </span>
          </div>
        </Link>

        {/* Desktop-meny */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-[#090023]/80">
          <Link to="/om-oss" className="hover:text-[#090023] transition-colors [&.active]:font-bold [&.active]:text-[#090023]">
            Om oss
          </Link>
          <Link to="/artiklar" className="hover:text-[#090023] transition-colors [&.active]:font-bold [&.active]:text-[#090023]">
            Artiklar
          </Link>
          <Link to="/debatt" className="hover:text-[#090023] transition-colors [&.active]:font-bold [&.active]:text-[#090023]">
            Debatt
          </Link>
          <Link to="/medarrangor" className="hover:text-[#090023] transition-colors [&.active]:font-bold [&.active]:text-[#090023]">
            Medarrangör
          </Link>
          <Link
            to="/bli-medlem"
            className="px-4 py-2 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105"
          >
            Bli medlem
          </Link>
        </nav>

        {/* Mobilknapp */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#090023]"
          aria-label="Meny"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* Mobilmeny */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090023] text-[#F9F8F5] px-6 py-6 border-b border-white/10 space-y-4 font-sans">
          <Link to="/om-oss" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Om oss
          </Link>
          <Link to="/artiklar" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Artiklar
          </Link>
          <Link to="/debatt" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Debatt
          </Link>
          <Link to="/medarrangor" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#FFA8CD]">
            Medarrangör
          </Link>
          <Link
            to="/bli-medlem"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-3 rounded-xl bg-[#FFA8CD] text-[#090023] font-bold text-sm"
          >
            Bli medlem
          </Link>
        </div>
      )}

      {/* Sidinnehåll */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#090023] text-[#F9F8F5] pt-14 pb-12 border-t border-white/10 font-sans">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-serif font-bold text-white lowercase">motbild</span>
                <span className="text-lg font-mono text-white font-black">&gt;&lt;</span>
              </div>
              <p className="text-xs text-[#F9F8F5]/70 max-w-sm leading-relaxed mb-4">
                Bibliskt Unitariskt Nätverk – för självständig prövning, biblisk forskning och öppen teologisk debatt.
              </p>
              <div className="flex gap-4 text-xs">
                <Link to="/stadgar" className="hover:underline text-[#FFA8CD]">
                  Stadgar
                </Link>
                <Link to="/integritetspolicy" className="hover:underline text-[#FFA8CD]">
                  Integritetspolicy
                </Link>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#F9F8F5]/80 md:text-right">
              <p className="font-bold uppercase tracking-wider text-white text-[11px] mb-2">Kontakt</p>
              <p className="flex md:justify-end items-center gap-2">
                <MapPin className="size-3.5 text-[#FFA8CD]" /> Kavaljersstigen 16, 165 57 Hässelby
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Mail className="size-3.5 text-[#FFA8CD]" /> support@motbild.se
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Phone className="size-3.5 text-[#FFA8CD]" /> 073-330 29 83
              </p>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-[#F9F8F5]/50">
            © {new Date().getFullYear()} Motbild. Alla rättigheter förbehållna.
          </div>
        </div>
      </footer>
    </div>
  );
}
