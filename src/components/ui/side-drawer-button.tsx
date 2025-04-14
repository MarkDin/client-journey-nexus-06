
import { ReactNode, ButtonHTMLAttributes } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SideDrawerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick: () => void;
  showIcon?: boolean;
}

export function SideDrawerButton({
  children,
  variant = "default",
  size = "default",
  onClick,
  showIcon = true,
  className,
  ...props
}: SideDrawerButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn("group", className)}
      {...props}
    >
      {children}
      {showIcon && (
        <ExternalLink className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
      )}
    </Button>
  );
}
