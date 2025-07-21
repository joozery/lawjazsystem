import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'คดีทั้งหมด',
      value: '1,247',
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'ผู้ใช้งาน',
      value: '89',
      change: '+5%',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'นัดหมายวันนี้',
      value: '23',
      change: '+8%',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'อัตราความสำเร็จ',
      value: '94.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const caseStatusData = [
    { name: 'รอดำเนินการ', value: 45, color: '#fbbf24' },
    { name: 'กำลังดำเนินการ', value: 32, color: '#3b82f6' },
    { name: 'เสร็จสิ้น', value: 78, color: '#10b981' },
    { name: 'ยกเลิก', value: 12, color: '#ef4444' }
  ];

  const monthlyData = [
    { month: 'ม.ค.', cases: 65 },
    { month: 'ก.พ.', cases: 78 },
    { month: 'มี.ค.', cases: 90 },
    { month: 'เม.ย.', cases: 81 },
    { month: 'พ.ค.', cases: 95 },
    { month: 'มิ.ย.', cases: 102 }
  ];

  const recentCases = [
    { id: 'C001', title: 'คดีแพ่ง - สัญญาซื้อขาย', status: 'in-progress', date: '2024-01-15' },
    { id: 'C002', title: 'คดีอาญา - ฟ้องร้องเรียกค่าเสียหาย', status: 'pending', date: '2024-01-14' },
    { id: 'C003', title: 'คดีครอบครัว - การหย่าร้าง', status: 'completed', date: '2024-01-13' },
    { id: 'C004', title: 'คดีแรงงาน - เรียกค่าชดเชย', status: 'cancelled', date: '2024-01-12' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'in-progress': return 'กำลังดำเนินการ';
      case 'completed': return 'เสร็จสิ้น';
      case 'cancelled': return 'ยกเลิก';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">แดชบอร์ด</h1>
        <div className="text-sm text-gray-500">
          อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} จากเดือนที่แล้ว</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Cases Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>สถิติคดีรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Status Pie Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>สถานะคดี</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>คดีล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCases.map((case_, index) => (
              <motion.div
                key={case_.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full status-${case_.status}`}>
                    {getStatusIcon(case_.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{case_.title}</h3>
                    <p className="text-sm text-gray-500">รหัสคดี: {case_.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium status-${case_.status}`}>
                    {getStatusText(case_.status)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{case_.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;