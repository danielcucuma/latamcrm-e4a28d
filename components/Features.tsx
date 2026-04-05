"use client";

import {
  BarChart3,
  Zap,
  DollarSign,
  Bell,
  Workflow,
  Globe,
} from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Dashboard de Métricas SaaS",
    description: "MRR, ARR, churn rate, LTV. Todo en tiempo real con gráficos interactivos.",
  },
  {
    icon: Zap,
    title: "Pipeline Visual",
    description: "Arrastra deals entre etapas. Customiza tu flujo de ventas en segundos.",
  },
  {
    icon: DollarSign,
    title: "Multimoneda LATAM",
    description: "ARS, MXN, CLP, COP, BRL, PEN. Conversión automática a USD.",
  },
  {
    icon: Bell,
    title: "Alertas de Renovación",
    description: "Notificaciones automáticas antes de que expire una suscripción.",
  },
  {
    icon: Workflow,
    title: "Automatizaciones",
    description: "Follow-ups por email, tareas y webhooks. Sin código.",
  },
  {
    icon: Globe,
    title: "Cumplimiento Regional",
    description: "LGPD, GDPR, LSSI-CE. Privacidad por país integrada.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">
            ✦ Características
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Todo lo que necesitas para vender SaaS
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Diseñado específicamente para founders y sales managers en Latinoamérica.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl p-6 transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
                    border: "1px solid rgba(124,58,237,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={24} className="text-violet-400" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Large Feature Highlight */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Automatiza tu flujo de ventas
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Crea automatizaciones sin código. Dispara emails, crea tareas y actualiza deals automáticamente 
                basado en eventos. Ahorra 5+ horas por semana en tareas repetitivas.
              </p>
              <ul className="space-y-3">
                {["Follow-ups automáticos", "Alertas de churn", "Sincronización con email"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl h-64 md:h-80 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.1))",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div className="text-center">
                <Workflow size={48} className="text-violet-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-400">Dashboard de automatizaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}