import React from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SearchResultsTable = ({ results }) => {
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>ไม่พบข้อมูล</p>
      </div>
    );
  }

  const handleEditClick = (item) => {
    // Navigate to edit page with case data
    navigate('/edit-case', {
      state: {
        caseData: item
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-[#fdf2e2]">
          <tr>
            <th scope="col" className="px-4 py-3">No.</th>
            <th scope="col" className="px-4 py-3">เลขรับ กม.<br/>วันที่รับเรื่อง</th>
            <th scope="col" className="px-4 py-3">ชื่อจำเลยตามฟ้อง</th>
            <th scope="col" className="px-4 py-3">ทนายความ<br/>ศาล</th>
            <th scope="col" className="px-4 py-3">Status Code</th>
            <th scope="col" className="px-4 py-3">เลขคดีดำ</th>
            <th scope="col" className="px-4 py-3">เลขคดีแดง</th>
            <th scope="col" className="px-4 py-3">รายการนัดล่าสุด</th>
            <th scope="col" className="px-4 py-3">รายการนัดต่อไป</th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <motion.tr
              key={item.id}
              className="bg-white border-b hover:bg-gray-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="px-4 py-4 font-medium">{item.no}</td>
              <td className="px-4 py-4">
                <div>{item.receiptNo}</div>
                <div className="text-gray-500">{item.receiptDate}</div>
              </td>
              <td className="px-4 py-4">{item.defendantName}</td>
              <td className="px-4 py-4">
                <div>{item.lawyerName}</div>
                <div className="text-gray-500">{item.court}</div>
              </td>
              <td className="px-4 py-4">{item.statusCode}</td>
              <td className="px-4 py-4">{item.blackCaseNo}</td>
              <td className="px-4 py-4">{item.redCaseNo || '-'}</td>
              <td className="px-4 py-4">
                <div>{item.lastAppointment.title}</div>
                <div className="text-gray-500">{item.lastAppointment.date}</div>
                <div className="text-gray-500">{item.lastAppointment.time}</div>
              </td>
              <td className="px-4 py-4">
                <div>{item.nextAppointment.title}</div>
                <div className="text-gray-500">{item.nextAppointment.date}</div>
                <div className="text-gray-500">{item.nextAppointment.time}</div>
              </td>
              <td className="px-4 py-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-yellow-400 hover:bg-yellow-500 border-yellow-500" 
                  onClick={() => handleEditClick(item)}
                  title="แก้ไขข้อมูลคดี"
                >
                  <Edit className="h-4 w-4 text-white" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResultsTable;