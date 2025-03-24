import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Switch,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react';
import { 
  CreditCard, 
  Building2, 
  BanknoteIcon,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'transfer' | 'cash';
  isActive: boolean;
  details: {
    [key: string]: string;
  };
}

const PaymentMethods = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);

  // Mock data - Replace with actual data from your backend
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      name: 'Tarjeta de Crédito/Débito',
      type: 'card',
      isActive: true,
      details: {
        provider: 'Stripe',
        currencies: 'EUR',
        fees: '2.9% + 0.30€'
      }
    },
    {
      id: '2',
      name: 'Transferencia Bancaria',
      type: 'transfer',
      isActive: true,
      details: {
        bank: 'BBVA',
        account: 'ES12 1234 5678 9012 3456 7890',
        holder: 'SemillasShop S.L.'
      }
    },
    {
      id: '3',
      name: 'Pago Contra Reembolso',
      type: 'cash',
      isActive: false,
      details: {
        fee: '3.95€',
        restrictions: 'Solo península'
      }
    }
  ]);

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'transfer':
        return <Building2 className="w-5 h-5" />;
      case 'cash':
        return <BanknoteIcon className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const handleStatusChange = (id: string, isActive: boolean) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, isActive } : method
      )
    );
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    onClose();
    setEditingMethod(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medios de Pago</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingMethod(null);
            onOpen();
          }}
        >
          Agregar Método
        </Button>
      </div>

      <Table aria-label="Tabla de métodos de pago">
        <TableHeader>
          <TableColumn>Método</TableColumn>
          <TableColumn>Detalles</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {paymentMethods.map((method) => (
            <TableRow key={method.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    method.type === 'card' ? 'bg-blue-100 text-blue-600' :
                    method.type === 'transfer' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {getMethodIcon(method.type)}
                  </div>
                  <span className="font-medium">{method.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {Object.entries(method.details).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium capitalize">{key}:</span>{' '}
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={method.isActive}
                  onValueChange={(isActive) => handleStatusChange(method.id, isActive)}
                  color="success"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleEdit(method)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editingMethod ? 'Editar Método de Pago' : 'Nuevo Método de Pago'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre"
                placeholder="Nombre del método de pago"
                defaultValue={editingMethod?.name}
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Seleccionar tipo</option>
                  <option value="card">Tarjeta</option>
                  <option value="transfer">Transferencia</option>
                  <option value="cash">Efectivo</option>
                </select>
                <Switch defaultSelected={editingMethod?.isActive}>
                  Activo
                </Switch>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Detalles</h3>
                {editingMethod && Object.entries(editingMethod.details).map(([key, value]) => (
                  <Input
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    defaultValue={value}
                  />
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleSave}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaymentMethods;