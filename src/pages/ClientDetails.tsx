
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ClientDetail } from "@/components/clients/ClientDetail";

const ClientDetails = () => {
  const { id } = useParams<{id: string}>();
  const clientId = parseInt(id || "1");
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate("/clients");
  };
  
  return (
    <ClientDetail 
      clientId={clientId}
      onClose={handleClose}
      open={true}
    />
  );
};

export default ClientDetails;
