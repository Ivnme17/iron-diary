import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowRight } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Dumbbell className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Dumbbell className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-7xl text-foreground tracking-wider">DIARIO DE HIERRO</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          Registra tus entrenamientos. Controla tu progreso. Forja tu mejor versión.
        </p>
        <Link to="/auth">
          <Button size="lg" className="mt-8 text-base">
            Empezar <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
