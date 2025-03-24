import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface RegistrationSuccessProps {
  onWhatsAppClick: () => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ onWhatsAppClick }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">¡Solicitud Enviada!</h2>
      
      <p className="text-gray-600 mb-6">
        Tu solicitud ha sido recibida y está siendo procesada. Para acelerar el proceso
        de aprobación, puedes contactarnos directamente por WhatsApp.
      </p>

      <Button
        color="success"
        variant="shadow"
        onClick={onWhatsAppClick}
        startContent={<MessageCircle className="w-5 h-5" />}
        className="w-full"
      >
        Contactar por WhatsApp
      </Button>
    </div>
  );
};

export default RegistrationSuccess;