import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, CheckCircle, Info, Clock, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NotificationPage = () => {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'appointment',
      title: 'นัดหมายใกล้เข้า',
      message: 'คดี CTB-2025/282 มีนัดสืบพยานโจทก์ วันที่ 10 มิ.ย. 2568 เวลา 13:30',
      time: '2 ชั่วโมงที่แล้ว',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'case',
      title: 'อัปเดตสถานะคดี',
      message: 'คดี CTB-2025/283 ได้รับการอัปเดตสถานะเป็น "รอคำพิพากษา"',
      time: '4 ชั่วโมงที่แล้ว',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'document',
      title: 'เอกสารใหม่',
      message: 'มีการอัปโหลดเอกสารใหม่สำหรับคดี CTB-2025/280',
      time: '1 วันที่แล้ว',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'system',
      title: 'การบำรุงรักษาระบบ',
      message: 'ระบบจะมีการบำรุงรักษาในวันอาทิตย์ที่ 15 มิ.ย. 2568 เวลา 02:00-06:00',
      time: '2 วันที่แล้ว',
      isRead: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'user',
      title: 'ผู้ใช้ใหม่',
      message: 'มีผู้ใช้ใหม่ "นายสมชาย ดีมาก" ลงทะเบียนเข้าสู่ระบบ',
      time: '3 วันที่แล้ว',
      isRead: true,
      priority: 'low'
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'case':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <Info className="h-5 w-5 text-orange-600" />;
      case 'user':
        return <Users className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">การแจ้งเตือน</h1>
              <p className="text-sm text-gray-600">จัดการและติดตามการแจ้งเตือนทั้งหมด</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount} ข้อความใหม่
              </Badge>
            )}
            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="sm"
              disabled={unreadCount === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              อ่านทั้งหมด
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                <div className="text-sm text-gray-600">ทั้งหมด</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
                <div className="text-sm text-gray-600">ยังไม่อ่าน</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'appointment').length}
                </div>
                <div className="text-sm text-gray-600">นัดหมาย</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'case').length}
                </div>
                <div className="text-sm text-gray-600">คดี</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">รายการแจ้งเตือน</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
                <p className="text-gray-600">คุณไม่มีการแจ้งเตือนใดๆ ในขณะนี้</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority === 'high' ? 'สูง' : 
                             notification.priority === 'medium' ? 'กลาง' : 'ต่ำ'}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </div>
                        
                        <div className="flex space-x-2">
                          {!notification.isRead && (
                            <Button
                              onClick={() => markAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                            >
                              ทำเครื่องหมายว่าอ่านแล้ว
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            ลบ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationPage; 