import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Calendar, Edit, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

interface Workout {
    id: string;
    date: string;
    routine_name: string;
    exercises: Exercise[];
}

// ─── Datos de ejemplo ───────────────────────────────────────────────────────
const DEMO_WORKOUTS: Workout[] = [
    {
        id: "1",
        date: "2025-02-20",
        routine_name: "Push Day",
        exercises: [
            { id: "e1", name: "Press Banca", sets: 4, reps: 8, weight: 80 },
            { id: "e2", name: "Press Inclinado Mancuernas", sets: 3, reps: 10, weight: 22 },
            { id: "e3", name: "Fondos en Paralelas", sets: 3, reps: 12, weight: 0 },
            { id: "e4", name: "Extensión Tríceps Polea", sets: 3, reps: 15, weight: 25 },
        ],
    },
    {
        id: "2",
        date: "2025-02-18",
        routine_name: "Pull Day",
        exercises: [
            { id: "e5", name: "Peso Muerto", sets: 4, reps: 5, weight: 120 },
            { id: "e6", name: "Dominadas", sets: 3, reps: 8, weight: 0 },
            { id: "e7", name: "Remo con Barra", sets: 3, reps: 10, weight: 60 },
            { id: "e8", name: "Curl Bíceps Mancuernas", sets: 3, reps: 12, weight: 14 },
        ],
    },
    {
        id: "3",
        date: "2025-02-16",
        routine_name: "Leg Day",
        exercises: [
            { id: "e9", name: "Sentadilla Trasera", sets: 5, reps: 5, weight: 100 },
            { id: "e10", name: "Prensa de Piernas", sets: 3, reps: 12, weight: 150 },
            { id: "e11", name: "Curl Femoral", sets: 3, reps: 12, weight: 40 },
            { id: "e12", name: "Elevación de Gemelos", sets: 4, reps: 20, weight: 60 },
        ],
    },
    {
        id: "4",
        date: "2025-02-14",
        routine_name: "Full Body",
        exercises: [
            { id: "e13", name: "Sentadilla Goblet", sets: 3, reps: 15, weight: 24 },
            { id: "e14", name: "Press Militar", sets: 4, reps: 8, weight: 50 },
            { id: "e15", name: "Hip Thrust", sets: 3, reps: 12, weight: 80 },
        ],
    },
    {
        id: "5",
        date: "2025-02-12",
        routine_name: "Push Day",
        exercises: [
            { id: "e16", name: "Press Banca", sets: 4, reps: 8, weight: 77.5 },
            { id: "e17", name: "Aperturas Cable", sets: 3, reps: 15, weight: 12 },
            { id: "e18", name: "Press Arnold", sets: 3, reps: 10, weight: 18 },
            { id: "e19", name: "Tríceps Cuerda", sets: 4, reps: 12, weight: 22 },
        ],
    },
    {
        id: "6",
        date: "2025-02-10",
        routine_name: "Pull Day",
        exercises: [
            { id: "e20", name: "Peso Muerto Rumano", sets: 4, reps: 8, weight: 90 },
            { id: "e21", name: "Jalón Polea Alta", sets: 4, reps: 10, weight: 65 },
            { id: "e22", name: "Encogimientos Trapecio", sets: 3, reps: 15, weight: 30 },
        ],
    },
];

const DemoDashboard = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Demo Banner */}
            <div className="bg-primary/90 py-2 text-center text-sm font-semibold text-primary-foreground tracking-widest">
                🚀 VERSIÓN DEMO — DATOS DE EJEMPLO
            </div>

            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <Dumbbell className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl text-foreground">DIARIO DE HIERRO</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/demo/workout">
                            <Button size="sm">
                                <Plus className="mr-1 h-4 w-4" /> Nuevo
                            </Button>
                        </Link>
                        <Link to="/demo">
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                                ← Landing
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="border-b border-border bg-card/40">
                <div className="container mx-auto grid grid-cols-3 divide-x divide-border px-4 py-4 text-center">
                    <div>
                        <p className="text-2xl text-primary font-bold" style={{ fontFamily: "var(--font-display)" }}>
                            {DEMO_WORKOUTS.length}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Entrenamientos</p>
                    </div>
                    <div>
                        <p className="text-2xl text-primary font-bold" style={{ fontFamily: "var(--font-display)" }}>
                            {DEMO_WORKOUTS.reduce((acc, w) => acc + w.exercises.length, 0)}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Ejercicios</p>
                    </div>
                    <div>
                        <p className="text-2xl text-primary font-bold" style={{ fontFamily: "var(--font-display)" }}>
                            {Math.round(
                                DEMO_WORKOUTS.flatMap((w) => w.exercises).reduce((acc, ex) => acc + ex.weight * ex.sets * ex.reps, 0) / 1000
                            )}k
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">kg Totales</p>
                    </div>
                </div>
            </div>

            {/* Workout Grid */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {DEMO_WORKOUTS.map((w, i) => (
                        <div
                            key={w.id}
                            className="animate-slide-up rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
                            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl text-foreground">{w.routine_name.toUpperCase()}</h3>
                                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(w.date).toLocaleDateString("es-ES", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => toggleExpand(w.id)}
                                        title={expandedId === w.id ? "Colapsar" : "Expandir"}
                                    >
                                        {expandedId === w.id ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Link to="/demo/workout">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Exercises preview (always show first 2, expand to show all) */}
                            <div className="space-y-1.5">
                                {(expandedId === w.id ? w.exercises : w.exercises.slice(0, 2)).map((ex) => (
                                    <div
                                        key={ex.id}
                                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                                    >
                                        <span className="font-medium text-foreground">{ex.name}</span>
                                        <span className="text-muted-foreground">
                                            {ex.sets}×{ex.reps} · {ex.weight > 0 ? `${ex.weight}kg` : "Peso corporal"}
                                        </span>
                                    </div>
                                ))}
                                {expandedId !== w.id && w.exercises.length > 2 && (
                                    <button
                                        onClick={() => toggleExpand(w.id)}
                                        className="w-full rounded-lg py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        +{w.exercises.length - 2} ejercicios más
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DemoDashboard;
