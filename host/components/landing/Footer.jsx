import Link from "next/link";
import { FOOTER_LINKS } from "../../constants/LandingData.js";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-6 pt-12 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-wrap justify-between gap-10 pb-10 border-b border-stone-100">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 font-serif-display text-xl text-stone-900 mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              IdeaProof
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              The community platform for startup founders to validate ideas
              before they build.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-4">
                  {group.heading}
                </h4>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-stone-900 transition-colors mb-2.5 no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} IdeaProof. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookies", "/cookies"]].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors no-underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}