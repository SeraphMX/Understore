import React, { useState } from 'react';
import { 
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Switch
} from '@nextui-org/react';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Send as TelegramIcon,
  MessageCircle as WhatsAppIcon,
  Video as TikTokIcon,
  Save
} from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    facebook: string;
    instagram: string;
    telegram: string;
    whatsapp: string;
    tiktok: string;
  };
  support: {
    phone: boolean;
    email: boolean;
    chat: boolean;
    whatsapp: boolean;
  };
}

const ContactInfo = () => {
  // Mock data - Replace with actual data from your backend
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+34 900 123 456',
    email: 'info@semillasshop.com',
    address: {
      street: 'Calle Principal 123',
      city: 'Madrid',
      state: 'Madrid',
      zipCode: '28001',
      country: 'España'
    },
    hours: {
      weekdays: '9:00 - 20:00',
      saturday: '10:00 - 15:00',
      sunday: 'Cerrado'
    },
    social: {
      facebook: 'https://facebook.com/semillasshop',
      instagram: 'https://instagram.com/semillasshop',
      telegram: 'https://t.me/semillasshop',
      whatsapp: '34900123456',
      tiktok: 'https://tiktok.com/@semillasshop'
    },
    support: {
      phone: true,
      email: true,
      chat: true,
      whatsapp: true
    }
  });

  const handleSave = () => {
    // Here you would save the changes to your backend
    console.log('Saving contact info:', contactInfo);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Datos de Contacto</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader className="flex gap-3">
            <Phone className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Información de Contacto</h2>
              <p className="text-gray-500 text-sm">Datos principales de contacto</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Teléfono"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              startContent={<Phone className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
            />
          </CardBody>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader className="flex gap-3">
            <MapPin className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Dirección</h2>
              <p className="text-gray-500 text-sm">Ubicación física de la tienda</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Calle"
              value={contactInfo.address.street}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                address: { ...contactInfo.address, street: e.target.value }
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Ciudad"
                value={contactInfo.address.city}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  address: { ...contactInfo.address, city: e.target.value }
                })}
              />
              <Input
                label="Estado/Provincia"
                value={contactInfo.address.state}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  address: { ...contactInfo.address, state: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Código Postal"
                value={contactInfo.address.zipCode}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  address: { ...contactInfo.address, zipCode: e.target.value }
                })}
              />
              <Input
                label="País"
                value={contactInfo.address.country}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  address: { ...contactInfo.address, country: e.target.value }
                })}
              />
            </div>
          </CardBody>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader className="flex gap-3">
            <Clock className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Horario</h2>
              <p className="text-gray-500 text-sm">Horario de atención</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Lunes a Viernes"
              value={contactInfo.hours.weekdays}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                hours: { ...contactInfo.hours, weekdays: e.target.value }
              })}
            />
            <Input
              label="Sábados"
              value={contactInfo.hours.saturday}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                hours: { ...contactInfo.hours, saturday: e.target.value }
              })}
            />
            <Input
              label="Domingos"
              value={contactInfo.hours.sunday}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                hours: { ...contactInfo.hours, sunday: e.target.value }
              })}
            />
          </CardBody>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader className="flex gap-3">
            <Facebook className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Redes Sociales</h2>
              <p className="text-gray-500 text-sm">Enlaces a redes sociales</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Facebook"
              value={contactInfo.social.facebook}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                social: { ...contactInfo.social, facebook: e.target.value }
              })}
              startContent={<Facebook className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Instagram"
              value={contactInfo.social.instagram}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                social: { ...contactInfo.social, instagram: e.target.value }
              })}
              startContent={<Instagram className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Telegram"
              value={contactInfo.social.telegram}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                social: { ...contactInfo.social, telegram: e.target.value }
              })}
              startContent={<TelegramIcon className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="WhatsApp"
              value={contactInfo.social.whatsapp}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                social: { ...contactInfo.social, whatsapp: e.target.value }
              })}
              startContent={<WhatsAppIcon className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="TikTok"
              value={contactInfo.social.tiktok}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                social: { ...contactInfo.social, tiktok: e.target.value }
              })}
              startContent={<TikTokIcon className="w-4 h-4 text-gray-400" />}
            />
          </CardBody>
        </Card>

        {/* Support Channels */}
        <Card className="md:col-span-2">
          <CardHeader className="flex gap-3">
            <Phone className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Canales de Soporte</h2>
              <p className="text-gray-500 text-sm">Configura los canales de atención al cliente</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-gray-500">Soporte telefónico</p>
                  </div>
                </div>
                <Switch
                  isSelected={contactInfo.support.phone}
                  onValueChange={(value) => setContactInfo({
                    ...contactInfo,
                    support: { ...contactInfo.support, phone: value }
                  })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500">Soporte por correo</p>
                  </div>
                </div>
                <Switch
                  isSelected={contactInfo.support.email}
                  onValueChange={(value) => setContactInfo({
                    ...contactInfo,
                    support: { ...contactInfo.support, email: value }
                  })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Chat en Vivo</p>
                    <p className="text-sm text-gray-500">Chat integrado</p>
                  </div>
                </div>
                <Switch
                  isSelected={contactInfo.support.chat}
                  onValueChange={(value) => setContactInfo({
                    ...contactInfo,
                    support: { ...contactInfo.support, chat: value }
                  })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-500">Soporte por WhatsApp</p>
                  </div>
                </div>
                <Switch
                  isSelected={contactInfo.support.whatsapp}
                  onValueChange={(value) => setContactInfo({
                    ...contactInfo,
                    support: { ...contactInfo.support, whatsapp: value }
                  })}
                  color="success"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfo;