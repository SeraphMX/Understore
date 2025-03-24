import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminFooter from '../components/admin/AdminFooter';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar isOpen={isSidebarOpen} />

      <main 
        className={`
          transition-all duration-300 
          ${isSidebarOpen ? 'ml-64' : 'ml-0'} 
          pt-16 pb-20 px-6
        `}
      >
        {children}
      </main>

      <AdminFooter isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default AdminLayout;