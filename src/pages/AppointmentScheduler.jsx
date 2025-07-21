
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Clock, 
  User,
  MapPin,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// Calendar Component
const CalendarComponent = ({ appointments, selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysOfWeek = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const calendarDays = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return appointments.filter(appointment => appointment.date === dateKey);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    return formatDateKey(date) === formatDateKey(today);
  };

  const isSelected = (date) => {
    return selectedDate && formatDateKey(date) === formatDateKey(selectedDate);
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === month;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {monthNames[month]} {year}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              วันนี้
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date);
            const hasAppointments = dayAppointments.length > 0;

            return (
              <motion.button
                key={index}
                onClick={() => onDateSelect(date)}
                className={`
                  relative p-2 h-12 text-sm rounded-md transition-all duration-200
                  ${isCurrentMonth(date) ? 'text-gray-900' : 'text-gray-300'}
                  ${isToday(date) ? 'bg-blue-500 text-white font-bold' : ''}
                  ${isSelected(date) && !isToday(date) ? 'bg-blue-100 text-blue-900' : ''}
                  ${!isToday(date) && !isSelected(date) ? 'hover:bg-gray-100' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{date.getDate()}</span>
                {hasAppointments && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-0.5">
                      {dayAppointments.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isToday(date) ? 'bg-white' : 'bg-blue-500'
                          }`}
                        />
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className={`text-xs ${isToday(date) ? 'text-white' : 'text-blue-500'}`}>
                          +
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = React.useState([
    {
      id: 1,
      title: 'ประชุมปรึกษาคดี C001',
      client: 'นายสมชาย ใจดี',
      date: '2024-01-20',
      time: '10:00',
      location: 'ห้องประชุม A',
      type: 'consultation',
      status: 'confirmed',
      notes: 'ปรึกษาเรื่องสัญญาซื้อขาย'
    },
    {
      id: 2,
      title: 'นัดศาลคดี C002',
      client: 'นางสาวมาลี สวยงาม',
      date: '2024-01-22',
      time: '14:00',
      location: 'ศาลอาญากรุงเทพใต้',
      type: 'court',
      status: 'pending',
      notes: 'การพิจารณาคดีอาญา'
    },
    {
      id: 3,
      title: 'ประชุมทีมกฎหมาย',
      client: 'ทีมภายใน',
      date: '2024-01-25',
      time: '09:00',
      location: 'ห้องประชุมใหญ่',
      type: 'meeting',
      status: 'confirmed',
      notes: 'ประชุมรายสัปดาห์'
    },
    {
      id: 4,
      title: 'ปรึกษาคดีใหม่',
      client: 'นายเอก จริงใจ',
      date: '2024-01-20',
      time: '15:30',
      location: 'ห้องประชุม B',
      type: 'consultation',
      status: 'confirmed',
      notes: 'ปรึกษาเรื่องคดีแพ่ง'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAppointment, setEditingAppointment] = React.useState(null);
  const [formData, setFormData] = React.useState({
    title: '',
    client: '',
    date: '',
    time: '',
    location: '',
    type: 'consultation',
    status: 'pending',
    notes: ''
  });

  const typeOptions = [
    { value: 'consultation', label: 'ปรึกษา', color: 'bg-blue-100 text-blue-800' },
    { value: 'court', label: 'ศาล', color: 'bg-red-100 text-red-800' },
    { value: 'meeting', label: 'ประชุม', color: 'bg-green-100 text-green-800' },
    { value: 'other', label: 'อื่นๆ', color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'รอยืนยัน', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'ยืนยันแล้ว', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'ยกเลิก', color: 'bg-red-100 text-red-800' },
    { value: 'completed', label: 'เสร็จสิ้น', color: 'bg-blue-100 text-blue-800' }
  ];

  // Filter appointments by selected date and search term
  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Filter by selected date
    if (selectedDate) {
      const selectedDateKey = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter(appointment => appointment.date === selectedDateKey);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredAppointments = getFilteredAppointments();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุชื่อนัดหมาย วันที่ และเวลา",
        variant: "destructive"
      });
      return;
    }

    if (editingAppointment) {
      setAppointments(appointments.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...appointment, ...formData }
          : appointment
      ));
      toast({
        title: "แก้ไขนัดหมายสำเร็จ",
        description: `นัดหมาย ${formData.title} ได้รับการแก้ไขแล้ว`,
      });
    } else {
      const newAppointment = {
        ...formData,
        id: Date.now()
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: "เพิ่มนัดหมายใหม่สำเร็จ",
        description: `นัดหมาย ${formData.title} ได้รับการเพิ่มแล้ว`,
      });
    }

    setFormData({
      title: '',
      client: '',
      date: '',
      time: '',
      location: '',
      type: 'consultation',
      status: 'pending',
      notes: ''
    });
    setEditingAppointment(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      title: appointment.title,
      client: appointment.client,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (appointmentId) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    toast({
      title: "ลบนัดหมายสำเร็จ",
      description: "นัดหมายได้รับการลบออกจากระบบแล้ว",
    });
  };

  const getTypeBadge = (type) => {
    const typeOption = typeOptions.find(opt => opt.value === type);
    return (
      <Badge className={typeOption?.color}>
        {typeOption?.label}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return (
      <Badge className={statusOption?.color}>
        {statusOption?.label}
      </Badge>
    );
  };

  const formatSelectedDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('th-TH', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">กำหนดรายการนัดหมาย</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มนัดหมายใหม่</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? 'แก้ไขนัดหมาย' : 'เพิ่มนัดหมายใหม่'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">ชื่อนัดหมาย</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="กรอกชื่อนัดหมาย"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">ลูกความ/ผู้เข้าร่วม</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    placeholder="กรอกชื่อลูกความ"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">วันที่</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">เวลา</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">สถานที่</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="กรอกสถานที่"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">ประเภท</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">หมายเหตุ</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="กรอกหมายเหตุ"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button type="submit">
                  {editingAppointment ? 'บันทึกการแก้ไข' : 'เพิ่มนัดหมาย'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Column */}
        <div className="lg:col-span-1">
          <CalendarComponent 
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Appointments Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              นัดหมายวัน{formatSelectedDate(selectedDate)}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredAppointments.length} นัดหมาย
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหานัดหมาย..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{appointment.title}</h3>
                          {getTypeBadge(appointment.type)}
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{appointment.client}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{appointment.notes}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(appointment)}
                          title="แก้ไขนัดหมาย"
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(appointment.id)}
                          title="ลบนัดหมาย"
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'ไม่พบนัดหมายที่ค้นหา' : 'ไม่มีนัดหมายในวันนี้'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'ลองเปลี่ยนคำค้นหาหรือเลือกวันอื่น' : 'เลือกวันอื่นหรือเพิ่มนัดหมายใหม่'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
