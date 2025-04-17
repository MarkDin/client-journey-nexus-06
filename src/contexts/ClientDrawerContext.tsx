import { createContext, ReactNode, useContext, useState } from "react";

interface ClientDrawerContextType {
  selectedClientCode: string | null;
  isDrawerOpen: boolean;
  openClientDrawer: (clientCode: string) => void;
  closeClientDrawer: () => void;
}

const ClientDrawerContext = createContext<ClientDrawerContextType | undefined>(undefined);

export function ClientDrawerProvider({ children }: { children: ReactNode }) {
  const [selectedClientCode, setSelectedClientCode] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openClientDrawer = (clientCode: string) => {
    setSelectedClientCode(clientCode);
    setIsDrawerOpen(true);
  };

  const closeClientDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <ClientDrawerContext.Provider
      value={{
        selectedClientCode,
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
