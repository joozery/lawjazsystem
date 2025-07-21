
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Calendar,
  User
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

const CaseManagement = () => {
  const [cases, setCases] = React.useState([
    {
      id: 'C001',
      title: 'คดีแพ่ง - สัญญาซื้อขาย',
      client: 'นายสมชาย ใจดี',
      status: 'in-progress',
      type: 'civil',
      date: '2024-01-15',
      court: 'ศาลแพ่งกรุงเทพใต้',
      description: 'คดีเกี่ยวกับการผิดสัญญาซื้อขายที่ดิน'
    },
    {
      id: 'C002',
      title: 'คดีอาญา - ฟ้องร้องเรียกค่าเสียหาย',
      client: 'นางสาวมาลี สวยงาม',
      status: 'pending',
      type: 'criminal',
      date: '2024-01-14',
      court: 'ศาลอาญากรุงเทพใต้',
      description: 'คดีเรียกค่าเสียหายจากอุบัติเหตุ'
    },
    {
      id: 'C003',
      title: 'คดีครอบครัว - การหย่าร้าง',
      client: 'นายประยุทธ์ รักดี',
      status: 'completed',
      type: 'family',
      date: '2024-01-13',
      court: 'ศาลครอบครัวกรุงเทพใต้',
      description: 'คดีหย่าร้างโดยความยินยอม'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingCase, setEditingCase] = React.useState(null);
  const [formData, setFormData] = React.useState({
    title: '',
    client: '',
    status: 'pending',
    type: 'civil',
    court: '',
    description: ''
  });

  const statusOptions = [
    { value: 'pending', label: 'รอดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in-progress', label: 'กำลังดำเนินการ', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'ยกเลิก', color: 'bg-red-100 text-red-800' }
  ];

  const typeOptions = [
    { value: 'civil', label: 'คดีแพ่ง' },
    { value: 'criminal', label: 'คดีอาญา' },
    { value: 'family', label: 'คดีครอบครัว' },
    { value: 'labor', label: 'คดีแรงงาน' }
  ];

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.client) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุชื่อคดีและชื่อลูกความ",
        variant: "destructive"
      });
      return;
    }

    if (editingCase) {
      setCases(cases.map(case_ => 
        case_.id === editingCase.id 
          ? { ...case_, ...formData }
          : case_
      ));
      toast({
        title: "แก้ไขคดีสำเร็จ",
        description: `คดี ${formData.title} ได้รับการแก้ไขแล้ว`,
      });
    } else {
      const newCase = {
        ...formData,
        id: `C${String(cases.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0]
      };
      setCases([...cases, newCase]);
      toast({
        title: "เพิ่มคดีใหม่สำเร็จ",
        description: `คดี ${formData.title} ได้รับการเพิ่มแล้ว`,
      });
    }

    setFormData({
      title: '',
      client: '',
      status: 'pending',
      type: 'civil',
      court: '',
      description: ''
    });
    setEditingCase(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (case_) => {
    setEditingCase(case_);
    setFormData({
      title: case_.title,
      client: case_.client,
      status: case_.status,
      type: case_.type,
      court: case_.court,
      description: case_.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (caseId) => {
    setCases(cases.filter(case_ => case_.id !== caseId));
    toast({
      title: "ลบคดีสำเร็จ",
      description: "คดีได้รับการลบออกจากระบบแล้ว",
    });
  };

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return (
      <Badge className={statusOption?.color}>
        {statusOption?.label}
      </Badge>
    );
  };

  const getTypeLabel = (type) => {
    const typeOption = typeOptions.find(opt => opt.value === type);
    return typeOption?.label || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">จัดการคดี</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มคดีใหม่</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCase ? 'แก้ไขข้อมูลคดี' : 'เพิ่มคดีใหม่'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">ชื่อคดี</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="กรอกชื่อคดี"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">ชื่อลูกความ</Label>
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
                  <Label htmlFor="type">ประเภทคดี</Label>
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
                <Label htmlFor="court">ศาล</Label>
                <Input
                  id="court"
                  value={formData.court}
                  onChange={(e) => setFormData({...formData, court: e.target.value})}
                  placeholder="กรอกชื่อศาล"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">รายละเอียด</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="กรอกรายละเอียดคดี"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button type="submit">
                  {editingCase ? 'บันทึกการแก้ไข' : 'เพิ่มคดี'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ค้นหาคดี..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="กรองตามสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกสถานะ</SelectItem>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((case_, index) => (
          <motion.div
            key={case_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    <p className="text-sm text-gray-500">รหัส: {case_.id}</p>
                  </div>
                  {getStatusBadge(case_.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{case_.client}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{getTypeLabel(case_.type)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{case_.date}</span>
                </div>
                {case_.court && (
                  <p className="text-sm text-gray-600">{case_.court}</p>
                )}
                {case_.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{case_.description}</p>
                )}
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast({
                      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
                    })}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(case_)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(case_.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบคดีที่ค้นหา</h3>
          <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเพิ่มคดีใหม่</p>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
