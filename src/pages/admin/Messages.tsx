import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  Avatar
} from '@nextui-org/react';
import { 
  Search, 
  MoreVertical, 
  Eye,
  Send,
  Archive,
  Star,
  Trash2,
  MessageSquare,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: Date;
  status: 'unread' | 'read' | 'archived' | 'urgent' | 'resolved';
  avatar?: string;
}

// Mock data
const messages: Message[] = [
  {
    id: 'MSG-001',
    from: 'María García',
    subject: 'Consulta sobre semillas de lavanda',
    content: 'Me gustaría saber si tienen disponibles semillas de lavanda francesa...',
    date: new Date('2024-02-20T10:30:00'),
    status: 'unread',
    avatar: 'https://i.pravatar.cc/150?u=maria'
  },
  {
    id: 'MSG-002',
    from: 'Juan Pérez',
    subject: 'Problema con mi pedido',
    content: 'No he recibido confirmación de mi pedido #ORD-2024-001...',
    date: new Date('2024-02-19T15:45:00'),
    status: 'urgent',
    avatar: 'https://i.pravatar.cc/150?u=juan'
  },
  {
    id: 'MSG-003',
    from: 'Ana Martínez',
    subject: 'Agradecimiento',
    content: 'Quería agradecer el excelente servicio y la calidad de las semillas...',
    date: new Date('2024-02-18T09:15:00'),
    status: 'resolved',
    avatar: 'https://i.pravatar.cc/150?u=ana'
  }
];

const ROWS_PER_PAGE = 10;

const Messages = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'date',
    direction: 'descending'
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...messages];

    if (hasSearchFilter) {
      filtered = filtered.filter((message) =>
        message.from.toLowerCase().includes(filterValue.toLowerCase()) ||
        message.subject.toLowerCase().includes(filterValue.toLowerCase()) ||
        message.content.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((message) => message.status === statusFilter);
    }

    return filtered;
  }, [filterValue, statusFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Message];
      const second = b[sortDescriptor.column as keyof Message];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const pages = Math.ceil(sortedItems.length / ROWS_PER_PAGE);
  const items = sortedItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-600';
      case 'urgent':
        return 'bg-red-100 text-red-600';
      case 'resolved':
        return 'bg-green-100 text-green-600';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return <MessageSquare className="w-3 h-3" />;
      case 'urgent':
        return <AlertTriangle className="w-3 h-3" />;
      case 'resolved':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'archived':
        return <Archive className="w-3 h-3" />;
      default:
        return <MessageSquare className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return 'No leído';
      case 'urgent':
        return 'Urgente';
      case 'resolved':
        return 'Resuelto';
      case 'archived':
        return 'Archivado';
      default:
        return status;
    }
  };

  const renderCell = React.useCallback((message: Message, columnKey: React.Key) => {
    switch (columnKey) {
      case 'from':
        return (
          <div className="flex items-center gap-4">
            <Avatar
              src={message.avatar}
              name={message.from}
              size="sm"
            />
            <div>
              <p className="font-medium">{message.from}</p>
              <p className="text-sm text-gray-500">{message.subject}</p>
            </div>
          </div>
        );
      case 'content':
        return (
          <p className="truncate max-w-md">{message.content}</p>
        );
      case 'date':
        return (
          <p className="text-sm text-gray-600">
            {message.date.toLocaleDateString()} {message.date.toLocaleTimeString()}
          </p>
        );
      case 'status':
        return (
          <Chip
            className={getStatusColor(message.status)}
            variant="flat"
            size="sm"
            startContent={getStatusIcon(message.status)}
          >
            {getStatusText(message.status)}
          </Chip>
        );
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                startContent={<Eye className="w-4 h-4" />}
              >
                Ver Mensaje
              </DropdownItem>
              <DropdownItem
                startContent={<Send className="w-4 h-4" />}
              >
                Responder
              </DropdownItem>
              <DropdownItem
                startContent={<Star className="w-4 h-4" />}
              >
                Marcar como Importante
              </DropdownItem>
              <DropdownItem
                startContent={<Archive className="w-4 h-4" />}
              >
                Archivar
              </DropdownItem>
              <DropdownItem
                startContent={<Trash2 className="w-4 h-4" />}
                className="text-danger"
                color="danger"
              >
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return null;
    }
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Buscar mensajes..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <select
              className="px-3 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="unread">No leídos</option>
              <option value="urgent">Urgentes</option>
              <option value="resolved">Resueltos</option>
              <option value="archived">Archivados</option>
            </select>
          </div>
          <Button 
            color="primary" 
            className="bg-green-600 hover:bg-green-700"
            endContent={<Send className="w-4 h-4" />}
          >
            Nuevo Mensaje
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {messages.length} mensajes
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los mensajes seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mensajes</h1>
      </div>

      <Table
        aria-label="Tabla de mensajes"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[calc(100vh-300px)]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn 
            key="from"
            allowsSorting
          >
            Remitente
          </TableColumn>
          <TableColumn 
            key="content"
          >
            Mensaje
          </TableColumn>
          <TableColumn 
            key="date"
            allowsSorting
          >
            Fecha
          </TableColumn>
          <TableColumn 
            key="status"
            allowsSorting
          >
            Estado
          </TableColumn>
          <TableColumn 
            key="actions"
            align="center"
            className="w-12"
          >
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Messages;