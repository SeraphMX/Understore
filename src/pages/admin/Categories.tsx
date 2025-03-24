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
  Pagination,
  Selection
} from '@nextui-org/react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2,
  Package
} from 'lucide-react';
import { categories } from '../../data/products';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ROWS_PER_PAGE = 10;

const Categories = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);

  const categoriesWithCount = categories.map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length
  }));

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...categoriesWithCount];

    if (hasSearchFilter) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [categoriesWithCount, filterValue]);

  const pages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const items = filteredItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderCell = React.useCallback((category: { name: string; count: number }, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium">{category.name}</span>
          </div>
        );
      case 'products':
        return category.count;
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
            placeholder="Buscar categorías..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            value={filterValue}
            onValueChange={onSearchChange}
          />
          <Button 
            color="primary" 
            className="bg-green-600 hover:bg-green-700"
            endContent={<Plus className="w-4 h-4" />}
          >
            Agregar Categoría
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {categories.length} categorías
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
            ? 'Todas las categorías seleccionadas'
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
        <h1 className="text-2xl font-bold">Categorías</h1>
      </div>

      <Table
        aria-label="Tabla de categorías"
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
          <TableColumn key="name">Categoría</TableColumn>
          <TableColumn key="products">Productos</TableColumn>
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
            <TableRow key={item.name}>
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

export default Categories;