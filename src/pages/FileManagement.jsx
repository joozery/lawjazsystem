
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FolderPlus, 
  Search, 
  Download, 
  Trash2, 
  File,
  Folder,
  Eye,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const FileManagement = () => {
  const [files, setFiles] = React.useState([
    {
      id: 1,
      name: 'สัญญาซื้อขาย.pdf',
      type: 'file',
      size: '2.5 MB',
      date: '2024-01-15',
      caseId: 'C001',
      folder: 'เอกสารคดี'
    },
    {
      id: 2,
      name: 'หลักฐานการชำระเงิน.jpg',
      type: 'file',
      size: '1.2 MB',
      date: '2024-01-14',
      caseId: 'C001',
      folder: 'เอกสารคดี'
    },
    {
      id: 3,
      name: 'เอกสารคดี',
      type: 'folder',
      size: '15 ไฟล์',
      date: '2024-01-10',
      caseId: 'C001',
      folder: null
    },
    {
      id: 4,
      name: 'เอกสารลูกความ',
      type: 'folder',
      size: '8 ไฟล์',
      date: '2024-01-08',
      caseId: 'C002',
      folder: null
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentFolder, setCurrentFolder] = React.useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = currentFolder ? file.folder === currentFolder : !file.folder;
    return matchesSearch && matchesFolder;
  });

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    
    uploadedFiles.forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: 'file',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        date: new Date().toISOString().split('T')[0],
        caseId: 'C001',
        folder: currentFolder
      };
      
      setFiles(prev => [...prev, newFile]);
    });

    toast({
      title: "อัปโหลดไฟล์สำเร็จ",
      description: `อัปโหลด ${uploadedFiles.length} ไฟล์แล้ว`,
    });
    
    setIsUploadDialogOpen(false);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "กรุณาระบุชื่อโฟลเดอร์",
        variant: "destructive"
      });
      return;
    }

    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      type: 'folder',
      size: '0 ไฟล์',
      date: new Date().toISOString().split('T')[0],
      caseId: 'C001',
      folder: currentFolder
    };

    setFiles(prev => [...prev, newFolder]);
    setNewFolderName('');
    setIsFolderDialogOpen(false);
    
    toast({
      title: "สร้างโฟลเดอร์สำเร็จ",
      description: `โฟลเดอร์ "${newFolderName}" ถูกสร้างแล้ว`,
    });
  };

  const handleDelete = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast({
      title: "ลบไฟล์สำเร็จ",
      description: "ไฟล์ได้รับการลบออกจากระบบแล้ว",
    });
  };

  const handleFolderClick = (folderName) => {
    setCurrentFolder(folderName);
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
  };

  const getFileIcon = (file) => {
    if (file.type === 'folder') {
      return <Folder className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">จัดการไฟล์</h1>
          {currentFolder && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={handleBackClick}
                className="text-blue-600 hover:text-blue-800"
              >
                หน้าหลัก
              </button>
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">{currentFolder}</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <FolderPlus className="h-4 w-4" />
                <span>สร้างโฟลเดอร์</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>สร้างโฟลเดอร์ใหม่</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="folderName">ชื่อโฟลเดอร์</Label>
                  <Input
                    id="folderName"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="กรอกชื่อโฟลเดอร์"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button onClick={handleCreateFolder}>
                    สร้างโฟลเดอร์
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>อัปโหลดไฟล์</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>อัปโหลดไฟล์</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">เลือกไฟล์</Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  รองรับไฟล์ PDF, DOC, DOCX, JPG, PNG (ขนาดไม่เกิน 10MB)
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="ค้นหาไฟล์..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  {getFileIcon(file)}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast({
                      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
                    })}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div
                  onClick={() => file.type === 'folder' && handleFolderClick(file.name)}
                  className="space-y-2"
                >
                  <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>ขนาด: {file.size}</p>
                    <p>วันที่: {file.date}</p>
                    {file.caseId && <p>คดี: {file.caseId}</p>}
                  </div>
                </div>

                <div className="flex justify-end space-x-1 mt-3">
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
                    onClick={() => toast({
                      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
                    })}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบไฟล์</h3>
          <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรืออัปโหลดไฟล์ใหม่</p>
        </div>
      )}
    </div>
  );
};

export default FileManagement;
