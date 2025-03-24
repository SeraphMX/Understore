import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { formatPrice } from '../types';
import { 
  CreditCard, 
  Truck, 
  User, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  BanknoteIcon,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Input, RadioGroup, Radio, Alert } from '@nextui-org/react';

interface CheckoutStep {
  title: string;
  icon: React.ReactNode;
}

const steps: CheckoutStep[] = [
  { title: 'Información Personal', icon: <User className="w-6 h-6" /> },
  { title: 'Dirección de Envío', icon: <Truck className="w-6 h-6" /> },
  { title: 'Método de Pago', icon: <CreditCard className="w-6 h-6" /> },
  { title: 'Confirmación', icon: <CheckCircle2 className="w-6 h-6" /> },
];

type PaymentMethod = 'card' | 'transfer' | 'deposit';

interface BankAccount {
  bank: string;
  holder: string;
  accountNumber: string;
  clabe: string;
}

interface DebitCard {
  bank: string;
  cardNumber: string;
}

const bankAccounts: BankAccount[] = [
  {
    bank: 'BBVA',
    holder: 'SemillasShop S.A. de C.V.',
    accountNumber: '0123456789',
    clabe: '012345678901234567'
  },
  {
    bank: 'Santander',
    holder: 'SemillasShop S.A. de C.V.',
    accountNumber: '9876543210',
    clabe: '987654321098765432'
  }
];

const debitCards: DebitCard[] = [
  {
    bank: 'BBVA',
    cardNumber: '4152 3130 0000 0001'
  },
  {
    bank: 'Santander',
    cardNumber: '5579 0700 0000 0001'
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  
  const [formData, setFormData] = useState({
    // Información Personal
    nombre: '',
    email: '',
    telefono: '',
    
    // Dirección de Envío
    calle: '',
    numeroExt: '',
    numeroInt: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    
    // Información de Pago con Tarjeta
    numeroTarjeta: '',
    nombreTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago
    console.log('Procesando pago...', { formData, paymentMethod });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button
          onClick={() => navigate('/productos')}
          className="text-green-600 hover:text-green-700"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Input
              type="text"
              name="nombre"
              label="Nombre completo"
              value={formData.nombre}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
            <Input
              type="tel"
              name="telefono"
              label="Teléfono"
              value={formData.telefono}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Input
              type="text"
              name="calle"
              label="Calle"
              value={formData.calle}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="numeroExt"
                label="Número Exterior"
                value={formData.numeroExt}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Input
                type="text"
                name="numeroInt"
                label="Número Interior"
                value={formData.numeroInt}
                onChange={handleInputChange}
                variant="bordered"
                placeholder="Opcional"
              />
            </div>
            <Input
              type="text"
              name="colonia"
              label="Colonia"
              value={formData.colonia}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="ciudad"
                label="Ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Input
                type="text"
                name="estado"
                label="Estado"
                value={formData.estado}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
            </div>
            <Input
              type="text"
              name="codigoPostal"
              label="Código Postal"
              value={formData.codigoPostal}
              onChange={handleInputChange}
              variant="bordered"
              isRequired
              className="max-w-full"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <RadioGroup
              label="Selecciona un método de pago"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value as PaymentMethod)}
              orientation="vertical"
              classNames={{
                wrapper: "gap-4"
              }}
            >
              <Radio 
                value="card"
                description="Pago seguro con tarjeta de crédito o débito"
                startContent={
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                }
              >
                Tarjeta
              </Radio>
              <Radio 
                value="transfer"
                description="Transferencia bancaria directa"
                startContent={
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                }
              >
                Transferencia
              </Radio>
              <Radio 
                value="deposit"
                description="Depósito en efectivo en banco"
                startContent={
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <BanknoteIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                }
              >
                Depósito
              </Radio>
            </RadioGroup>

            {(paymentMethod === 'transfer' || paymentMethod === 'deposit') && (
              <Alert
                className="mb-4"
                variant="bordered"
                startContent={<AlertTriangle className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="font-medium">Información importante sobre el envío</p>
                  <p>Para procesar tu pedido, es necesario que nos envíes el comprobante de pago.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <p>Horario de despacho:</p>
                  </div>
                  <ul className="list-disc list-inside text-sm ml-4">
                    <li>Envíos el mismo día para comprobantes recibidos antes de la 1:00 PM</li>
                    <li>Comprobantes recibidos después de la 1:00 PM se procesarán al siguiente día hábil</li>
                  </ul>
                </div>
              </Alert>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4 mt-6">
                <Input
                  type="text"
                  name="numeroTarjeta"
                  label="Número de Tarjeta"
                  value={formData.numeroTarjeta}
                  onChange={handleInputChange}
                  variant="bordered"
                  isRequired
                  className="max-w-full"
                />
                <Input
                  type="text"
                  name="nombreTarjeta"
                  label="Nombre en la Tarjeta"
                  value={formData.nombreTarjeta}
                  onChange={handleInputChange}
                  variant="bordered"
                  isRequired
                  className="max-w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="fechaExpiracion"
                    label="Fecha de Expiración"
                    placeholder="MM/AA"
                    value={formData.fechaExpiracion}
                    onChange={handleInputChange}
                    variant="bordered"
                    isRequired
                  />
                  <Input
                    type="text"
                    name="cvv"
                    label="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    variant="bordered"
                    isRequired
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium">{account.bank}</h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Beneficiario:</span> {account.holder}</p>
                      <p><span className="font-medium">Cuenta:</span> {account.accountNumber}</p>
                      <p><span className="font-medium">CLABE:</span> {account.clabe}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {paymentMethod === 'deposit' && (
              <div className="space-y-4">
                {debitCards.map((card, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium">{card.bank}</h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Número de Tarjeta:</span> {card.cardNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Resumen del Pedido</h3>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} {item.selectedUnit}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Información Personal</h3>
              <p>{formData.nombre}</p>
              <p>{formData.email}</p>
              <p>{formData.telefono}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Dirección de Envío</h3>
              <p>{formData.calle} {formData.numeroExt}{formData.numeroInt ? ` Int. ${formData.numeroInt}` : ''}</p>
              <p>{formData.colonia}</p>
              <p>{formData.ciudad}, {formData.estado}</p>
              <p>CP: {formData.codigoPostal}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Método de Pago</h3>
              <p className="capitalize">{paymentMethod === 'card' ? 'Tarjeta' : paymentMethod === 'transfer' ? 'Transferencia' : 'Depósito'}</p>
              {paymentMethod === 'card' && (
                <p className="text-sm text-gray-600">
                  Tarjeta terminación {formData.numeroTarjeta.slice(-4)}
                </p>
              )}
            </div>

            {(paymentMethod === 'transfer' || paymentMethod === 'deposit') && (
              <Alert
                className="mb-4"
                variant="bordered"
                startContent={<AlertTriangle className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="font-medium">Recordatorio importante</p>
                  <p>No olvides enviarnos el comprobante de pago para procesar tu pedido.</p>
                  <p className="text-sm">Los envíos se procesan el mismo día para pagos confirmados antes de la 1:00 PM.</p>
                </div>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex flex-col items-center ${
                index <= currentStep ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.icon}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm mb-6">
        {renderStepContent()}
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className={`flex items-center px-6 py-2 rounded-lg ${
            currentStep === 0
              ? 'invisible'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Anterior
        </button>
        <button
          type="button"
          onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {currentStep === steps.length - 1 ? 'Confirmar Pedido' : 'Siguiente'}
          {currentStep < steps.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  );
};

export default Checkout;