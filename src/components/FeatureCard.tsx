
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
}

const FeatureCard = forwardRef<HTMLButtonElement, FeatureCardProps>(
  ({ title, description, icon, active, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        {...props}
        className={cn(
          "flex flex-col items-center text-left h-full w-full p-6 gap-4 rounded-2xl border transition-all duration-300",
          "group hover:border-whisper hover:shadow-md hover:bg-white",
          active ? "border-whisper bg-white shadow-md" : "bg-white/50 backdrop-blur-sm",
          className
        )}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
          active ? "bg-whisper text-white" : "bg-whisper/10 text-whisper",
          "group-hover:bg-whisper group-hover:text-white"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Button>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
