
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle,
  AlertCircle,
  X,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

const ExcelImport = () => {
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [importProgress, setImportProgress] = React.useState(0);
  const [isImporting, setIsImporting] = React.useState(false);
  const [importResults, setImportResults] = React.useState(null);
  const [previewData, setPreviewData] = React.useState([]);

  const sampleData = [
    {
      caseId: 'C004',
      title: 'คดีแพ่ง - เรียกค่าเสียหาย',
      client: 'นายสมศักดิ์ ดีใจ',
      type: 'civil',
      status: 'pending',
      court: 'ศาลแพ่งกรุงเทพเหนือ',
      description: 'คดีเรียกค่าเสียหายจากการผิดสัญญา'
    },
    {
      caseId: 'C005',
      title: 'คดีครอบครัว - เลี้ยงดูบุตร',
      client: 'นางสุดา รักลูก',
      type: 'family',
      status: 'in-progress',
      court: 'ศาลครอบครัวกรุงเทพเหนือ',
      description: 'คดีเรื่องการเลี้ยงดูบุตรหลังหย่าร้าง'
    },
    {
      caseId: 'C006',
      title: 'คดีแรงงาน - ค่าชดเชยการเลิกจ้าง',
      client: 'นายวิชัย ขยันทำงาน',
      type: 'labor',
      status: 'pending',
      court: 'ศาลแรงงานกรุงเทพ',
      description: 'คดีเรียกค่าชดเชยการเลิกจ้างโดยไม่ชอบ'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast({
          title: "ไฟล์ไม่ถูกต้อง",
          description: "กรุณาเลือกไฟล์ Excel (.xlsx หรือ .xls)",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      // Simulate preview data
      setPreviewData(sampleData);
      
      toast({
        title: "อัปโหลดไฟล์สำเร็จ",
        description: `ไฟล์ ${file.name} พร้อมสำหรับการนำเข้า`,
      });
    }
  };

  const handleImport = () => {
    if (!uploadedFile) {
      toast({
        title: "ไม่พบไฟล์",
        description: "กรุณาเลือกไฟล์ Excel ก่อนทำการนำเข้า",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    // Simulate import process
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportResults({
            total: previewData.length,
            success: previewData.length - 1,
            failed: 1,
            errors: ['แถวที่ 2: ข้อมูลไม่ครบถ้วน']
          });
          
          toast({
            title: "นำเข้าข้อมูลเสร็จสิ้น",
            description: `นำเข้าสำเร็จ ${previewData.length - 1} รายการ`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setImportProgress(0);
    setIsImporting(false);
    setImportResults(null);
    setPreviewData([]);
  };

  const downloadTemplate = () => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };

    const statusLabels = {
      'pending': 'รอดำเนินการ',
      'in-progress': 'กำลังดำเนินการ',
      'completed': 'เสร็จสิ้น',
      'cancelled': 'ยกเลิก'
    };

    return (
      <Badge className={statusColors[status]}>
        {statusLabels[status]}
      </Badge>
    );
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      'civil': 'คดีแพ่ง',
      'criminal': 'คดีอาญา',
      'family': 'คดีครอบครัว',
      'labor': 'คดีแรงงาน'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">นำเข้าไฟล์ Excel</h1>
        <Button
          variant="outline"
          onClick={downloadTemplate}
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>ดาวน์โหลดแม่แบบ</span>
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>อัปโหลดไฟล์ Excel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                เลือกไฟล์ Excel สำหรับนำเข้าข้อมูลคดี
              </p>
              <p className="text-sm text-gray-500">
                รองรับไฟล์ .xlsx และ .xls (ขนาดไม่เกิน 10MB)
              </p>
            </div>
            <div className="mt-4">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-upload"
              />
              <label htmlFor="excel-upload">
                <Button asChild className="cursor-pointer">
                  <span>เลือกไฟล์</span>
                </Button>
              </label>
            </div>
          </div>

          {uploadedFile && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Section */}
      {previewData.length > 0 && !importResults && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>ตัวอย่างข้อมูล</span>
              </CardTitle>
              <Badge variant="outline">
                {previewData.length} รายการ
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">รหัสคดี</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">ชื่อคดี</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">ลูกความ</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">ประเภท</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{row.caseId}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.client}</td>
                      <td className="border border-gray-300 px-4 py-2">{getTypeLabel(row.type)}</td>
                      <td className="border border-gray-300 px-4 py-2">{getStatusBadge(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleImport}
                disabled={isImporting}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>{isImporting ? 'กำลังนำเข้า...' : 'เริ่มนำเข้าข้อมูล'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Import Progress */}
      {isImporting && (
        <Card>
          <CardHeader>
            <CardTitle>กำลังนำเข้าข้อมูล</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={importProgress} className="w-full" />
            <p className="text-sm text-gray-600 text-center">
              {importProgress}% เสร็จสิ้น
            </p>
          </CardContent>
        </Card>
      )}

      {/* Import Results */}
      {importResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>ผลการนำเข้าข้อมูล</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{importResults.total}</p>
                <p className="text-sm text-gray-600">รายการทั้งหมด</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                <p className="text-sm text-gray-600">นำเข้าสำเร็จ</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                <p className="text-sm text-gray-600">นำเข้าไม่สำเร็จ</p>
              </div>
            </div>

            {importResults.errors && importResults.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>ข้อผิดพลาด</span>
                </h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  {importResults.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-700">{error}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleReset}>
                นำเข้าไฟล์ใหม่
              </Button>
              <Button onClick={() => window.location.href = '/cases'}>
                ดูรายการคดี
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>คำแนะนำการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">รูปแบบไฟล์ Excel</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• คอลัมน์ A: รหัสคดี (เช่น C001)</li>
                <li>• คอลัมน์ B: ชื่อคดี</li>
                <li>• คอลัมน์ C: ชื่อลูกความ</li>
                <li>• คอลัมน์ D: ประเภทคดี (civil, criminal, family, labor)</li>
                <li>• คอลัมน์ E: สถานะ (pending, in-progress, completed, cancelled)</li>
                <li>• คอลัมน์ F: ศาล</li>
                <li>• คอลัมน์ G: รายละเอียด</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">ข้อกำหนด</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ไฟล์ต้องเป็นนามสกุล .xlsx หรือ .xls</li>
                <li>• ขนาดไฟล์ไม่เกิน 10MB</li>
                <li>• แถวแรกต้องเป็นหัวตาราง</li>
                <li>• รหัสคดีและชื่อคดีต้องไม่ว่าง</li>
                <li>• ประเภทและสถานะต้องตรงตามที่กำหนด</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcelImport;
