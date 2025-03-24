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
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Chip
} from '@nextui-org/react';
import { 
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  HelpCircle
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  order: number;
}

const AdminFAQ = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // Mock data - Replace with actual data from your backend
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito, transferencias bancarias y pago contra reembolso.',
      category: 'Pagos',
      isPublished: true,
      order: 1
    },
    {
      id: '2',
      question: '¿Cuánto tarda en llegar mi pedido?',
      answer: 'Los envíos tardan entre 3-5 días hábiles para península y 5-7 días para islas.',
      category: 'Envíos',
      isPublished: true,
      order: 2
    },
    {
      id: '3',
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Puedes rastrear tu pedido desde tu cuenta usando el número de seguimiento proporcionado.',
      category: 'Envíos',
      isPublished: true,
      order: 3
    }
  ]);

  const handleStatusChange = (id: string, isPublished: boolean) => {
    setFaqs(items =>
      items.map(item =>
        item.id === id ? { ...item, isPublished } : item
      )
    );
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setFaqs(items => items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    onClose();
    setEditingFAQ(null);
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Preguntas Frecuentes</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingFAQ(null);
            onOpen();
          }}
        >
          Agregar Pregunta
        </Button>
      </div>

      <Table aria-label="Tabla de preguntas frecuentes">
        <TableHeader>
          <TableColumn>Orden</TableColumn>
          <TableColumn>Pregunta</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="cursor-move">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  <span>{faq.order}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{faq.question}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {faq.answer}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat">
                  {faq.category}
                </Chip>
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={faq.isPublished}
                  onValueChange={(isPublished) => handleStatusChange(faq.id, isPublished)}
                  color="success"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleEdit(faq)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(faq.id)}
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
            {editingFAQ ? 'Editar Pregunta' : 'Nueva Pregunta'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Pregunta"
                placeholder="Escribe la pregunta"
                defaultValue={editingFAQ?.question}
              />

              <Textarea
                label="Respuesta"
                placeholder="Escribe la respuesta"
                defaultValue={editingFAQ?.answer}
                minRows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingFAQ?.category}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="new">+ Nueva categoría</option>
                </select>

                <Input
                  type="number"
                  label="Orden"
                  defaultValue={editingFAQ?.order.toString()}
                />
              </div>

              <Switch defaultSelected={editingFAQ?.isPublished}>
                Publicado
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

export default AdminFAQ;