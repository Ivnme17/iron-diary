import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface ExerciseRow {
    tempId: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

const DemoWorkoutForm = () => {
    const navigate = useNavigate();
    const [routineName, setRoutineName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [exercises, setExercises] = useState<ExerciseRow[]>([
        { tempId: "1", name: "", sets: 3, reps: 10, weight: 0 },
    ]);
    const [saving, setSaving] = useState(false);

    const addExercise = () => {
        setExercises((prev) => [
            ...prev,
            { tempId: crypto.randomUUID(), name: "", sets: 3, reps: 10, weight: 0 },
        ]);
    };

    const removeExercise = (tempId: string) => {
        setExercises((prev) => prev.filter((e) => e.tempId !== tempId));
    };

    const updateExercise = (tempId: string, field: keyof ExerciseRow, value: string | number) => {
        setExercises((prev) =>
            prev.map((e) => (e.tempId === tempId ? { ...e, [field]: value } : e))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!routineName.trim()) {
            toast.error("El nombre de la rutina es obligatorio");
            return;
        }
        const validExercises = exercises.filter((ex) => ex.name.trim());
        if (validExercises.length === 0) {
            toast.error("Añade al menos un ejercicio con nombre");
            return;
        }
        setSaving(true);
        // Simular guardado demo
        setTimeout(() => {
            setSaving(false);
            toast.success("✅ Demo: entrenamiento guardado (solo datos de ejemplo)");
            navigate("/demo/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Demo Banner */}
            <div className="bg-primary/90 py-2 text-center text-sm font-semibold text-primary-foreground tracking-widest">
                🚀 VERSIÓN DEMO — DATOS DE EJEMPLO
            </div>

            <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center gap-3 px-4 py-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/demo/dashboard")}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                        <Dumbbell className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl text-foreground">NUEVO ENTRENAMIENTO</h1>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-8">
                {/* Info banner */}
                <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Modo demo:</span> El formulario es completamente funcional. Al guardar, los datos no se persisten (solo demostración).
                </div>

                <form onSubmit={handleSubmit} className="animate-fade-in space-y-6">
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="routineName">Nombre de la Rutina</Label>
                            <Input
                                id="routineName"
                                value={routineName}
                                onChange={(e) => setRoutineName(e.target.value)}
                                placeholder="Ej: Push Day, Piernas, Full Body..."
                                maxLength={100}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Fecha</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl text-foreground">EJERCICIOS</h2>
                            <Button type="button" variant="outline" size="sm" onClick={addExercise}>
                                <Plus className="mr-1 h-4 w-4" /> Añadir
                            </Button>
                        </div>

                        {exercises.map((ex, i) => (
                            <div
                                key={ex.tempId}
                                className="animate-fade-in rounded-xl border border-border bg-card p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Ejercicio {i + 1}</span>
                                    {exercises.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-destructive hover:text-destructive"
                                            onClick={() => removeExercise(ex.tempId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <Input
                                    value={ex.name}
                                    onChange={(e) => updateExercise(ex.tempId, "name", e.target.value)}
                                    placeholder="Nombre del ejercicio"
                                    maxLength={100}
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Series</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={99}
                                            value={ex.sets}
                                            onChange={(e) => updateExercise(ex.tempId, "sets", parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Reps</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={999}
                                            value={ex.reps}
                                            onChange={(e) => updateExercise(ex.tempId, "reps", parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Peso (kg)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={9999}
                                            step={0.5}
                                            value={ex.weight}
                                            onChange={(e) => updateExercise(ex.tempId, "weight", parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button type="submit" className="w-full" disabled={saving}>
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? "Guardando..." : "Crear Entrenamiento"}
                    </Button>
                </form>
            </main>
        </div>
    );
};

export default DemoWorkoutForm;
