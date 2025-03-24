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
  Selection
} from '@nextui-org/react';
import { 
  Search, 
  MoreVertical, 
  Eye,
  Truck,
  Ban,
  Package,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { orders } from '../../data/orders';
import { formatPrice, formatDate, getStatusColor, getStatusText } from '../../types';

const ROWS_PER_PAGE = 10;

const Orders = () => {
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
    let filtered = [...orders];

    if (hasSearchFilter) {
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(filterValue.toLowerCase()) ||
        order.tracking.number.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    return filtered;
  }, [filterValue, statusFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const pages = Math.ceil(sortedItems.length / ROWS_PER_PAGE);
  const items = sortedItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderCell = React.useCallback((order: typeof orders[0], columnKey: React.Key) => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-gray-500">{order.tracking.number}</p>
          </div>
        );
      case 'date':
        return formatDate(order.date);
      case 'status':
        return (
          <Chip
            className={getStatusColor(order.status)}
            variant="flat"
            size="sm"
            startContent={
              order.status === 'processing' ? (
                <Clock className="w-3 h-3" />
              ) : order.status === 'shipped' ? (
                <Package className="w-3 h-3" />
              ) : order.status === 'in_transit' ? (
                <Truck className="w-3 h-3" />
              ) : order.status === 'delivered' ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Ban className="w-3 h-3" />
              )
            }
          >
            {getStatusText(order.status)}
          </Chip>
        );
      case 'total':
        return (
          <p className="font-medium">{formatPrice(order.total)}</p>
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
                Ver Detalles
              </DropdownItem>
              {order.status === 'processing' && (
                <DropdownItem
                  startContent={<Package className="w-4 h-4" />}
                  className="text-success"
                  color="success"
                >
                  Marcar como Enviado
                </DropdownItem>
              )}
              {order.status === 'shipped' && (
                <DropdownItem
                  startContent={<Truck className="w-4 h-4" />}
                  className="text-primary"
                  color="primary"
                >
                  Actualizar Tracking
                </DropdownItem>
              )}
              {['processing', 'shipped'].includes(order.status) && (
                <DropdownItem
                  startContent={<Ban className="w-4 h-4" />}
                  className="text-danger"
                  color="danger"
                >
                  Cancelar Pedido
                </DropdownItem>
              )}
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
              placeholder="Buscar pedidos..."
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
              <option value="processing">En Preparación</option>
              <option value="shipped">Enviado</option>
              <option value="in_transit">En Tránsito</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orders.length} pedidos
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
            ? 'Todos los pedidos seleccionados'
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
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>

      <Table
        aria-label="Tabla de pedidos"
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
            key="id"
            allowsSorting
          >
            Pedido
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
            key="total"
            allowsSorting
          >
            Total
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

export default Orders;