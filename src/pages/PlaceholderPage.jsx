import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SearchForm from '@/components/SearchForm';
import SearchResultsTable from '@/components/SearchResultsTable';

const mockResults = [
  {
    id: 1,
    no: 1,
    receiptNo: 'CTB-2025/282',
    receiptDate: '2025-01-29',
    defendantName: 'นายอภิชาติ เขื่อนขัน',
    lawyerName: 'เจษฎา จูประเสริฐ',
    court: 'ศาลจังหวัดกำแพงเพชร',
    statusCode: '002',
    blackCaseNo: 'ผบE1184/2568',
    redCaseNo: '',
    lastAppointment: {
      title: 'บันทึกผลการดำเนินการ',
      date: '2025-05-30',
      time: '00:00',
    },
    nextAppointment: {
      title: 'นัดสืบพยานโจทก์',
      date: '2025-06-10',
      time: '13:30',
    },
    plaintiff: 'บริษัท ABC จำกัด',
    caseType: 'คดีแพ่ง',
    lawSection: 'มาตรา 372 ประมวลกฎหมายแพ่งและพาณิชย์',
    documents: 'สัญญาซื้อขาย, ใบเสร็จ, หลักฐานการโอนเงิน',
    notes: 'คดีเรียกร้องค่าเสียหายจากการผิดสัญญา'
  },
  {
    id: 2,
    no: 2,
    receiptNo: 'CTB-2025/283',
    receiptDate: '2025-01-30',
    defendantName: 'นางสมศรี มีสุข',
    lawyerName: 'เจษฎา จูประเสริฐ',
    court: 'ศาลจังหวัดกำแพงเพชร',
    statusCode: '003',
    blackCaseNo: 'ผบE1185/2568',
    redCaseNo: 'พE123/2568',
    lastAppointment: {
      title: 'นัดไกล่เกลี่ย',
      date: '2025-04-15',
      time: '09:00',
    },
    nextAppointment: {
      title: 'นัดฟังคำพิพากษา',
      date: '2025-07-20',
      time: '10:00',
    },
    plaintiff: 'นายสมชาย ใจดี',
    caseType: 'คดีครอบครัว',
    lawSection: 'มาตรา 1516 ประมวลกฎหมายแพ่งและพาณิชย์',
    documents: 'ใบสำคัญการสมรส, หลักฐานทรัพย์สิน',
    notes: 'คดีหย่าร้างและแบ่งทรัพย์สิน'
  },
];

const PlaceholderPage = ({ title }) => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = (searchParams) => {
    console.log('Searching with:', searchParams);
    setHasSearched(true);
    // In a real app, you would fetch data based on searchParams
    // For now, we just return the mock data.
    setSearchResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      
      <SearchForm onSearch={handleSearch} />

      {hasSearched && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ผลการค้นหา</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchResultsTable results={searchResults} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlaceholderPage;