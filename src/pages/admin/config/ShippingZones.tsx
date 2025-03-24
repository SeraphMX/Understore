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
  Chip
} from '@nextui-org/react';
import { 
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Truck,
  Clock
} from 'lucide-react';

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  methods: {
    name: string;
    price: number;
    minDays: number;
    maxDays: number;
    freeShippingThreshold?: number;
  }[];
  isActive: boolean;
}

const ShippingZones = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);

  // Mock data - Replace with actual data from your backend
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'Península',
      regions: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
      methods: [
        {
          name: 'Estándar',
          price: 4.99,
          minDays: 3,
          maxDays: 5,
          freeShippingThreshold: 50
        },
        {
          name: 'Express',
          price: 9.99,
          minDays: 1,
          maxDays: 2
        }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Islas Baleares',
      regions: ['Mallorca', 'Menorca', 'Ibiza', 'Formentera'],
      methods: [
        {
          name: 'Estándar',
          price: 6.99,
          minDays: 4,
          maxDays: 6,
          freeShippingThreshold: 75
        }
      ],
      isActive: true
    },
    {
      id: '3',
      name: 'Islas Canarias',
      regions: ['Tenerife', 'Gran Canaria', 'Lanzarote', 'Fuerteventura'],
      methods: [
        {
          name: 'Estándar',
          price: 12.99,
          minDays: 7,
          maxDays: 10
        }
      ],
      isActive: false
    }
  ]);

  const handleStatusChange = (id: string, isActive: boolean) => {
    setShippingZones(zones =>
      zones.map(zone =>
        zone.id === id ? { ...zone, isActive } : zone
      )
    );
  };

  const handleEdit = (zone: ShippingZone) => {
    setEditingZone(zone);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setShippingZones(zones => zones.filter(zone => zone.id !== id));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    onClose();
    setEditingZone(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zonas de Envío</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingZone(null);
            onOpen();
          }}
        >
          Agregar Zona
        </Button>
      </div>

      <Table aria-label="Tabla de zonas de envío">
        <TableHeader>
          <TableColumn>Zona</TableColumn>
          <TableColumn>Regiones</TableColumn>
          <TableColumn>Métodos de Envío</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {shippingZones.map((zone) => (
            <TableRow key={zone.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{zone.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {zone.regions.map((region, index) => (
                    <Chip key={index} size="sm" variant="flat">
                      {region}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  {zone.methods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {method.price}€
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{method.minDays}-{method.maxDays} días</span>
                      </div>
                      {method.freeShippingThreshold && (
                        <Chip size="sm" color="success" variant="flat">
                          Gratis +{method.freeShippingThreshold}€
                        </Chip>
                      )}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={zone.isActive}
                  onValueChange={(isActive) => handleStatusChange(zone.id, isActive)}
                  color="success"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleEdit(zone)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(zone.id)}
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
            {editingZone ? 'Editar Zona de Envío' : 'Nueva Zona de Envío'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre de la Zona"
                placeholder="Ej: Península"
                defaultValue={editingZone?.name}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">Regiones</label>
                <div className="border rounded-lg p-4 space-y-2">
                  {editingZone?.regions.map((region, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        size="sm"
                        defaultValue={region}
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
                    Agregar Región
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Métodos de Envío</label>
                <div className="border rounded-lg p-4 space-y-4">
                  {editingZone?.methods.map((method, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                      <Input
                        size="sm"
                        label="Nombre"
                        defaultValue={method.name}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          size="sm"
                          label="Precio"
                          type="number"
                          defaultValue={method.price.toString()}
                          startContent="€"
                        />
                        <Input
                          size="sm"
                          label="Envío gratis desde"
                          type="number"
                          defaultValue={method.freeShippingThreshold?.toString()}
                          startContent="€"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          size="sm"
                          label="Días mínimos"
                          type="number"
                          defaultValue={method.minDays.toString()}
                        />
                        <Input
                          size="sm"
                          label="Días máximos"
                          type="number"
                          defaultValue={method.maxDays.toString()}
                        />
                      </div>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        className="w-full"
                        startContent={<Trash2 className="w-4 h-4" />}
                      >
                        Eliminar Método
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Plus className="w-4 h-4" />}
                  >
                    Agregar Método
                  </Button>
                </div>
              </div>

              <Switch defaultSelected={editingZone?.isActive}>
                Zona Activa
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

export default ShippingZones;