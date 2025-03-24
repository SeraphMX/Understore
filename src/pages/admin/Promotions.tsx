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
  useDisclosure,
  Chip, Textarea
} from '@nextui-org/react';
import { 
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Tag,
  Percent
} from 'lucide-react';
import { format } from 'date-fns';

interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions?: string;
  applicableProducts: string[];
}

const Promotions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  // Mock data - Replace with actual data from your backend
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      name: 'Descuento Primavera',
      description: '20% de descuento en todas las semillas de flores',
      discountType: 'percentage',
      discountValue: 20,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-31'),
      isActive: true,
      conditions: 'Mínimo de compra: 30€',
      applicableProducts: ['Semillas de Lavanda', 'Semillas de Rosa', 'Semillas de Margarita']
    },
    {
      id: '2',
      name: 'Envío Gratis',
      description: 'Envío gratuito en pedidos superiores a 50€',
      discountType: 'fixed',
      discountValue: 4.99,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-12-31'),
      isActive: true,
      conditions: 'Solo península',
      applicableProducts: []
    }
  ]);

  const handleStatusChange = (id: string, isActive: boolean) => {
    setPromotions(items =>
      items.map(item =>
        item.id === id ? { ...item, isActive } : item
      )
    );
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setPromotions(items => items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    onClose();
    setEditingPromotion(null);
  };

  const getStatusColor = (promotion: Promotion) => {
    const now = new Date();
    if (!promotion.isActive) return 'default';
    if (now < promotion.startDate) return 'warning';
    if (now > promotion.endDate) return 'danger';
    return 'success';
  };

  const getStatusText = (promotion: Promotion) => {
    const now = new Date();
    if (!promotion.isActive) return 'Inactiva';
    if (now < promotion.startDate) return 'Programada';
    if (now > promotion.endDate) return 'Expirada';
    return 'Activa';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Promociones</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingPromotion(null);
            onOpen();
          }}
        >
          Agregar Promoción
        </Button>
      </div>

      <Table aria-label="Tabla de promociones">
        <TableHeader>
          <TableColumn>Promoción</TableColumn>
          <TableColumn>Descuento</TableColumn>
          <TableColumn>Fechas</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {promotions.map((promotion) => (
            <TableRow key={promotion.id}>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{promotion.name}</div>
                  <div className="text-sm text-gray-600">{promotion.description}</div>
                  {promotion.conditions && (
                    <div className="text-xs text-gray-500">{promotion.conditions}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    {promotion.discountType === 'percentage' ? (
                      <Percent className="w-5 h-5" />
                    ) : (
                      <Tag className="w-5 h-5" />
                    )}
                  </div>
                  <span>
                    {promotion.discountType === 'percentage'
                      ? `${promotion.discountValue}%`
                      : `${promotion.discountValue}€`}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{format(promotion.startDate, 'dd/MM/yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{format(promotion.endDate, 'dd/MM/yyyy')}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Chip
                    color={getStatusColor(promotion)}
                    variant="flat"
                    size="sm"
                  >
                    {getStatusText(promotion)}
                  </Chip>
                  <Switch
                    size="sm"
                    isSelected={promotion.isActive}
                    onValueChange={(isActive) => handleStatusChange(promotion.id, isActive)}
                    color="success"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleEdit(promotion)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(promotion.id)}
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
            {editingPromotion ? 'Editar Promoción' : 'Nueva Promoción'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre"
                placeholder="Nombre de la promoción"
                defaultValue={editingPromotion?.name}
              />

              <Textarea
                label="Descripción"
                placeholder="Describe la promoción"
                defaultValue={editingPromotion?.description}
                minRows={2}
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingPromotion?.discountType}
                >
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Cantidad fija</option>
                </select>

                <Input
                  type="number"
                  label="Valor del descuento"
                  defaultValue={editingPromotion?.discountValue.toString()}
                  startContent={
                    editingPromotion?.discountType === 'fixed' ? '€' : '%'
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Fecha de inicio"
                  defaultValue={editingPromotion?.startDate.toISOString().split('T')[0]}
                />
                <Input
                  type="date"
                  label="Fecha de fin"
                  defaultValue={editingPromotion?.endDate.toISOString().split('T')[0]}
                />
              </div>

              <Input
                label="Condiciones (opcional)"
                placeholder="Ej: Mínimo de compra: 30€"
                defaultValue={editingPromotion?.conditions}
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Productos Aplicables
                </label>
                <div className="border rounded-lg p-4">
                  <div className="space-y-2">
                    {editingPromotion?.applicableProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          size="sm"
                          value={product}
                          className="flex-grow"
                        />
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Plus className="w-4 h-4" />}
                    >
                      Agregar Producto
                    </Button>
                  </div>
                </div>
              </div>

              <Switch defaultSelected={editingPromotion?.isActive}>
                Promoción Activa
              </Switch>
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

export default Promotions;