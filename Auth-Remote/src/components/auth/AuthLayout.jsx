import { BRAND } from "../../constants/authData";

export default function AuthLayout({ children, panelContent }) {
  return (
    <div className="min-h-screen flex">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-stone-900 relative overflow-hidden flex-col justify-between p-12">

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.06] auth-grid pointer-events-none" />

        {/* Orange glow bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(232,84,10,0.25),transparent)] pointer-events-none" />

        {/* Top: logo */}
        <a href="/" className="relative z-10 flex items-center gap-2 no-underline">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span className="font-serif-display text-2xl text-white tracking-tight">
            {BRAND.name}
          </span>
        </a>

        {/* Middle: dynamic panel content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          {panelContent}
        </div>

        {/* Bottom: tagline */}
        <p className="relative z-10 text-sm text-white/30 font-normal">
          {BRAND.tagline}
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col bg-stone-50 min-h-screen">

        {/* Mobile-only top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <a href="/" className="flex items-center gap-2 no-underline">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="font-serif-display text-xl text-stone-900">{BRAND.name}</span>
          </a>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}