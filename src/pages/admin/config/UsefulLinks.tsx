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
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  isVisible: boolean;
  order: number;
  openInNewTab: boolean;
}

const UsefulLinks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Mock data - Replace with actual data from your backend
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Guía de Cultivo',
      url: '/guia-cultivo',
      category: 'Recursos',
      isVisible: true,
      order: 1,
      openInNewTab: false
    },
    {
      id: '2',
      title: 'Blog de Jardinería',
      url: '/blog',
      category: 'Blog',
      isVisible: true,
      order: 2,
      openInNewTab: false
    },
    {
      id: '3',
      title: 'Canal de YouTube',
      url: 'https://youtube.com/semillasshop',
      category: 'Social',
      isVisible: true,
      order: 3,
      openInNewTab: true
    }
  ]);

  const handleStatusChange = (id: string, isVisible: boolean) => {
    setLinks(items =>
      items.map(item =>
        item.id === id ? { ...item, isVisible } : item
      )
    );
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setLinks(items => items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    onClose();
    setEditingLink(null);
  };

  const categories = Array.from(new Set(links.map(link => link.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enlaces Útiles</h1>
        <Button
          color="primary"
          className="bg-green-600 hover:bg-green-700"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingLink(null);
            onOpen();
          }}
        >
          Agregar Enlace
        </Button>
      </div>

      <Table aria-label="Tabla de enlaces útiles">
        <TableHeader>
          <TableColumn>Orden</TableColumn>
          <TableColumn>Enlace</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Visible</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="cursor-move">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  <span>{link.order}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{link.title}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" />
                    {link.url}
                    {link.openInNewTab && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat">
                  {link.category}
                </Chip>
              </TableCell>
              <TableCell>
                <Switch
                  isSelected={link.isVisible}
                  onValueChange={(isVisible) => handleStatusChange(link.id, isVisible)}
                  color="success"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleEdit(link)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(link.id)}
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
            {editingLink ? 'Editar Enlace' : 'Nuevo Enlace'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Título"
                placeholder="Nombre del enlace"
                defaultValue={editingLink?.title}
              />

              <Input
                label="URL"
                placeholder="https://..."
                defaultValue={editingLink?.url}
                startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
              />

              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingLink?.category}
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
                  defaultValue={editingLink?.order.toString()}
                />
              </div>

              <div className="flex gap-4">
                <Switch defaultSelected={editingLink?.isVisible}>
                  Visible
                </Switch>
                <Switch defaultSelected={editingLink?.openInNewTab}>
                  Abrir en nueva pestaña
                </Switch>
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

export default UsefulLinks;