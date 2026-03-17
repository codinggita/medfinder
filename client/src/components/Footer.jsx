import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Globe,
} from "lucide-react";

// ─── Text Hover Effect ────────────────────────────────────────────────────────
const TextHoverEffect = ({ text, duration }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none uppercase cursor-pointer"
    >
      <defs>
        <linearGradient id="medTextGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="25%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#6ee7b7" />
              <stop offset="75%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="medRevealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="medTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#medRevealMask)" />
        </mask>
      </defs>

      {/* Outline text on hover */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        style={{ fill: "transparent", stroke: "#d1fae5", fontFamily: "helvetica", fontSize: "7rem", fontWeight: 700, opacity: hovered ? 0.4 : 0 }}>
        {text}
      </text>

      {/* Animated draw-on text */}
      <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        style={{ fill: "transparent", stroke: "#10b981", fontFamily: "helvetica", fontSize: "7rem", fontWeight: 700 }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}>
        {text}
      </motion.text>

      {/* Color-reveal text */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#medTextGradient)" strokeWidth="0.3" mask="url(#medTextMask)"
        style={{ fill: "transparent", fontFamily: "helvetica", fontSize: "7rem", fontWeight: 700 }}>
        {text}
      </text>
    </svg>
  );
};

// ─── Footer Background ────────────────────────────────────────────────────────
const FooterBg = () => (
  <div
    className="absolute inset-0 z-0"
    style={{ background: "radial-gradient(125% 125% at 50% 10%, #0c1a1266 50%, #10b98133 100%)" }}
  />
);

// ─── Main Footer ──────────────────────────────────────────────────────────────
const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Find Medicine", to: "/search" },
        { label: "Pharmacies", to: "/pharmacies" },
        { label: "My Orders", to: "/profile/orders" },
        { label: "About Us", to: "/about" },
        { label: "Dashboard", to: "/dashboard" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { label: "FAQs", to: "#" },
        { label: "Contact Support", to: "#" },
        { label: "Live Chat", to: "#", pulse: true },
        { label: "Privacy Policy", to: "#" },
      ],
    },
  ];

  const contactInfo = [
    { icon: <Mail size={16} className="text-emerald-400 flex-shrink-0" />, text: "support@medfinder.in", href: "mailto:support@medfinder.in" },
    { icon: <Phone size={16} className="text-emerald-400 flex-shrink-0" />, text: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: <MapPin size={16} className="text-emerald-400 flex-shrink-0" />, text: "Mumbai, India" },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
    { icon: <Youtube size={18} />, label: "YouTube", href: "#" },
    { icon: <Globe size={18} />, label: "Website", href: "#" },
  ];

  return (
    <footer className="relative rounded-3xl overflow-hidden mx-6 mb-6 mt-16 bg-gray-950/90 text-gray-400">
      <div className="max-w-7xl mx-auto px-10 pt-14 pb-6 z-40 relative">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                <g transform="translate(42, 42) rotate(45)">
                  <defs>
                    <linearGradient id="footerPill" x1="0" y1="-35" x2="0" y2="35" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <rect x="-18" y="-35" width="36" height="70" rx="18" fill="url(#footerPill)" />
                </g>
                <circle cx="72" cy="72" r="22" fill="#10b981" stroke="white" strokeWidth="4" />
                <path d="M72,59 L72,85 M59,72 L85,72" stroke="white" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="text-2xl font-bold text-white">
                Med<span className="text-emerald-400">Finder</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted platform for finding medicines and connecting with verified local pharmacies. Fast delivery, real-time stock.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-900/60 rounded-xl px-3 py-2 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Delivery in 30–60 minutes
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link to={link.to} className="text-sm hover:text-emerald-400 transition-colors">
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-0.5 -right-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="text-sm hover:text-emerald-400 transition-colors">{item.text}</a>
                  ) : (
                    <span className="text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-800 my-6" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-5 text-gray-500">
            {socialLinks.map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="hover:text-emerald-400 transition-colors">
                {icon}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} MedFinder. All rights reserved.
          </p>
        </div>
      </div>

      {/* Hover text effect */}
      <div className="hidden lg:flex h-72 -mt-24 -mb-20 z-10 relative">
        <TextHoverEffect text="MedFinder" />
      </div>

      <FooterBg />
    </footer>
  );
};

export default Footer;
