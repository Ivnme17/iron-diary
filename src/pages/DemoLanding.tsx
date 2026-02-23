import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowRight, BarChart2, Calendar, Shield, Zap } from "lucide-react";

const DemoLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-primary/90 py-2 text-center text-sm font-semibold text-primary-foreground tracking-widest">
        🚀 VERSIÓN DEMO — DATOS DE EJEMPLO
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="animate-fade-in">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary shadow-2xl"
               style={{ boxShadow: "var(--shadow-fire)" }}>
            <Dumbbell className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-7xl text-foreground tracking-wider">DIARIO DE HIERRO</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Registra tus entrenamientos. Controla tu progreso. Forja tu mejor versión.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/demo/dashboard">
              <Button size="lg" className="text-base px-8">
                Ver Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/demo/workout">
              <Button size="lg" variant="outline" className="text-base px-8">
                Probar Formulario
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-4xl text-foreground">FUNCIONALIDADES</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/40 hover:shadow-lg"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h3 className="mb-1 text-xl text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-t border-border bg-card/50 py-12 text-center">
        <h2 className="mb-6 text-2xl text-foreground">TECH STACK</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "shadcn/ui"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Proyecto personal · Desarrollado por{" "}
          <span className="font-medium text-primary">Ivan Martinez</span>
        </p>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Rutinas",
    icon: <Dumbbell className="h-6 w-6" />,
    desc: "Crea y edita tus rutinas de entrenamiento con nombre y fecha.",
  },
  {
    title: "Ejercicios",
    icon: <Zap className="h-6 w-6" />,
    desc: "Añade ejercicios con series, repeticiones y peso al detalle.",
  },
  {
    title: "Historial",
    icon: <Calendar className="h-6 w-6" />,
    desc: "Consulta todos tus entrenamientos pasados en un dashboard limpio.",
  },
  {
    title: "Progreso",
    icon: <BarChart2 className="h-6 w-6" />,
    desc: "Visualiza tu evolución y mantén el registro de tu rendimiento.",
  },
];

export default DemoLanding;
