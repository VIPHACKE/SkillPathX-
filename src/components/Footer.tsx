"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Home", href: "/" },
    { label: "Job Insights", href: "/jobs" },
    { label: "CV Generator", href: "/cv-generator" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/skillpathx-logo.png" 
                alt="SkillPathX AI" 
                className="w-10 h-10 rounded-xl object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">SkillPathX</span>
                <span className="text-xs text-[#00d4ff]">AI Career Navigator</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Transform your skills into a realistic career roadmap with AI-powered insights for the Indian job market.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00d4ff]" />
                <span>support@skillpathx.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00d4ff]" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform Stats</h3>
            <div className="space-y-3">
              <div className="glass-card p-3">
                <p className="text-2xl font-bold text-[#00d4ff]">10,000+</p>
                <p className="text-xs text-gray-400">Career Plans Generated</p>
              </div>
              <div className="glass-card p-3">
                <p className="text-2xl font-bold text-[#00d4ff]">500+</p>
                <p className="text-xs text-gray-400">CVs Created</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SkillPathX AI. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Hackathon Prototype • Made with 💙 in India
          </p>
        </div>
      </div>
    </footer>
  );
}
