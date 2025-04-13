
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  BellRing,
  FileBox,
  Home,
  Menu,
  ShoppingBag,
  Truck,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, isActive, onClick }: NavItemProps) => (
  <Link 
    to={href} 
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    )}
    onClick={onClick}
  >
    <div className="w-5 h-5">{icon}</div>
    <span className="font-medium">{label}</span>
  </Link>
);

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/" },
    { icon: <BellRing size={18} />, label: "Activities & Alerts", href: "/activities" },
    { icon: <Users size={18} />, label: "Clients", href: "/clients" },
    { icon: <ShoppingBag size={18} />, label: "Orders", href: "/orders" },
    { icon: <Truck size={18} />, label: "Shipments", href: "/shipments" },
    { icon: <FileBox size={18} />, label: "Reports", href: "/reports" },
    { icon: <BarChart3 size={18} />, label: "Analytics", href: "/analytics" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden",
          isOpen ? "hidden" : "block"
        )}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 bg-sidebar z-40 w-64 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-white">SalesNexus</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-thin">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
                onClick={isMobile ? toggleSidebar : undefined}
              />
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
                SN
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Sales Admin</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">admin@salesnexus.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
