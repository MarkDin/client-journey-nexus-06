
import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  clickable = false,
  onClick
}: StatsCardProps) {
  const isTrendPositive = trend ? trend.value > 0 : undefined;
  
  return (
    <Card 
      className={cn(
        className,
        clickable && "cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md"
      )}
      onClick={clickable ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span 
                  className={cn(
                    "flex items-center text-xs font-medium",
                    isTrendPositive ? "text-success" : "text-destructive"
                  )}
                >
                  {isTrendPositive ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
