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
  Edit2, 
  Trash2,
  Ban,
  CheckCircle2
} from 'lucide-react';
import { users } from '../../data/users';

const ROWS_PER_PAGE = 10;

const Users = () => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...users];

    if (hasSearchFilter) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.phoneNumber.includes(filterValue)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    return filtered;
  }, [filterValue, roleFilter]);

  const pages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const items = filteredItems.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderCell = React.useCallback((user: typeof users[0], columnKey: React.Key) => {
    switch (columnKey) {
      case 'user':
        return (
          <div className="flex items-center gap-4">
            <Avatar
              name={user.username}
              size="sm"
            />
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-500">{user.phoneNumber}</p>
            </div>
          </div>
        );
      case 'role':
        return (
          <Chip
            color={
              user.role === 'admin' 
                ? 'danger' 
                : user.role === 'staff'
                ? 'warning'
                : 'success'
            }
            variant="flat"
            size="sm"
          >
            {user.role === 'admin' 
              ? 'Administrador' 
              : user.role === 'staff'
              ? 'Staff'
              : 'Usuario'
            }
          </Chip>
        );
      case 'status':
        return (
          <Chip
            color={user.isApproved ? 'success' : 'warning'}
            variant="flat"
            size="sm"
          >
            {user.isApproved ? 'Activo' : 'Pendiente'}
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
              {user.isApproved ? (
                <DropdownItem
                  startContent={<Ban className="w-4 h-4" />}
                  className="text-danger"
                  color="danger"
                >
                  Suspender
                </DropdownItem>
              ) : (
                <DropdownItem
                  startContent={<CheckCircle2 className="w-4 h-4" />}
                  className="text-success"
                  color="success"
                >
                  Aprobar
                </DropdownItem>
              )}
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
              placeholder="Buscar usuarios..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <select
              className="px-3 py-2 border rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="staff">Staff</option>
              <option value="user">Usuarios</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} usuarios
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, roleFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los usuarios seleccionados'
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
        <h1 className="text-2xl font-bold">Usuarios</h1>
      </div>

      <Table
        aria-label="Tabla de usuarios"
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
          <TableColumn key="role">Rol</TableColumn>
          <TableColumn key="status">Estado</TableColumn>
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

export default Users;