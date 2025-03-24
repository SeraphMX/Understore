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
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product, formatPrice, formatUnit } from '../../types';

const ROWS_PER_PAGE = 10;

const Products = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'name',
    direction: 'ascending'
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...products];

    if (hasSearchFilter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.category.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [products, filterValue]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Product];
      const second = b[sortDescriptor.column as keyof Product];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const pages = Math.ceil(sortedItems.length / ROWS_PER_PAGE);
  const items = sortedItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center gap-4">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        );
      case 'price':
        return formatPrice(product.price);
      case 'stock':
        return (
          <div className="flex items-center gap-2">
            <span>{product.stock}</span>
            <span className="text-gray-500">{formatUnit(product.baseUnit)}</span>
          </div>
        );
      case 'status':
        return (
          <Chip
            color={product.stock > 0 ? 'success' : 'danger'}
            variant="flat"
            size="sm"
          >
            {product.stock > 0 ? 'En Stock' : 'Agotado'}
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
                startContent={<Edit2 className="w-4 h-4" />}
              >
                Editar
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
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar productos..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            value={filterValue}
            onValueChange={onSearchChange}
          />
          <Button 
            color="primary" 
            className="bg-green-600 hover:bg-green-700"
            endContent={<Plus className="w-4 h-4" />}
          >
            Agregar Producto
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} productos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={() => {}}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, products.length]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los productos seleccionados'
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
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>

      <Table
        aria-label="Tabla de productos"
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
            key="name" 
            allowsSorting
            className="w-1/3"
          >
            Producto
          </TableColumn>
          <TableColumn 
            key="price" 
            allowsSorting
          >
            Precio
          </TableColumn>
          <TableColumn 
            key="stock" 
            allowsSorting
          >
            Stock
          </TableColumn>
          <TableColumn 
            key="status"
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

export default Products;