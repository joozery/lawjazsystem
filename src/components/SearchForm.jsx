import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SearchForm = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would gather form data into an object
    const searchParams = {
      agency: 'ศาลแพ่งกรุงเทพใต้',
      // ... other form values
    };
    if (onSearch) {
      onSearch(searchParams);
    } else {
      toast({
        title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
      });
    }
  };

  const handleClear = () => {
    // You can add logic here to clear the form fields
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
    });
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-t-md -mt-6 -mx-6 mb-6">
        ค้นหาข้อมูล
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="agency" className="text-right">หน่วยงานรับคำฟ้อง/คำร้อง<span className="text-red-500">*</span> :</Label>
              <Select>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="กรุณาเลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ศาลแพ่งกรุงเทพใต้">ศาลแพ่งกรุงเทพใต้</SelectItem>
                  <SelectItem value="ศาลอาญากรุงเทพใต้">ศาลอาญากรุงเทพใต้</SelectItem>
                  <SelectItem value="ศาลครอบครัวกรุงเทพใต้">ศาลครอบครัวกรุงเทพใต้</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="caseType" className="text-right">ประเภทคดี<span className="text-red-500">*</span> :</Label>
              <Select defaultValue="civil">
                <SelectTrigger className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">คดีแพ่ง</SelectItem>
                  <SelectItem value="criminal">คดีอาญา</SelectItem>
                  <SelectItem value="family">คดีครอบครัว</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-start gap-4">
              <Label className="text-right pt-2">การแสดงผลรายการคดี :</Label>
              <RadioGroup defaultValue="all" className="col-span-2 flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="r1" />
                  <Label htmlFor="r1">ทั้งหมด</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-red" id="r2" />
                  <Label htmlFor="r2">ยังไม่มีเลขคดีแดง</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="has-red" id="r3" />
                  <Label htmlFor="r3">มีเลขคดีแดง</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="redCaseDate" className="text-right">วันที่ออกหมายเลขคดีแดง :</Label>
              <div className="relative col-span-2">
                <Input id="redCaseDate" placeholder="ระบุวันที่" />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="submissionDate" className="text-right">วันที่ยื่น :</Label>
              <div className="relative col-span-2">
                <Input id="submissionDate" placeholder="ระบุวันที่" />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="blackCaseNumber" className="text-right">หมายเลขคดีดำ :</Label>
              <Input id="blackCaseNumber" placeholder="หมายเลขคดีดำ" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="redCaseNumber" className="text-right">หมายเลขคดีแดง :</Label>
              <Input id="redCaseNumber" placeholder="หมายเลขคดีแดง" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="redCaseDateTo" className="text-right">ถึงวันที่ :</Label>
              <div className="relative col-span-2">
                <Input id="redCaseDateTo" placeholder="ระบุวันที่" />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="submissionDateTo" className="text-right">ถึงวันที่ :</Label>
              <div className="relative col-span-2">
                <Input id="submissionDateTo" placeholder="ระบุวันที่" />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <Button type="submit" className="bg-blue-800 hover:bg-blue-900">ค้นหา</Button>
          <Button type="button" variant="outline" onClick={handleClear}>ล้างจอภาพ</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;