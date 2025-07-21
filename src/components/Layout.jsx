import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload,
  Users,
  FilePlus,
  FileClock,
  Calendar,
  LogOut,
  Menu,
  X,
  Scale,
  Search,
  Bell,
  UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Sidebar = ({ isOpen, menuItems, location }) => {
  return (
    <motion.aside
      className="fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col"
      initial={false}
      animate={{
        width: isOpen ? 280 : 72,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-center h-[60px] border-b border-gray-200 flex-shrink-0">
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 overflow-hidden"
          >
            <Scale className="h-8 w-8 text-blue-700 flex-shrink-0" />
            {isOpen && <span className="text-2xl font-bold text-gray-800 whitespace-nowrap">Lawjaz</span>}
        </motion.div>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 text-sm font-medium whitespace-nowrap overflow-hidden ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
              } ${!isOpen ? 'justify-center' : ''}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};


const Layout = ({ children, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const menuItems = [
    { path: '/', icon: FileText, label: 'แดชบอร์ด' },
    { path: '/cases', icon: FileText, label: 'ข้อมูลคดี (แพ่ง)/คัดถ่าย' },
    { path: '/record-data', icon: Search, label: 'ค้นหาข้อมูลสำนักงานหมาย' },
    { path: '/new-record', icon: FileText, label: 'สร้างข้อมูลใหม่' },
    { path: '/import', icon: Upload, label: 'ยื่นฟ้องแบบนำไฟล์เข้าระบบ' },
    { path: '/submissions', icon: FileClock, label: 'ฉบับร่างและผลการยื่น' },
    { path: '/appointments', icon: Calendar, label: 'ตารางนัดหมาย' },
    { path: '/notifications', icon: Bell, label: 'การแจ้งเตือน' },
    { path: '/users', icon: UserCog, label: 'จัดการผู้ใช้งาน' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('lawjaz_auth');
    onLogout();
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้บริการ Lawjaz",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} menuItems={menuItems} location={location} />

      <motion.div
        className="relative"
        initial={false}
        animate={{
          marginLeft: sidebarOpen ? 280 : 72,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-2 h-[60px]">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700">เจษฎา จูประเสริฐ</span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default Layout;