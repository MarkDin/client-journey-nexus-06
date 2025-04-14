
import { ClientDetailDrawer } from "./ClientDetailDrawer";

interface ClientDetailProps {
  clientId: number;
  open: boolean;
  onClose: () => void;
}

export function ClientDetail({ clientId, open, onClose }: ClientDetailProps) {
  return <ClientDetailDrawer clientId={clientId} open={open} onClose={onClose} />;
}
