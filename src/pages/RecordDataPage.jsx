import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const RecordDataPage = () => {
  const navigate = useNavigate();

  const [searchFormData, setSearchFormData] = React.useState({
    category: 'กรุณาเลือก',
    caseType: 'คดีแพ่ง',
    displayType: 'ทั้งหมด',
    redCaseDate: '',
    blackCaseNo: '',
    redCaseNo: '',
    setDate: '',
    submitDate: ''
  });

  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      receiptNo: 'CTB-2025/282',
      receiptDate: '2025-01-29',
      defendantName: 'นายอภิสิทธิ์ เย็นชื่น',
      caseDetail: 'เจษฏา จุระเสริฐ ค.า.จงดิช.วัดกำแพงชนะเนร',
      statusCode: '002',
      blackCaseNo: 'หนE1184/2568',
      redCaseNo: '-',
      lastAppointment: 'นัดศักดาพาระดำนับการ\n2025-05-30\n00:00',
      nextAppointment: 'นัดสืบพยานโจทก์\n2025-06-10\n13:30'
    },
    {
      id: 2,
      receiptNo: 'CTB-2025/283',
      receiptDate: '2025-01-30',
      defendantName: 'นางสมศรี ขียุ',
      caseDetail: 'เจษฏา จุระเสริฐ ค.า.จงดิช.วัดกำแพงชนะเนร',
      statusCode: '003',
      blackCaseNo: 'หนE1185/2568',
      redCaseNo: 'wE123/2568',
      lastAppointment: 'นัดโจทก์เลื่อน\n2025-04-15\n09:00',
      nextAppointment: 'นัดฟังคำพิพากษา\n2025-07-20\n10:00'
    }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    
    // จำลองการค้นหา
    setTimeout(() => {
      const filteredResults = mockResults.filter(result => {
        // ตรวจสอบเงื่อนไข
        if (searchFormData.blackCaseNo && !result.blackCaseNo.includes(searchFormData.blackCaseNo)) return false;
        if (searchFormData.redCaseNo && !result.redCaseNo.includes(searchFormData.redCaseNo)) return false;
        
        // ตรวจสอบการแสดงผลตามเลขคดีแดง
        if (searchFormData.displayType === 'ยังไม่มีเลขคดีแดง' && result.redCaseNo !== '-') return false;
        if (searchFormData.displayType === 'มีเลขคดีแดง' && result.redCaseNo === '-') return false;
        
        return true;
      });
      
      setSearchResults(filteredResults);
      setIsLoading(false);
      
      toast({
        title: "ค้นหาสำเร็จ",
        description: `พบข้อมูล ${filteredResults.length} รายการ`,
      });
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchFormData({
      category: 'กรุณาเลือก',
      caseType: 'คดีแพ่ง',
      displayType: 'ทั้งหมด',
      redCaseDate: '',
      blackCaseNo: '',
      redCaseNo: '',
      setDate: '',
      submitDate: ''
    });
    setSearchResults([]);
    toast({
      title: "ล้างข้อมูลเรียบร้อย",
      description: "ล้างเงื่อนไขการค้นหาทั้งหมดแล้ว",
    });
  };

  const handleCreateNewRecord = () => {
    navigate('/new-record');
  };

  const handleEditRecord = (recordId) => {
    // ส่งข้อมูลไปยังหน้า edit
    const selectedRecord = mockResults.find(result => result.id === recordId);
    navigate('/edit-case', { state: { caseData: selectedRecord } });
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">บันทึกข้อมูลสำนักงานหมาย</h1>
            <p className="text-sm text-gray-600">ค้นหาและจัดการข้อมูลคดี</p>
          </div>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Law</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Search</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Search Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border mb-6"
        >
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
            <h3 className="font-medium text-lg">ค้นหาข้อมูล</h3>
          </div>
          
          <div className="p-6">
            {/* Search Form Grid - 2 columns layout like submissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* หมวดหมู่คำฟ้อง/คำร้อง */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">หมวดหมู่คำฟ้อง/คำร้อง :</Label>
                  <div className="flex-1">
                    <Select value={searchFormData.category} onValueChange={(value) => setSearchFormData({...searchFormData, category: value})}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="กรุณาเลือก">กรุณาเลือก</SelectItem>
                        <SelectItem value="คำฟ้อง">คำฟ้อง</SelectItem>
                        <SelectItem value="คำร้อง">คำร้อง</SelectItem>
                        <SelectItem value="คำขอ">คำขอ</SelectItem>
                        <SelectItem value="คำแถลง">คำแถลง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ประเภทคดี */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">ประเภทคดี :</Label>
                  <div className="flex-1">
                    <Select value={searchFormData.caseType} onValueChange={(value) => setSearchFormData({...searchFormData, caseType: value})}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="คดีแพ่ง">คดีแพ่ง</SelectItem>
                        <SelectItem value="คดีอาญา">คดีอาญา</SelectItem>
                        <SelectItem value="คดีครอบครัว">คดีครอบครัว</SelectItem>
                        <SelectItem value="คดีแรงงาน">คดีแรงงาน</SelectItem>
                        <SelectItem value="คดีภาษี">คดีภาษี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* วันที่ออกหมายเลขคดีแดง */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">วันที่ออกหมายเลขคดีแดง :</Label>
                  <div className="flex-1">
                    <Input
                      type="date"
                      value={searchFormData.redCaseDate}
                      onChange={(e) => setSearchFormData({...searchFormData, redCaseDate: e.target.value})}
                      className="text-sm"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </div>

                {/* วันที่ยื่น */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">วันที่ยื่น :</Label>
                  <div className="flex-1">
                    <Input
                      type="date"
                      value={searchFormData.submitDate}
                      onChange={(e) => setSearchFormData({...searchFormData, submitDate: e.target.value})}
                      className="text-sm"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* หมายเลขคดีดำ */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">หมายเลขคดีดำ :</Label>
                  <div className="flex-1">
                    <Input
                      value={searchFormData.blackCaseNo}
                      onChange={(e) => setSearchFormData({...searchFormData, blackCaseNo: e.target.value})}
                      placeholder="หมายเลขคดีดำ"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* หมายเลขคดีแดง */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">หมายเลขคดีแดง :</Label>
                  <div className="flex-1">
                    <Input
                      value={searchFormData.redCaseNo}
                      onChange={(e) => setSearchFormData({...searchFormData, redCaseNo: e.target.value})}
                      placeholder="หมายเลขคดีแดง"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* ตั้งวันที่ */}
                <div className="flex items-center">
                  <Label className="text-sm font-medium w-48 text-right pr-4">ตั้งวันที่ :</Label>
                  <div className="flex-1">
                    <Input
                      type="date"
                      value={searchFormData.setDate}
                      onChange={(e) => setSearchFormData({...searchFormData, setDate: e.target.value})}
                      className="text-sm"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div></div>
              </div>
            </div>

            {/* Radio buttons for การแสดงผลรายการคดี */}
            <div className="mb-6">
              <div className="flex items-center">
                <Label className="text-sm font-medium w-48 text-right pr-4">การแสดงผลรายการคดี :</Label>
                <div className="flex space-x-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="displayType"
                      value="ทั้งหมด"
                      checked={searchFormData.displayType === 'ทั้งหมด'}
                      onChange={(e) => setSearchFormData({...searchFormData, displayType: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">ทั้งหมด</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="displayType"
                      value="ยังไม่มีเลขคดีแดง"
                      checked={searchFormData.displayType === 'ยังไม่มีเลขคดีแดง'}
                      onChange={(e) => setSearchFormData({...searchFormData, displayType: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">ยังไม่มีเลขคดีแดง</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="displayType"
                      value="มีเลขคดีแดง"
                      checked={searchFormData.displayType === 'มีเลขคดีแดง'}
                      onChange={(e) => setSearchFormData({...searchFormData, displayType: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">มีเลขคดีแดง</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
              >
                {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
              </Button>
              <Button 
                onClick={handleClearSearch}
                variant="outline"
                className="px-8 py-2 rounded"
              >
                ล้างออกทุก
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border"
          >
            <div className="bg-white px-4 py-3 border-b">
              <h3 className="font-medium text-lg text-gray-900">ผลการค้นหา</h3>
            </div>
            
            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-amber-50 border-b">
                  <tr>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">NO.</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">เลขรับ กม.<br/>วันที่รับเรื่อง</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">ชื่อจำเลยตามคำฟ้อง</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">หมายความคำ</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">STATUS CODE</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">เลขคดีดำ</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">เลขคดีแดง</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">รายการนัดล่าสุด</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900 border-r">รายการนัดถัดไป</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-900"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchResults.map((result, index) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 text-center text-gray-900 border-r">{index + 1}</td>
                      <td className="px-3 py-4 text-center text-gray-900 border-r">
                        <div className="space-y-1">
                          <div className="font-medium">{result.receiptNo}</div>
                          <div className="text-xs text-gray-600">{result.receiptDate}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-gray-900 border-r">
                        <div className="text-sm">{result.defendantName}</div>
                      </td>
                      <td className="px-3 py-4 text-gray-900 border-r">
                        <div className="text-xs leading-relaxed">{result.caseDetail}</div>
                      </td>
                      <td className="px-3 py-4 text-center text-gray-900 border-r">
                        <span className="font-medium">{result.statusCode}</span>
                      </td>
                      <td className="px-3 py-4 text-center text-gray-900 border-r">
                        <span className="text-sm">{result.blackCaseNo}</span>
                      </td>
                      <td className="px-3 py-4 text-center text-gray-900 border-r">
                        <span className="text-sm">{result.redCaseNo}</span>
                      </td>
                      <td className="px-3 py-4 text-gray-900 border-r">
                        <div className="text-xs leading-relaxed whitespace-pre-line">{result.lastAppointment}</div>
                      </td>
                      <td className="px-3 py-4 text-gray-900 border-r">
                        <div className="text-xs leading-relaxed whitespace-pre-line">{result.nextAppointment}</div>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <Button
                          onClick={() => handleEditRecord(result.id)}
                          size="sm"
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs px-3 py-2 rounded border-0 shadow-sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Results Message */}
        {searchResults.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-8 text-center"
          >
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีผลการค้นหา</h3>
            <p className="text-gray-600 mb-4">กรุณาใส่เงื่อนไขการค้นหาแล้วคลิกปุ่ม "ค้นหา"</p>
          </motion.div>
        )}

        {/* Action Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <Button
            onClick={handleCreateNewRecord}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md flex items-center space-x-2 mx-auto text-lg"
          >
            <Plus className="h-5 w-5" />
            <span>สร้างข้อมูลใหม่</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecordDataPage; 