import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Store } from 'lucide-react';
import { Avatar, Button, Badge } from '@nextui-org/react';
import { RootState } from '../../store/store';
import { setView } from '../../store/slices/layoutSlice';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unreadNotifications = 3; // Replace with actual count from your state

  const handleStoreView = () => {
    dispatch(setView('store'));
    navigate('/');
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b z-40 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onClick={onToggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </Button>

          <Button
            variant="light"
            color="primary"
            startContent={<Store className="w-5 h-5" />}
            onClick={handleStoreView}
          >
            Ver Tienda
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <Badge
                content={unreadNotifications}
                color="danger"
                size="sm"
                className="absolute -top-1 -right-1"
              />
            )}
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <Avatar
              src="https://i.pravatar.cc/150?u=admin"
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;