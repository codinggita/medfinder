import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Shield, Clock, Users, Package, Star, MapPin,
  CheckCircle, Zap, Globe, TrendingUp, Award, Mail, Phone,
  ArrowRight, Activity
} from 'lucide-react';

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {children}
    </span>
  );
}

export default function About() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: 50000, suffix: '+', label: 'Active Patients' },
    { icon: <Package className="w-6 h-6" />, value: 120000, suffix: '+', label: 'Orders Delivered' },
    { icon: <MapPin className="w-6 h-6" />, value: 300, suffix: '+', label: 'Partner Pharmacies' },
    { icon: <Star className="w-6 h-6" />, value: 4, suffix: '.9★', label: 'Average Rating' },
  ];

  const team = [
    { name: 'Dr. Priya Sharma', role: 'Co-founder & CEO', bg: 'from-emerald-400 to-teal-500', initials: 'PS', bio: 'MBBS, IIT Bombay. Ex-Apollo Hospitals. Passionate about healthcare access.' },
    { name: 'Rohan Mehta', role: 'CTO & Co-founder', bg: 'from-sky-400 to-blue-500', initials: 'RM', bio: 'Ex-Flipkart engineer. Built scalable systems for 10M+ users.' },
    { name: 'Ananya Kulkarni', role: 'Head of Operations', bg: 'from-violet-400 to-purple-500', initials: 'AK', bio: 'Supply chain expert. Ensured 99.8% on-time delivery across India.' },
    { name: 'Devisingh Rajput', role: 'Lead Developer', bg: 'from-amber-400 to-orange-500', initials: 'DR', bio: 'Full-stack developer. Designed the entire MedFinder platform from ground up.' },
  ];

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: 'Patient First', desc: 'Every decision we make is guided by what\'s best for the patient — faster access, lower cost, better care.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Verified & Safe', desc: 'All partner pharmacies are licensed, verified, and regularly audited for quality assurance.' },
    { icon: <Zap className="w-6 h-6" />, title: 'Speed Matters', desc: 'We\'ve built our logistics network to deliver medicines in 30–60 minutes, every single time.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Accessible for All', desc: 'We believe everyone deserves quick access to essential medicines, regardless of location.' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Always Improving', desc: 'Continuous innovation — from AI-powered medicine search to real-time stock updates.' },
    { icon: <Award className="w-6 h-6" />, title: 'Trust & Transparency', desc: 'Live inventory, honest pricing, and no hidden fees. What you see is exactly what you get.' },
  ];

  const steps = [
    { step: '01', title: 'Search Medicine', desc: 'Type the medicine name and instantly see which nearby pharmacies have it in stock with live quantity updates.', icon: <Activity className="w-8 h-8" /> },
    { step: '02', title: 'Add to Cart', desc: 'Pick your quantity, compare prices across pharmacies, and add items to your secure cart in one tap.', icon: <Package className="w-8 h-8" /> },
    { step: '03', title: 'Checkout Easily', desc: 'Enter your delivery address (saved for next time), choose Cash on Delivery, and confirm your order.', icon: <CheckCircle className="w-8 h-8" /> },
    { step: '04', title: 'Delivered Fast', desc: 'Your local pharmacy packs your order and delivers it to your doorstep within 30–60 minutes.', icon: <Clock className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-6">
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-emerald-100 dark:bg-emerald-950/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-teal-100 dark:bg-teal-950/30 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <SectionLabel>About MedFinder</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Medicine at your door,{' '}
            <span className="text-emerald-600 dark:text-emerald-400">in minutes.</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            MedFinder was built with a single belief — no one should ever struggle to find the medicines they need.
            We connect patients with verified local pharmacies for same-day, often same-hour delivery across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold transition-all shadow-xl shadow-emerald-600/20 hover:scale-[1.02] flex items-center justify-center gap-2">
              Find Medicine Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pharmacies"
              className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-2xl font-semibold transition-all">
              Browse Pharmacies
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-emerald-600 dark:bg-emerald-900/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mx-auto text-white">
                  {s.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-emerald-100 font-medium text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Redefining how India accesses healthcare.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-6">
              In India, millions of patients run from pharmacy to pharmacy searching for medicines — often during an emergency.
              We saw this problem first-hand and built MedFinder to fix it.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-10">
              By digitising local pharmacy inventory in real time and building last-mile delivery logistics, we've made it possible for anyone to find and receive their medicines within the hour, from their neighborhood pharmacies.
            </p>
            <ul className="space-y-3">
              {[
                'Real-time medicine availability from local pharmacies',
                'Delivery in 30–60 minutes to your doorstep',
                'Verified partner pharmacies with quality guarantee',
                'Saved delivery details for seamless re-ordering',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 rounded-[3rem] p-10 border-2 border-emerald-100 dark:border-emerald-900/40">
              <div className="space-y-6">
                {[
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 32 32" id="Pill">
                        <path fill="#34a853" d="M16.3178 3.52789C19.6883 0.157369 25.1515 0.157369 28.522 3.52789C31.8925 6.89842 31.8925 12.3616 28.522 15.7321L21.4249 22.8292L21.4149 22.8193L15.7321 28.5021C12.3616 31.8726 6.89842 31.8726 3.52789 28.5021C0.157369 25.1316 0.157369 19.6684 3.52789 16.2979L10.625 9.20078L10.6349 9.21073L16.3178 3.52789ZM20.0007 21.4051L10.6249 12.0293L4.94211 17.7121C2.35263 20.3016 2.35263 24.4984 4.94211 27.0879C7.53158 29.6774 11.7284 29.6774 14.3179 27.0879L20.0007 21.4051ZM28 10C28 8.89543 27.1046 8 26 8C24.8954 8 24 8.89543 24 10C24 11.1046 24.8954 12 26 12C27.1046 12 28 11.1046 28 10Z"></path>
                      </svg>
                    ), 
                    title: 'Medicine Search', 
                    sub: 'Find from 300+ pharmacies instantly' 
                  },
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 64 64" id="Truck">
                        <g transform="translate(64 0) scale(-1 1)" fill="#34a853">
                          <path d="M2,40H38a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H2A1,1,0,0,0,1,7V39A1,1,0,0,0,2,40ZM3,8H37V38H3Z"/>
                          <path d="M62,45h0V31a.992.992,0,0,0-.092-.419L56.712,19.324A4.041,4.041,0,0,0,53,17H45a4,4,0,0,0-4,4V42H2a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H5.263a8,8,0,1,0,15.474,0H34.263a7.993,7.993,0,1,0,15.668,3H62a1,1,0,0,0,1-1V46A1,1,0,0,0,62,45ZM45,19h8.081A2.005,2.005,0,0,1,54.9,20.162L60,31.219V45H53V43a1,1,0,0,0-1-1H43V21A2,2,0,0,1,45,19ZM3,46V44H7.726a8.069,8.069,0,0,0-1.644,2ZM13,56a6,6,0,1,1,6-6A6.006,6.006,0,0,1,13,56Zm6.918-10a8.069,8.069,0,0,0-1.644-2H36.726a8.069,8.069,0,0,0-1.644,2ZM42,56a6,6,0,1,1,6-6A6.006,6.006,0,0,1,42,56Zm19-7H49.931a7.99,7.99,0,0,0-2.657-5H51v2a1,1,0,0,0,1,1h9Z"/>
                          <path d="M46,31h2.382l.723,1.447A1,1,0,0,0,50,33h7a1,1,0,0,0,.9-1.447l-5-10A1,1,0,0,0,52,21H46a1,1,0,0,0-1,1v8A1,1,0,0,0,46,31Zm1-8h4.382l4,8H50.618L49.9,29.553A1,1,0,0,0,49,29H47Z"/>
                          <rect width="4" height="2" x="45" y="35"/>
                          <path d="M13 47a3 3 0 103 3A3 3 0 0013 47zm0 4a1 1 0 111-1A1 1 0 0113 51zM42 47a3 3 0 103 3A3 3 0 0042 47zm0 4a1 1 0 111-1A1 1 0 0142 51zM22.157 11.743a5.95 5.95 0 10-8.414 8.414l11.1 11.1a5.95 5.95 0 108.414-8.414zM14 15.95a3.95 3.95 0 016.743-2.793L25.586 18 20 23.586l-4.843-4.843A3.924 3.924 0 0114 15.95zM29.05 31a3.924 3.924 0 01-2.793-1.157L21.414 25 27 19.414l4.843 4.843A3.95 3.95 0 0129.05 31zM11 24a6 6 0 106 6A6.006 6.006 0 0011 24zm0 2a4 4 0 013.858 3H7.142A4 4 0 0111 26zm0 8a4 4 0 01-3.858-3h7.716A4 4 0 0111 34z"/>
                        </g>
                      </svg>
                    ),
                    title: 'Express Delivery', 
                    sub: 'Door-to-door in under 60 minutes' 
                  },
                  { emoji: '✅', title: 'Quality Verified', sub: 'Only licensed, audited pharmacies' },
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 64 64" id="Tracking">
                        <path fill="#34a853" d="M32,2L5.4,14.6v34.8L32,62l26.6-12.6V14.6L32,2z M32,10.5l18.4,8.7L32,28L13.6,19.2L32,10.5z M10,23.3l20,9.5 v20.9l-20-9.5V23.3z M34,53.7V32.8l20-9.5v20.9L34,53.7z"/>
                        <path fill="#34a853" d="M52,6c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,4.5,6,10.5,6,10.5S52,10.5,52,6z M46,8.2c-1.2,0-2.2-1-2.2-2.2 s1-2.2,2.2-2.2s2.2,1,2.2,2.2S47.2,8.2,46,8.2z"/>
                      </svg>
                    ),
                    title: 'Order Tracking', 
                    sub: 'Live status from prep to delivery' 
                  },
                ].map((card, i) => (
                  <div key={i} className="flex items-center gap-5 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex-shrink-0">
                      {card.icon ? card.icon : <span className="text-3xl">{card.emoji}</span>}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{card.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{card.sub}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-5 -right-5 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl shadow-emerald-600/30 text-sm font-bold">
              ⚡ 30–60 Min Delivery
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Simple. Fast. Reliable.</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              From search to doorstep in four easy steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-xl transition-all duration-300 group">
                {/* Step number */}
                <span className="absolute top-6 right-6 text-6xl font-black text-gray-50 dark:text-gray-800 group-hover:text-emerald-50 dark:group-hover:text-emerald-950 transition-colors select-none">
                  {step.step}
                </span>
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                {/* Connector arrow (not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ──────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What drives us every day</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Six principles that guide every product decision, every pharmacy partnership, and every delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-3xl p-8 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Built by people who care</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              A passionate team of healthcare professionals, engineers, and operations experts.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.bg} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">{member.name}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">We'd love to hear from you</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Whether you're a patient, pharmacy owner, or investor — our team is always on.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Mail className="w-6 h-6" />, title: 'Email Us', info: 'support@medfinder.in', sub: 'Reply within 24 hours', href: 'mailto:support@medfinder.in' },
              { icon: <Phone className="w-6 h-6" />, title: 'Call Us', info: '+91 98765 43210', sub: 'Mon–Sat, 9am–6pm IST', href: 'tel:+919876543210' },
              { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', info: 'Mumbai, India', sub: 'Andheri West, 400053', href: '#' },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-3xl p-8 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-xl transition-all duration-300 group text-center block">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{c.title}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">{c.info}</p>
                <p className="text-gray-400 text-sm">{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section className="mx-6 mb-6 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 rounded-[3rem]" />
          <div className="relative z-10">
            <div className="text-5xl mb-6">💊</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your health, delivered.</h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
              Join 50,000+ patients who trust MedFinder for fast, reliable access to their medicines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search"
                className="px-10 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:scale-105 shadow-2xl transition-all">
                Search Medicines →
              </Link>
              <Link to="/signup"
                className="px-10 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
