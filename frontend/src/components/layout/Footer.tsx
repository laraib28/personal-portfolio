"use client";

import Link from "next/link";
import { Code2, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 bg-card/50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-md shadow-primary/20">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl">Portfolio</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Full Stack AI Engineer specializing in building production-grade
              systems with modern technologies. Let&apos;s create something amazing together.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href="mailto:laraibadnan297@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/skills", label: "Skills" },
                { href: "/projects", label: "Projects" },
                { href: "/ai", label: "AI Work" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Interested in working together? Use the chat widget to get in touch.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              Chat Available
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Portfolio. Built with passion and precision.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Powered by Next.js, FastAPI & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
