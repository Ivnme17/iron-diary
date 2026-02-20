import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, LogOut, Calendar, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

interface Workout {
  id: string;
  date: string;
  routine_name: string;
  created_at: string;
  exercises: { id: string; name: string; sets: number; reps: number; weight: number }[];
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) fetchWorkouts();
  }, [user]);

  const fetchWorkouts = async () => {
    setFetching(true);
    const { data: wData, error } = await supabase
      .from("workouts")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Error cargando entrenamientos");
      setFetching(false);
      return;
    }

    const workoutsWithExercises: Workout[] = [];
    for (const w of wData || []) {
      const { data: exData } = await supabase
        .from("exercises")
        .select("*")
        .eq("workout_id", w.id)
        .order("sort_order", { ascending: true });

      workoutsWithExercises.push({
        ...w,
        exercises: (exData || []).map((e) => ({
          id: e.id,
          name: e.name,
          sets: e.sets,
          reps: e.reps,
          weight: Number(e.weight),
        })),
      });
    }
    setWorkouts(workoutsWithExercises);
    setFetching(false);
  };

  const deleteWorkout = async (id: string) => {
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    if (error) toast.error("Error eliminando entrenamiento");
    else {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
      toast.success("Entrenamiento eliminado");
    }
  };

  if (loading) {
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
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl text-foreground">DIARIO DE HIERRO</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/workout/new">
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Nuevo
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {fetching ? (
          <div className="flex justify-center py-16">
            <Dumbbell className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : workouts.length === 0 ? (
          <div className="animate-fade-in py-16 text-center">
            <Dumbbell className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
            <h2 className="text-3xl text-muted-foreground">SIN ENTRENAMIENTOS</h2>
            <p className="mt-2 text-muted-foreground">Crea tu primer entrenamiento para empezar</p>
            <Link to="/workout/new">
              <Button className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Crear Entrenamiento
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((w, i) => (
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
                    <Link to={`/workout/${w.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteWorkout(w.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {w.exercises.length > 0 && (
                  <div className="space-y-1.5">
                    {w.exercises.map((ex) => (
                      <div
                        key={ex.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-foreground">{ex.name}</span>
                        <span className="text-muted-foreground">
                          {ex.sets}×{ex.reps} · {ex.weight}kg
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {w.exercises.length === 0 && (
                  <p className="text-sm text-muted-foreground">Sin ejercicios</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
