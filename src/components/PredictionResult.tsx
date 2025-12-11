import { Wine, Ban, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionResultProps {
  prediction: number | null;
  error?: string | null;
}

const PredictionResult = ({ prediction, error }: PredictionResultProps) => {
  if (error) {
    return (
      <div className="animate-slide-up rounded-2xl border-2 border-destructive/30 bg-destructive/10 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/20">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-destructive">Erreur</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (prediction === null) return null;

  // prediction === 0 means the person drinks/smokes
  const isDrinker = prediction === 0;

  return (
    <div
      className={cn(
        "animate-slide-up rounded-2xl border-2 p-6 transition-all duration-500",
        isDrinker
          ? "border-warning/30 bg-warning/10"
          : "border-success/30 bg-success/10"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
            isDrinker ? "bg-warning/20" : "bg-success/20"
          )}
        >
          {isDrinker ? (
            <Wine className="h-7 w-7 text-warning" />
          ) : (
            <CheckCircle className="h-7 w-7 text-success" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3
            className={cn(
              "text-xl font-bold",
              isDrinker ? "text-warning" : "text-success"
            )}
          >
            {isDrinker ? "Profil à risque détecté" : "Profil sain détecté"}
          </h3>
          <p className="text-muted-foreground">
            {isDrinker
              ? "D'après vos données biologiques, le modèle prédit une consommation probable d'alcool et/ou de tabac."
              : "D'après vos données biologiques, le modèle ne détecte pas de signes de consommation d'alcool ou de tabac."}
          </p>
          
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-card/50 p-3">
            {isDrinker ? (
              <Ban className="h-5 w-5 text-muted-foreground" />
            ) : (
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {isDrinker
                ? "Recommandation : Consultez un professionnel de santé"
                : "Continuez à maintenir un mode de vie sain"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
