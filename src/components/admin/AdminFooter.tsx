import React from 'react';

interface AdminFooterProps {
  isSidebarOpen: boolean;
}

const AdminFooter: React.FC<AdminFooterProps> = ({ isSidebarOpen }) => {
  return (
    <footer 
      className={`
        fixed bottom-0 right-0 bg-white border-t h-12 z-30
        transition-all duration-300
        ${isSidebarOpen ? 'left-64' : 'left-0'}
      `}
    >
      <div className="flex items-center justify-between h-full px-6">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} SemillasShop Admin. Todos los derechos reservados.
        </p>
        <p className="text-sm text-gray-500">
          Versión 1.0.0
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;