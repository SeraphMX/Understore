import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - Replace with actual data from your backend
  const stats = [
    {
      title: 'Usuarios Totales',
      value: '1,234',
      icon: <Users className="w-6 h-6" />,
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Productos',
      value: '456',
      icon: <Package className="w-6 h-6" />,
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Solicitudes Pendientes',
      value: '23',
      icon: <ClipboardList className="w-6 h-6" />,
      change: '-15%',
      trend: 'down'
    },
    {
      title: 'Ventas del Mes',
      value: '$45,678',
      icon: <TrendingUp className="w-6 h-6" />,
      change: '+8%',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="bg-green-100 p-2 rounded-lg">
                  {stat.icon}
                </div>
                <div className={`flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {/* Add your recent activity items here */}
            <p className="text-gray-600">No hay actividad reciente para mostrar.</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;