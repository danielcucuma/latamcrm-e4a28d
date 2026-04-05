"use client";

import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-24 md:pt-40 md:pb-32 font-geist">
      {/* Gradient Orb Background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-300 font-medium mb-8">
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#a78bfa",
              animation: "pulse 2s infinite",
            }}
          />
          Nuevo · Soporte multimoneda LATAM
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          CRM para SaaS de{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Latinoamérica
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Gestiona pipelines de ventas, métricas SaaS y suscripciones recurrentes en tu moneda local. 
          Sin configuración compleja. Listo para crecer.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/signup"
            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 0 24px rgba(124,58,237,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.35)";
            }}
          >
            Empezar gratis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 rounded-lg font-semibold text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-colors"
          >
            Ver demo
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
          <TrendingUp size={16} className="text-emerald-500" />
          <span>↑ 150+ equipos SaaS lanzaron este mes</span>
        </div>
      </div>
    </section>
  );
}