
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AppTopbar() {
  return (
    <div className="h-16 border-b flex items-center justify-between px-4">
      <div></div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
}
