import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, className, delay = 0 }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group rounded-2xl border-2 border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
