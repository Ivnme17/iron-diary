import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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

const WorkoutForm = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "new";

  const [routineName, setRoutineName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [exercises, setExercises] = useState<ExerciseRow[]>([
    { tempId: crypto.randomUUID(), name: "", sets: 3, reps: 10, weight: 0 },
  ]);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(!!isEdit);

  useEffect(() => {
    if (isEdit && user) loadWorkout();
  }, [isEdit, user]);

  const loadWorkout = async () => {
    const { data: w } = await supabase.from("workouts").select("*").eq("id", id!).single();
    if (!w) {
      toast.error("Entrenamiento no encontrado");
      navigate("/dashboard");
      return;
    }
    setRoutineName(w.routine_name);
    setDate(w.date);

    const { data: exData } = await supabase
      .from("exercises")
      .select("*")
      .eq("workout_id", id!)
      .order("sort_order", { ascending: true });

    if (exData && exData.length > 0) {
      setExercises(
        exData.map((e) => ({
          tempId: e.id,
          name: e.name,
          sets: e.sets,
          reps: e.reps,
          weight: Number(e.weight),
        }))
      );
    }
    setLoadingData(false);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      let workoutId = id;

      if (isEdit) {
        const { error } = await supabase
          .from("workouts")
          .update({ routine_name: routineName.trim(), date })
          .eq("id", id!);
        if (error) throw error;

        await supabase.from("exercises").delete().eq("workout_id", id!);
      } else {
        const { data, error } = await supabase
          .from("workouts")
          .insert({ routine_name: routineName.trim(), date, user_id: user!.id })
          .select("id")
          .single();
        if (error) throw error;
        workoutId = data.id;
      }

      const exercisesToInsert = validExercises.map((ex, i) => ({
        workout_id: workoutId!,
        name: ex.name.trim(),
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
        sort_order: i,
      }));

      const { error: exError } = await supabase.from("exercises").insert(exercisesToInsert);
      if (exError) throw exError;

      toast.success(isEdit ? "Entrenamiento actualizado" : "Entrenamiento creado");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Dumbbell className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl text-foreground">
            {isEdit ? "EDITAR ENTRENAMIENTO" : "NUEVO ENTRENAMIENTO"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
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
            {saving ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Entrenamiento"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default WorkoutForm;
