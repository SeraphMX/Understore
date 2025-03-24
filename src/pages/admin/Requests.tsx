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
  Chip,
  Pagination,
  Selection,
  Avatar
} from '@nextui-org/react';
import { 
  Search, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';

interface Request {
  id: string;
  username: string;
  phoneNumber: string;
  socialLink: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data
const requests: Request[] = [
  {
    id: 'REQ-001',
    username: 'maria_garcia',
    phoneNumber: '5512345678',
    socialLink: 'https://facebook.com/maria.garcia',
    date: new Date('2024-02-20'),
    status: 'pending'
  },
  {
    id: 'REQ-002',
    username: 'juan_perez',
    phoneNumber: '5587654321',
    socialLink: 'https://instagram.com/juan.perez',
    date: new Date('2024-02-19'),
    status: 'approved'
  },
  {
    id: 'REQ-003',
    username: 'ana_martinez',
    phoneNumber: '5598765432',
    socialLink: 'https://facebook.com/ana.martinez',
    date: new Date('2024-02-18'),
    status: 'rejected'
  }
];

const ROWS_PER_PAGE = 10;

const Requests = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...requests];

    if (hasSearchFilter) {
      filtered = filtered.filter((request) =>
        request.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        request.phoneNumber.includes(filterValue)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    return filtered;
  }, [filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const items = filteredItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderCell = React.useCallback((request: Request, columnKey: React.Key) => {
    switch (columnKey) {
      case 'user':
        return (
          <div className="flex items-center gap-4">
            <Avatar
              name={request.username}
              size="sm"
            />
            <div>
              <p className="font-medium">{request.username}</p>
              <p className="text-sm text-gray-500">{request.phoneNumber}</p>
            </div>
          </div>
        );
      case 'socialLink':
        return (
          <Button
            as="a"
            href={request.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            size="sm"
            endContent={<ExternalLink className="w-4 h-4" />}
          >
            Ver perfil
          </Button>
        );
      case 'date':
        return request.date.toLocaleDateString();
      case 'status':
        return (
          <Chip
            color={
              request.status === 'approved' 
                ? 'success' 
                : request.status === 'rejected'
                ? 'danger'
                : 'warning'
            }
            variant="flat"
            size="sm"
          >
            {request.status === 'approved' 
              ? 'Aprobado' 
              : request.status === 'rejected'
              ? 'Rechazado'
              : 'Pendiente'
            }
          </Chip>
        );
      case 'actions':
        return request.status === 'pending' ? (
          <div className="flex gap-2 justify-end">
            <Button
              isIconOnly
              color="success"
              variant="flat"
              size="sm"
              onClick={() => {}}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              size="sm"
              onClick={() => {}}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : null;
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
              placeholder="Buscar solicitudes..."
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
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {requests.length} solicitudes
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, statusFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todas las solicitudes seleccionadas'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionadas`}
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
        <h1 className="text-2xl font-bold">Solicitudes de Acceso</h1>
      </div>

      <Table
        aria-label="Tabla de solicitudes"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[calc(100vh-300px)]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn key="user">Usuario</TableColumn>
          <TableColumn key="socialLink">Red Social</TableColumn>
          <TableColumn key="date">Fecha</TableColumn>
          <TableColumn key="status">Estado</TableColumn>
          <TableColumn 
            key="actions"
            align="center"
            className="w-[100px]"
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

export default Requests;