import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Beaker, Activity, Droplets, Heart, Loader2 } from "lucide-react";

interface HealthFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export interface FormData {
  serum_creatinine: number;
  hemoglobin: number;
  triglyceride: number;
  tot_chole: number;
}

const HealthForm = ({ onSubmit, isLoading }: HealthFormProps) => {
  const [formData, setFormData] = useState({
    serum_creatinine: "",
    hemoglobin: "",
    triglyceride: "",
    tot_chole: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Ce champ est requis";
      } else if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
        newErrors[key] = "Entrez une valeur valide";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        serum_creatinine: parseFloat(formData.serum_creatinine),
        hemoglobin: parseFloat(formData.hemoglobin),
        triglyceride: parseFloat(formData.triglyceride),
        tot_chole: parseFloat(formData.tot_chole),
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5">
        <Input
          label="Créatinine sérique (mg/dL)"
          placeholder="Ex: 1.2"
          type="number"
          step="0.01"
          icon={<Beaker className="h-5 w-5" />}
          value={formData.serum_creatinine}
          onChange={(e) => handleChange("serum_creatinine", e.target.value)}
          error={errors.serum_creatinine}
        />
        
        <Input
          label="Hémoglobine (g/dL)"
          placeholder="Ex: 14.5"
          type="number"
          step="0.1"
          icon={<Droplets className="h-5 w-5" />}
          value={formData.hemoglobin}
          onChange={(e) => handleChange("hemoglobin", e.target.value)}
          error={errors.hemoglobin}
        />
        
        <Input
          label="Triglycérides (mg/dL)"
          placeholder="Ex: 150"
          type="number"
          step="1"
          icon={<Activity className="h-5 w-5" />}
          value={formData.triglyceride}
          onChange={(e) => handleChange("triglyceride", e.target.value)}
          error={errors.triglyceride}
        />
        
        <Input
          label="Cholestérol total (mg/dL)"
          placeholder="Ex: 200"
          type="number"
          step="1"
          icon={<Heart className="h-5 w-5" />}
          value={formData.tot_chole}
          onChange={(e) => handleChange("tot_chole", e.target.value)}
          error={errors.tot_chole}
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Analyse en cours...
          </>
        ) : (
          <>
            <Activity />
            Analyser
          </>
        )}
      </Button>
    </form>
  );
};

export default HealthForm;
