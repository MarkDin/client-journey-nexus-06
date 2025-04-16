import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Package, Activity, BarChart2, Truck, Mail, ChevronRight, Menu, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
export function AppSidebar() {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const mainMenu = [
    {
      name: "看板",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    // {
    // name: "活动",
    // href: "/activities",
    // icon: <Activity className="h-5 w-5" />
    // },
    {
      name: "客户",
      href: "/clients",
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "订单",
      href: "/orders",
      icon: <Package className="h-5 w-5" />
    },
    // {
    // name: "发货",
    // href: "/shipments",
    // icon: <Truck className="h-5 w-5" />
    // },
    // {
    // name: "沟通",
    // href: "/communication",
    // icon: <Mail className="h-5 w-5" />
    // },
    {
      name: "分析",
      href: "/analytics",
      icon: <BarChart2 className="h-5 w-5" />
    },
    // {
    // name: "支持",
    // href: "/support",
    // icon: <HelpCircle className="h-5 w-5" />
    // }
  ];
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  if (isMobile) {
    return <>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleMobileMenu}>
        <Menu className="h-6 w-6" />
      </Button>

      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />}

      <div className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-lg transform transition-transform duration-200 ease-in-out", isMobileOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="h-16 border-b flex items-center px-4">
          <h2 className="text-lg font-semibold">销售管理</h2>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
          <div className="p-3">
            {mainMenu.map(item => <NavLink key={item.href} to={item.href} onClick={() => setIsMobileOpen(false)} className={({
              isActive
            }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground mb-1", isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>)}

            <div className="mt-auto mb-4">
              <NavLink to="/support" onClick={() => setIsMobileOpen(false)} className={({
                isActive
              }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", "bg-[#1A1F2C] text-white hover:bg-[#2C3242]", isActive ? "ring-2 ring-primary" : "", "justify-center")}>
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </NavLink>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>;
  }
  return <div className={cn("fixed inset-y-0 left-0 z-20 bg-card border-r shadow-lg", sidebarWidth, "transition-width duration-300 ease-in-out")}>
    <div className="h-16 border-b flex items-center px-4">
      {!isCollapsed && <h2 className="text-lg font-semibold">销售管理</h2>}
      <Button variant="ghost" size="icon" className={cn("ml-auto", !isCollapsed && "rotate-180")} onClick={toggleCollapse}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>

    <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
      <div className="p-3 flex flex-col h-full">
        <div>
          {mainMenu.map(item => <NavLink key={item.href} to={item.href} className={({
            isActive
          }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground mb-1", isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground", isCollapsed && "justify-center")} title={isCollapsed ? item.name : undefined}>
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>)}
        </div>

        <div className="mt-auto mb-4">
          <NavLink to="/support" title={isCollapsed ? "Help & Support" : undefined} className="\u628A\u5B83\u4F5C\u4E3A\u4E00\u4E2A\u6309\u94AE\u653E\u5728\u4E0B\u65B9">
            <HelpCircle className="h-5 w-5" />
            {!isCollapsed && <span>Help & Support</span>}
          </NavLink>
        </div>
      </div>
    </ScrollArea>
  </div>;
}