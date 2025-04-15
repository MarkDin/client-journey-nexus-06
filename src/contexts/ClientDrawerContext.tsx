
import { createContext, ReactNode, useContext, useState } from "react";

interface ClientDrawerContextType {
  selectedClientId: string | null;
  isDrawerOpen: boolean;
  openClientDrawer: (customerCode: string) => void;
  closeClientDrawer: () => void;
}

const ClientDrawerContext = createContext<ClientDrawerContextType | undefined>(undefined);

export function ClientDrawerProvider({ children }: { children: ReactNode }) {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openClientDrawer = (customerCode: string) => {
    setSelectedClientId(customerCode);
    setIsDrawerOpen(true);
  };

  const closeClientDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <ClientDrawerContext.Provider
      value={{
        selectedClientId,
        isDrawerOpen,
        openClientDrawer,
        closeClientDrawer,
      }}
    >
      {children}
    </ClientDrawerContext.Provider>
  );
}

export function useClientDrawer() {
  const context = useContext(ClientDrawerContext);
  if (context === undefined) {
    throw new Error("useClientDrawer must be used within a ClientDrawerProvider");
  }
  return context;
}
