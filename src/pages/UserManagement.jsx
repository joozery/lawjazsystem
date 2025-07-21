
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Phone,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const UserManagement = () => {
  const [users, setUsers] = React.useState([
    {
      id: 1,
      name: 'นายสมชาย ใจดี',
      email: 'somchai@email.com',
      phone: '081-234-5678',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15'
    },
    {
      id: 2,
      name: 'นางสาวมาลี สวยงาม',
      email: 'malee@email.com',
      phone: '082-345-6789',
      role: 'lawyer',
      status: 'active',
      lastLogin: '2024-01-14'
    },
    {
      id: 3,
      name: 'นายประยุทธ์ รักดี',
      email: 'prayut@email.com',
      phone: '083-456-7890',
      role: 'client',
      status: 'inactive',
      lastLogin: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    role: 'client',
    status: 'active'
  });

  const roleOptions = [
    { value: 'admin', label: 'ผู้ดูแลระบบ', color: 'bg-red-100 text-red-800' },
    { value: 'lawyer', label: 'ทนายความ', color: 'bg-blue-100 text-blue-800' },
    { value: 'client', label: 'ลูกความ', color: 'bg-green-100 text-green-800' },
    { value: 'staff', label: 'เจ้าหน้าที่', color: 'bg-purple-100 text-purple-800' }
  ];

  const statusOptions = [
    { value: 'active', label: 'ใช้งาน', color: 'bg-green-100 text-green-800' },
    { value: 'inactive', label: 'ไม่ใช้งาน', color: 'bg-gray-100 text-gray-800' },
    { value: 'suspended', label: 'ระงับการใช้งาน', color: 'bg-red-100 text-red-800' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุชื่อและอีเมล",
        variant: "destructive"
      });
      return;
    }

    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
      toast({
        title: "แก้ไขผู้ใช้สำเร็จ",
        description: `ข้อมูล ${formData.name} ได้รับการแก้ไขแล้ว`,
      });
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
        lastLogin: '-'
      };
      setUsers([...users, newUser]);
      toast({
        title: "เพิ่มผู้ใช้ใหม่สำเร็จ",
        description: `ผู้ใช้ ${formData.name} ได้รับการเพิ่มแล้ว`,
      });
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'client',
      status: 'active'
    });
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "ลบผู้ใช้สำเร็จ",
      description: "ผู้ใช้ได้รับการลบออกจากระบบแล้ว",
    });
  };

  const getRoleBadge = (role) => {
    const roleOption = roleOptions.find(opt => opt.value === role);
    return (
      <Badge className={roleOption?.color}>
        {roleOption?.label}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">จัดการผู้ใช้งาน</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มผู้ใช้ใหม่</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="กรอกอีเมล"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="กรอกเบอร์โทรศัพท์"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">บทบาท</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(option => (
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

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button type="submit">
                  {editingUser ? 'บันทึกการแก้ไข' : 'เพิ่มผู้ใช้'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="ค้นหาผู้ใช้..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <div className="flex space-x-2 mt-1">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>เข้าสู่ระบบล่าสุด: {user.lastLogin}</span>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบผู้ใช้ที่ค้นหา</h3>
          <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเพิ่มผู้ใช้ใหม่</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
