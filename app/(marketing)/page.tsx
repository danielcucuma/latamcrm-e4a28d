import { ArrowRight, TrendingUp, Users, Zap, BarChart3, Globe, Lock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full bg-zinc-950 text-zinc-50 font-geist">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 backdrop-blur-xl bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">SalesPulse</h1>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-zinc-100 transition">Features</a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-100 transition">Pricing</a>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition active:scale-95">
              Inicia sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Nuevo · Soporte multimoneda LATAM
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            CRM para SaaS en <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Latinoamérica</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Gestiona pipelines, suscripciones y churn en tu moneda. Métricas SaaS en tiempo real, automatizaciones inteligentes y cumplimiento regulatorio por país.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold flex items-center gap-2 transition active:scale-95 shadow-lg shadow-violet-500/30">
              Empezar gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#demo" className="px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium transition active:scale-95">
              Ver demo
            </a>
          </div>
          <p className="text-xs text-zinc-500 mt-6">Sin tarjeta de crédito · 14 días gratis</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Potencia tu equipo</p>
            <h2 className="text-4xl font-bold">Todo lo que necesitas para vender SaaS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Pipeline Visual", desc: "Arrastra deals entre etapas. Probabilidades automáticas y pronósticos de cierre." },
              { icon: BarChart3, title: "Métricas SaaS", desc: "MRR, ARR, churn rate, LTV. Dashboards en tiempo real con alertas inteligentes." },
              { icon: Users, title: "Gestión de Suscripciones", desc: "Renovaciones automáticas, detección de churn y análisis de retención por cohorte." },
              { icon: Zap, title: "Automatizaciones", desc: "Follow-ups por email, tareas y notificaciones basadas en triggers de ventas." },
              { icon: Globe, title: "Multimoneda LATAM", desc: "ARS, MXN, CLP, COP, BRL, PEN. Conversión automática y reportes en USD." },
              { icon: Lock, title: "Cumplimiento Legal", desc: "LGPD, GDPR y regulaciones locales. Auditoría y control de acceso por país." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-zinc-400">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Planes simples</p>
            <h2 className="text-4xl font-bold">Elige tu plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Starter", price: 99, features: ["Hasta 5 usuarios", "Pipeline ilimitado", "Métricas básicas", "Email support"] },
              { name: "Professional", price: 299, features: ["Usuarios ilimitados", "Automatizaciones avanzadas", "Integraciones API", "Soporte prioritario"], highlight: true },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-8 transition ${plan.highlight ? "border-violet-500/50 bg-violet-500/5 ring-1 ring-violet-500/20" : "border-zinc-800 bg-zinc-900/50"}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-zinc-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg font-medium transition active:scale-95 ${plan.highlight ? "bg-violet-600 hover:bg-violet-500 text-white" : "border border-zinc-700 hover:border-zinc-500 text-zinc-300"}`}>
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-400">
          <p>© 2024 SalesPulse. Hecho para LATAM.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Estado: Operativo 99.9%
          </div>
        </div>
      </footer>
    </div>
  );
}