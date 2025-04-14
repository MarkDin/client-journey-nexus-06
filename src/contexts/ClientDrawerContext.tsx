
import { createContext, useContext, useState, ReactNode } from "react";

interface ClientDrawerContextType {
  selectedClientId: number | null;
  isDrawerOpen: boolean;
  openClientDrawer: (clientId: number) => void;
  closeClientDrawer: () => void;
}

const ClientDrawerContext = createContext<ClientDrawerContextType | undefined>(undefined);

export function ClientDrawerProvider({ children }: { children: ReactNode }) {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openClientDrawer = (clientId: number) => {
    setSelectedClientId(clientId);
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
