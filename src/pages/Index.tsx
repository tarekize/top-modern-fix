import { useState } from "react";
import { Stethoscope, Brain, Shield, Zap } from "lucide-react";
import HealthForm, { FormData } from "@/components/HealthForm";
import PredictionResult from "@/components/PredictionResult";
import FeatureCard from "@/components/FeatureCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      
      toast({
        title: "Analyse terminée",
        description: "Les résultats sont disponibles ci-dessous.",
      });
    } catch (err) {
      setError("Impossible de se connecter au serveur. Vérifiez que l'API est en cours d'exécution sur localhost:8000.");
      toast({
        title: "Erreur de connexion",
        description: "Impossible de joindre le serveur d'analyse.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden pb-8 pt-12 lg:pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
              <Stethoscope className="h-4 w-4" />
              Analyse de santé basée sur l'IA
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-slide-up">
              Prédiction de{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Consommation</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
              Utilisez vos données biologiques pour détecter des indices de consommation d'alcool et de tabac grâce à notre modèle de machine learning.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Form Card */}
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="rounded-3xl border-2 border-border/50 bg-card p-8 shadow-card">
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Vos données biologiques
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Entrez vos valeurs pour obtenir une prédiction
                  </p>
                </div>
                
                <HealthForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>

            {/* Results & Features */}
            <div className="space-y-6">
              {/* Result Card */}
              {(prediction !== null || error) && (
                <PredictionResult prediction={prediction} error={error} />
              )}

              {/* Info Card */}
              <div className="rounded-3xl border-2 border-border/50 bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "300ms" }}>
                <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Comment ça fonctionne ?
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Notre modèle analyse 4 biomarqueurs clés pour prédire les habitudes de consommation :
                  </p>
                  <ul className="list-inside space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span><strong>Créatinine</strong> — Indicateur de fonction rénale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span><strong>Hémoglobine</strong> — Capacité de transport d'oxygène</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span><strong>Triglycérides</strong> — Type de graisse sanguine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span><strong>Cholestérol</strong> — Lipide essentiel</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="mt-16">
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">
              Pourquoi utiliser notre outil ?
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Brain}
                title="IA Avancée"
                description="Modèle de machine learning entraîné sur des milliers de données médicales réelles."
                delay={400}
              />
              <FeatureCard
                icon={Shield}
                title="Confidentialité"
                description="Vos données restent sur votre appareil. Aucune information n'est stockée."
                delay={500}
              />
              <FeatureCard
                icon={Zap}
                title="Instantané"
                description="Obtenez vos résultats en quelques secondes grâce à notre API optimisée."
                delay={600}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            ⚠️ Cet outil est à titre informatif uniquement. Consultez toujours un professionnel de santé pour un diagnostic médical.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
