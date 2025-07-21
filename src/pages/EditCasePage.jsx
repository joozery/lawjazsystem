import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X, ArrowLeft, Edit, FileText, Clock, Calendar, AlertCircle, CheckCircle, Upload, File, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const EditCasePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const caseData = location.state?.caseData;

  const [editFormData, setEditFormData] = React.useState({
    receiptNo: caseData?.receiptNo || 'CTB-2025/282',
    receiptDate: caseData?.receiptDate || '29/01/2025 00:00:00',
    defendantName: caseData?.defendantName || 'นายอภิชาติ เขื่อนขัน',
    lawyerName: caseData?.lawyerName || 'เจษฎา จูประเสริฐ',
    court: caseData?.court || '',
    statusCode: caseData?.statusCode || '2013',
    blackCaseNo: caseData?.blackCaseNo || 'ผบE1184/2568',
    redCaseNo: caseData?.redCaseNo || '',
    lastAppointmentTitle: caseData?.lastAppointment?.title || '',
    lastAppointmentDate: caseData?.lastAppointment?.date || '',
    lastAppointmentTime: caseData?.lastAppointment?.time || '',
    nextAppointmentTitle: caseData?.nextAppointment?.title || '',
    nextAppointmentDate: caseData?.nextAppointment?.date || '',
    nextAppointmentTime: caseData?.nextAppointment?.time || '',
    notes: caseData?.notes || 'เจษฎา จูประเสริฐ',
    plaintiff: caseData?.plaintiff || '',
    caseType: caseData?.caseType || '',
    lawSection: caseData?.lawSection || '',
    documents: caseData?.documents || ''
  });

  const [selectedProcess, setSelectedProcess] = React.useState(null);
  const [processData, setProcessData] = React.useState({});
  const [newProcessEntry, setNewProcessEntry] = React.useState({
    date: '',
    time: '',
    description: '',
    details: '',
    workFormat: 'online',
    result: '',
    followUp: ''
  });
  
  // State สำหรับเลือกแสดงข้อมูลตามขั้นตอน
  const [activeTab, setActiveTab] = React.useState('ดำเนินคดี');
  
  // State สำหรับ Status Processed data ที่สามารถแก้ไขได้
  const [dynamicStatusProcessed, setDynamicStatusProcessed] = React.useState({});
  const [showStatusModal, setShowStatusModal] = React.useState(false);
  const [newStatusEntry, setNewStatusEntry] = React.useState({
    title: '',
    description: '',
    date: '',
    status: 'รอดำเนินการ',
    details: ''
  });
  const [showAppointmentModal, setShowAppointmentModal] = React.useState(false);
  const [newAppointmentEntry, setNewAppointmentEntry] = React.useState({
    date: '',
    time: '',
    title: '',
    result: 'เลื่อนนัด',
    followUp: '',
    details: ''
  });

  // State สำหรับ appointments ที่สามารถแก้ไขได้
  const [dynamicAppointments, setDynamicAppointments] = React.useState([
    {
      date: '10/06/2025',
      time: '13:30:00',
      title: 'นัดสืบพยานโจทก์',
      status: 'No Result',
      type: 'court'
    },
    {
      date: '30/05/2025',
      time: '00:00:00',
      title: 'บันทึกผลการดำเนินการ',
      details: 'วันที่ 30/05/2025 13:29:14 สถานที่จังหวัดลำปาง จำนวน 4 องค์กรภาครัฐ File 16 รัฐวิชาการ รีเฟอเรนซ์ ลำปางจังหวัด(PHLC004-190) Det 4143365820181095 App Comp 42020',
      type: 'action'
    },
    {
      date: '15/06/2025',
      time: '00:00:00',
      title: 'บันทึกผลการดำเนินการ',
      details: 'วันที่ 15/06/2025 02:04:27 ถูก 5643308940816772.3 พมแ่างเมืองพะเ ข่งุ วันที่ 26/04/2025 ราชญ์ลูกไห้เกียดขิพรอม',
      type: 'action'
    },
    {
      date: '26/04/2025',
      time: '09:00:00',
      title: 'นัดไกล่เกลี่ย',
      details: 'วันที่ 26/04/2025 15:24:19 เรื่องยื่นคู่ความดำเนิน',
      type: 'mediation'
    }
  ]);

  // ถ้าไม่มีข้อมูล redirect กลับ
  React.useEffect(() => {
    if (!caseData) {
      toast({
        title: "ไม่พบข้อมูลคดี",
        description: "กรุณาเลือกคดีที่ต้องการแก้ไขจากตาราง",
        variant: "destructive"
      });
      navigate(-1);
    }
  }, [caseData, navigate]);

  const statusOptions = [
    { value: '001', label: 'รอดำเนินการ' },
    { value: '002', label: 'กำลังดำเนินการ' },
    { value: '003', label: 'รอการพิจารณา' },
    { value: '004', label: 'รอคำพิพากษา' },
    { value: '005', label: 'เสร็จสิ้น' },
    { value: '006', label: 'ยกเลิก' }
  ];

  const caseTypeOptions = [
    { value: 'คดีแพ่ง', label: 'คดีแพ่ง' },
    { value: 'คดีอาญา', label: 'คดีอาญา' },
    { value: 'คดีครอบครัว', label: 'คดีครอบครัว' },
    { value: 'คดีแรงงาน', label: 'คดีแรงงาน' },
    { value: 'คดีภาษี', label: 'คดีภาษี' },
    { value: 'อื่นๆ', label: 'อื่นๆ' }
  ];

  // Mock status processed data แยกตามขั้นตอน
  const statusProcessedData = {
    'เตรียมฟ้อง': [
      {
        date: '15/01/2025',
        title: 'เก็บรวบรวมเอกสารหลักฐาน',
        description: 'รวบรวมสัญญา หลักฐานการชำระเงิน และเอกสารที่เกี่ยวข้อง',
        icon: <FileText className="h-4 w-4" />
      },
      {
        date: '20/01/2025', 
        title: 'ตรวจสอบข้อเท็จจริงและกฎหมาย',
        description: 'วิเคราะห์ความผิดและมาตราที่เกี่ยวข้อง',
        icon: <Search className="h-4 w-4" />
      }
    ],
    'ดำเนินคดี': [
      {
        date: '27/02/2025',
        title: 'รับคำฟ้อง - ยื่นคำต้าน ยื่นต่อศาล',
        description: 'ประเภท: ผล. มาตราการปกครอง สาขา [ข] [SOCB]',
        icon: <FileText className="h-4 w-4" />
      },
      {
        date: '05/03/2025',
        title: 'การสืบพยานโจทก์',
        description: 'ดำเนินการสืบพยานและนำเสนอหลักฐาน',
        icon: <AlertCircle className="h-4 w-4" />
      }
    ],
    'พิพากษา': [
      {
        date: '15/04/2025',
        title: 'พิจารณาคำพิพากษา',
        description: 'ศาลพิจารณาคดีและออกคำพิพากษา',
        icon: <CheckCircle className="h-4 w-4" />
      }
    ],
    'บังคับคดี': [
      {
        date: '20/05/2025',
        title: 'ยื่นคำร้องบังคับคดี',
        description: 'ดำเนินการบังคับตามคำพิพากษาของศาล',
        icon: <FileText className="h-4 w-4" />
      }
    ],
    'อุทธรณ์': [
      {
        date: '10/06/2025',
        title: 'ยื่นอุทธรณ์คำพิพากษา',
        description: 'ยื่นอุทธรณ์ต่อศาลอุทธรณ์ภูมิภาค',
        icon: <Edit className="h-4 w-4" />
      }
    ],
    'ฏีกา': [
      {
        date: '15/07/2025',
        title: 'ยื่นฏีกาต่อศาลฎีกา',
        description: 'ยื่นฏีกาคำพิพากษาศาลอุทธรณ์',
        icon: <FileText className="h-4 w-4" />
      }
    ]
  };

  // Mock appointment data แยกตามขั้นตอน
  const appointmentsByProcess = {
    'เตรียมฟ้อง': [
      {
        date: '18/01/2025',
        time: '10:00:00',
        title: 'ประชุมเตรียมเอกสาร',
        details: 'ประชุมเพื่อวางแผนและเตรียมเอกสารสำหรับการฟ้องคดี',
        type: 'preparation',
        status: 'เสร็จสิ้น'
      },
      {
        date: '25/01/2025',
        time: '14:00:00',
        title: 'ตรวจสอบความครบถ้วนของเอกสาร',
        details: 'ตรวจสอบเอกสารหลักฐานและความพร้อมในการยื่นฟ้อง',
        type: 'review',
        status: 'รอดำเนินการ'
      }
    ],
    'ดำเนินคดี': [
      {
        date: '10/06/2025',
        time: '13:30:00',
        title: 'นัดสืบพยานโจทก์',
        status: 'No Result',
        type: 'court'
      },
      {
        date: '30/05/2025',
        time: '00:00:00',
        title: 'บันทึกผลการดำเนินการ',
        details: 'วันที่ 30/05/2025 13:29:14 สถานที่จังหวัดลำปาง จำนวน 4 องค์กรภาครัฐ File 16 รัฐวิชาการ รีเฟอเรนซ์ ลำปางจังหวัด(PHLC004-190) Det 4143365820181095 App Comp 42020',
        type: 'action'
      }
    ],
    'พิพากษา': [
      {
        date: '20/04/2025',
        time: '09:00:00',
        title: 'นัดฟังคำพิพากษา',
        details: 'ศาลจะอ่านคำพิพากษาในคดีนี้',
        type: 'verdict',
        status: 'รอดำเนินการ'
      }
    ],
    'บังคับคดี': [
      {
        date: '25/05/2025',
        time: '10:30:00',
        title: 'ยื่นคำร้องบังคับคดี',
        details: 'ยื่นคำร้องต่อเจ้าพนักงานบังคับคดี',
        type: 'enforcement',
        status: 'รอดำเนินการ'
      }
    ],
    'อุทธรณ์': [
      {
        date: '15/06/2025',
        time: '14:00:00',
        title: 'ยื่นอุทธรณ์',
        details: 'ยื่นอุทธรณ์คำพิพากษาต่อศาลอุทธรณ์',
        type: 'appeal',
        status: 'รอดำเนินการ'
      }
    ],
    'ฏีกา': [
      {
        date: '20/07/2025',
        time: '11:00:00',
        title: 'ยื่นฏีกา',
        details: 'ยื่นฏีกาต่อศาลฎีกา',
        type: 'supreme',
        status: 'รอดำเนินการ'
      }
    ]
  };

  const handleSaveEdit = () => {
    if (!editFormData.defendantName || !editFormData.receiptNo) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุชื่อจำเลยและเลขรับอย่างน้อย",
        variant: "destructive"
      });
      return;
    }

    const updatedItem = {
      ...caseData,
      receiptNo: editFormData.receiptNo,
      receiptDate: editFormData.receiptDate,
      defendantName: editFormData.defendantName,
      lawyerName: editFormData.lawyerName,
      court: editFormData.court,
      statusCode: editFormData.statusCode,
      blackCaseNo: editFormData.blackCaseNo,
      redCaseNo: editFormData.redCaseNo,
      lastAppointment: {
        title: editFormData.lastAppointmentTitle,
        date: editFormData.lastAppointmentDate,
        time: editFormData.lastAppointmentTime
      },
      nextAppointment: {
        title: editFormData.nextAppointmentTitle,
        date: editFormData.nextAppointmentDate,
        time: editFormData.nextAppointmentTime
      },
      notes: editFormData.notes,
      plaintiff: editFormData.plaintiff,
      caseType: editFormData.caseType,
      lawSection: editFormData.lawSection,
      documents: editFormData.documents
    };

    console.log('Saving updated case data:', updatedItem);

    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: `ข้อมูลคดี ${editFormData.defendantName} ได้รับการอัปเดตแล้ว`,
    });

    navigate(-1, { 
      state: { 
        updatedCase: updatedItem,
        shouldUpdate: true 
      } 
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleProcessClick = (processType) => {
    // ถ้าคลิกปุ่มเดียวกับ active tab ให้เปิด modal
    if (processType === activeTab) {
      setSelectedProcess(processType);
      if (!processData[processType]) {
        setProcessData({...processData, [processType]: []});
      }
    } else {
      // ถ้าคลิกปุ่มอื่น ให้เปลี่ยน tab
      setActiveTab(processType);
      toast({
        title: `เปลี่ยนไปยังขั้นตอน${processType}`,
        description: `แสดงข้อมูลสำหรับขั้นตอน${processType}`,
      });
    }
  };

  const handleAddProcessEntry = () => {
    if (!newProcessEntry.date || !newProcessEntry.description) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุวันที่และรายละเอียด",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now(),
      date: newProcessEntry.date,
      description: newProcessEntry.description,
      details: newProcessEntry.details,
      createdAt: new Date().toLocaleString('th-TH')
    };

    // เพิ่มข้อมูลใน processData
    setProcessData({
      ...processData,
      [selectedProcess]: [...(processData[selectedProcess] || []), entry]
    });

    // แปลงข้อมูลให้เข้ากับรูปแบบ appointments และเพิ่มใน dynamicAppointments
    const newAppointment = {
      date: new Date(newProcessEntry.date).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '/'),
      time: newProcessEntry.time || '00:00:00',
      title: `--- ${newProcessEntry.description} ---`,
      details: `รูปแบบการทำงาน: ${newProcessEntry.workFormat === 'online' ? 'ออนไลน์' : 'ที่สำนักงาน'}${newProcessEntry.result ? ', ผลการดำเนินการ: ' + newProcessEntry.result : ''}${newProcessEntry.followUp ? ', การติดตาม: ' + newProcessEntry.followUp : ''}${newProcessEntry.details ? ', รายละเอียด: ' + newProcessEntry.details : ''}`,
      type: 'process',
      processType: selectedProcess,
      status: newProcessEntry.result || 'รอดำเนินการ',
      workFormat: newProcessEntry.workFormat,
      result: newProcessEntry.result,
      followUp: newProcessEntry.followUp
    };

    // เพิ่ม appointment ใหม่และเรียงลำดับตามวันที่
    const updatedAppointments = [...dynamicAppointments, newAppointment].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB - dateA; // เรียงจากใหม่ไปเก่า
    });

    setDynamicAppointments(updatedAppointments);
    setNewProcessEntry({ 
      date: '', 
      time: '',
      description: '', 
      details: '',
      workFormat: 'online',
      result: '',
      followUp: ''
    });
    
    toast({
      title: "เพิ่มข้อมูลสำเร็จ",
      description: `เพิ่มข้อมูล${selectedProcess}ในรายการนัดเรียบร้อยแล้ว`,
    });
  };

  const closeProcessModal = () => {
    setSelectedProcess(null);
    setNewProcessEntry({ 
      date: '', 
      time: '',
      description: '', 
      details: '',
      workFormat: 'online',
      result: '',
      followUp: ''
    });
  };

  const handleAddStatusEntry = () => {
    setShowStatusModal(true);
  };

  const handleSubmitStatusEntry = () => {
    if (!newStatusEntry.title || !newStatusEntry.description || !newStatusEntry.date) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุชื่อหัวข้อ, รายละเอียด และวันที่",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date(newStatusEntry.date).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      title: newStatusEntry.title,
      description: newStatusEntry.description,
      icon: <FileText className="h-4 w-4" />,
      status: newStatusEntry.status,
      details: newStatusEntry.details,
      createdAt: new Date().toLocaleString('th-TH')
    };

    // เพิ่มข้อมูลใน Status Processed
    setDynamicStatusProcessed({
      ...dynamicStatusProcessed,
      [activeTab]: [...(dynamicStatusProcessed[activeTab] || []), entry]
    });

    setNewStatusEntry({
      title: '',
      description: '',
      date: '',
      status: 'รอดำเนินการ',
      details: ''
    });
    
    setShowStatusModal(false);
    
    toast({
      title: "เพิ่มข้อมูลสำเร็จ",
      description: `เพิ่มข้อมูลใน Status Processed สำหรับ${activeTab}เรียบร้อยแล้ว`,
    });
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setNewStatusEntry({
      title: '',
      description: '',
      date: '',
      status: 'รอดำเนินการ',
      details: ''
    });
  };

  const handleAddAppointmentEntry = () => {
    setShowAppointmentModal(true);
  };

  const handleSubmitAppointmentEntry = () => {
    if (!newAppointmentEntry.date || !newAppointmentEntry.title) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดระบุวันที่นัดและรายการนัด",
        variant: "destructive"
      });
      return;
    }

    const newAppointment = {
      date: new Date(newAppointmentEntry.date).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: newAppointmentEntry.time || '00:00:00',
      title: newAppointmentEntry.title,
      details: newAppointmentEntry.details,
      type: 'user-added',
      processType: activeTab,
      status: newAppointmentEntry.result,
      followUp: newAppointmentEntry.followUp,
      createdAt: new Date().toLocaleString('th-TH')
    };

    // เพิ่ม appointment ใหม่และเรียงลำดับตามวันที่
    const updatedAppointments = [...dynamicAppointments, newAppointment].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB - dateA; // เรียงจากใหม่ไปเก่า
    });

    setDynamicAppointments(updatedAppointments);

    setNewAppointmentEntry({
      date: '',
      time: '',
      title: '',
      result: 'เลื่อนนัด',
      followUp: '',
      details: ''
    });
    
    setShowAppointmentModal(false);
    
    toast({
      title: "เพิ่มรายการนัดสำเร็จ",
      description: `เพิ่มรายการนัดสำหรับ${activeTab}เรียบร้อยแล้ว`,
    });
  };

  const closeAppointmentModal = () => {
    setShowAppointmentModal(false);
    setNewAppointmentEntry({
      date: '',
      time: '',
      title: '',
      result: 'เลื่อนนัด',
      followUp: '',
      details: ''
    });
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'court': return 'bg-blue-100 text-blue-800';
      case 'action': return 'bg-green-100 text-green-800';
      case 'mediation': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!caseData) {
    return null;
  }

  return (
        <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
           <div className="flex items-center space-x-4">
             <Button
               variant="outline"
               onClick={handleCancel}
               className="flex items-center space-x-2"
             >
               <ArrowLeft className="h-4 w-4" />
               <span>กลับ</span>
             </Button>
             <div>
               <h1 className="text-2xl font-bold text-gray-800">บันทึกข้อมูลสำนักงานหมาย</h1>
             </div>
           </div>
           <div className="flex space-x-2">
             <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Law</span>
             <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Lawcase</span>
           </div>
         </div>
       </div>

            <div className="px-4 py-4">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border p-3 mb-3"
        >
           {/* First Row */}
           <div className="grid grid-cols-4 gap-2 mb-2">
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">เลขรับ กม.</Label>
               <Input
                 value={editFormData.receiptNo}
                 onChange={(e) => setEditFormData({...editFormData, receiptNo: e.target.value})}
                 className="text-sm"
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">ชื่อบุคคลหรือนิติบุคคล</Label>
               <Input
                 value={editFormData.defendantName}
                 onChange={(e) => setEditFormData({...editFormData, defendantName: e.target.value})}
                 className="text-sm"
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">Status Code</Label>
               <Input
                 value="2013 - ขั้นตอนการปรับปรุง"
                 className="text-sm bg-gray-50"
                 readOnly
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">Law status</Label>
               <Input
                 value="Normal Case"
                 className="text-sm bg-gray-50"
                 readOnly
               />
             </div>
           </div>

           {/* Second Row */}
           <div className="grid grid-cols-4 gap-2 mb-2">
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">วันที่รับเรื่อง</Label>
               <Input
                 value="29/01/2025 00:00:00"
                 className="text-sm"
                 readOnly
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">เลขคดี</Label>
               <Input
                 value={editFormData.blackCaseNo}
                 onChange={(e) => setEditFormData({...editFormData, blackCaseNo: e.target.value})}
                 className="text-sm"
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">เลขคดีแดง</Label>
               <Input
                 value={editFormData.redCaseNo}
                 onChange={(e) => setEditFormData({...editFormData, redCaseNo: e.target.value})}
                 className="text-sm"
               />
             </div>
             <div className="space-y-1">
               <Label className="text-sm text-gray-600">หมายเหตุ</Label>
               <Input
                 value={editFormData.notes}
                 onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                 className="text-sm"
               />
             </div>
           </div>

                     {/* Action Buttons */}
           <div className="flex space-x-2">
             <div className="flex rounded-lg overflow-hidden">
               <Button 
                 onClick={() => handleProcessClick('เตรียมฟ้อง')}
                 className={`text-white text-sm px-4 py-2 rounded-none border-r border-teal-400 ${
                   activeTab === 'เตรียมฟ้อง' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 เตรียมฟ้อง
               </Button>
               <Button 
                 onClick={() => handleProcessClick('ดำเนินคดี')}
                 className={`text-white text-sm px-4 py-2 rounded-none border-r border-teal-400 ${
                   activeTab === 'ดำเนินคดี' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 ดำเนินคดี
               </Button>
               <Button 
                 onClick={() => handleProcessClick('พิพากษา')}
                 className={`text-white text-sm px-4 py-2 rounded-none border-r border-teal-400 ${
                   activeTab === 'พิพากษา' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 พิพากษา
               </Button>
               <Button 
                 onClick={() => handleProcessClick('บังคับคดี')}
                 className={`text-white text-sm px-4 py-2 rounded-none border-r border-teal-400 ${
                   activeTab === 'บังคับคดี' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 บังคับคดี
               </Button>
               <Button 
                 onClick={() => handleProcessClick('อุทธรณ์')}
                 className={`text-white text-sm px-4 py-2 rounded-none border-r border-teal-400 ${
                   activeTab === 'อุทธรณ์' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 อุทธรณ์
               </Button>
               <Button 
                 onClick={() => handleProcessClick('ฏีกา')}
                 className={`text-white text-sm px-4 py-2 rounded-none ${
                   activeTab === 'ฏีกา' ? 'bg-teal-700 font-semibold' : 'bg-teal-500 hover:bg-teal-600'
                 }`}
               >
                 ฏีกา
               </Button>
             </div>
             <Button className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg flex items-center space-x-2">
               <Upload className="h-4 w-4" />
               <span>Upload File</span>
             </Button>
           </div>
        </motion.div>

                         {/* Two Panel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Status Processed Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-md shadow-sm border"
          >
                                     <div className="bg-gray-700 text-white px-3 py-2 rounded-t-md flex justify-between items-center">
              <h3 className="font-medium text-sm">Status Processed - {activeTab}</h3>
              <Button
                size="sm"
                onClick={handleAddStatusEntry}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 flex items-center space-x-1 rounded-md"
              >
                <Plus className="h-3 w-3" />
                <span>เพิ่มข้อมูล</span>
              </Button>
            </div>
            <div className="p-2">
              <div className="space-y-3">
                {/* แสดงข้อมูลจาก statusProcessedData */}
                {statusProcessedData[activeTab] && statusProcessedData[activeTab].length > 0 && (
                  statusProcessedData[activeTab].map((item, index) => (
                    <div key={index} className="flex space-x-3 p-2 border-l-4 border-blue-400 bg-blue-50 rounded-sm">
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.date}</div>
                      </div>
                    </div>
                  ))
                )}

                {/* แสดงข้อมูลที่เพิ่มโดยผู้ใช้ */}
                {dynamicStatusProcessed[activeTab] && dynamicStatusProcessed[activeTab].length > 0 && (
                  dynamicStatusProcessed[activeTab].map((item, index) => (
                    <div key={`dynamic-${index}`} className="flex space-x-3 p-2 border-l-4 border-orange-400 bg-orange-50 rounded-sm">
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {item.date} - เพิ่มเมื่อ: {item.createdAt}
                        </div>
                        <div className="mt-1">
                          <Badge className={`text-xs ${
                            item.status === 'เสร็จสิ้น' ? 'bg-green-100 text-green-800' :
                            item.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'รอการพิจารณา' ? 'bg-yellow-100 text-yellow-800' :
                            item.status === 'ยกเลิก' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </Badge>
                        </div>
                        {item.details && (
                          <div className="text-xs text-gray-600 mt-2">
                            {item.details}
                          </div>
                        )}
                      </div>
                      <div className="ml-2">
                        <Button size="sm" className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}

                {/* แสดงข้อความเมื่อไม่มีข้อมูล */}
                {(!statusProcessedData[activeTab] || statusProcessedData[activeTab].length === 0) &&
                 (!dynamicStatusProcessed[activeTab] || dynamicStatusProcessed[activeTab].length === 0) && (
                  <div className="text-center py-4 text-gray-500">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">ไม่มีข้อมูลสำหรับขั้นตอน{activeTab}</p>
                    <p className="text-xs mt-1">คลิกปุ่ม "เพิ่มข้อมูล" เพื่อเพิ่มรายการใหม่</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Appointments Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-sm border rounded-md"
          >
            <div className="bg-gray-700 text-white px-3 py-2 flex justify-between items-center rounded-t-md">
              <div className="flex">
                <div className="w-24">
                  <span className="text-sm font-medium">วันที่นัด</span>
                </div>
                <div className="flex-1 pl-4">
                  <span className="text-sm font-medium">รายการนัด</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={handleAddAppointmentEntry}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 flex items-center space-x-1 rounded-md"
                >
                  <Plus className="h-3 w-3" />
                  <span>เพิ่มนัด</span>
                </Button>
                <File className="h-4 w-4" />
              </div>
            </div>
            <div className="bg-gray-100 rounded-b-md">
              <div className="space-y-1 p-2">
                {/* แสดงนัดจาก appointmentsByProcess ตาม activeTab */}
                {appointmentsByProcess[activeTab] && appointmentsByProcess[activeTab].length > 0 ? (
                  appointmentsByProcess[activeTab].map((appointment, index) => (
                    <div key={index} className={`px-3 py-2 bg-white ${index < appointmentsByProcess[activeTab].length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex">
                            <div className="w-24">
                              <div className="text-sm text-gray-900 font-medium">
                                {appointment.date}
                              </div>
                              <div className="text-sm text-gray-900">
                                {appointment.time}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">รอผล</div>
                            </div>
                            <div className="flex-1 pl-4">
                              <div className="text-sm text-gray-900">{appointment.title}</div>
                              {appointment.status && (
                                <div className="mt-1">
                                  <span className={`text-sm font-medium ${
                                    appointment.status === 'No Result' ? 'text-red-600' :
                                    appointment.status === 'รอดำเนินการ' ? 'text-orange-600' :
                                    appointment.status === 'เสร็จสิ้น' ? 'text-green-600' :
                                    'text-green-600'
                                  }`}>
                                    {appointment.status}
                                  </span>
                                </div>
                              )}
                              {appointment.details && (
                                <div className="text-xs text-gray-600 mt-1">
                                  วันที่ {appointment.date} {appointment.details.substring(0, 50)}...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-2">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 p-0 rounded-md">
                            <File className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">ไม่มีรายการนัดสำหรับขั้นตอน{activeTab}</p>
                  </div>
                )}
                
                {/* แสดงนัดที่เพิ่มโดยผู้ใช้ (ถ้ามี) */}
                {dynamicAppointments.filter(apt => apt.processType === activeTab).map((appointment, index) => (
                  <div key={`dynamic-${index}`} className="px-3 py-2 bg-orange-50 border-b border-orange-200">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex">
                          <div className="w-24">
                            <div className="text-sm text-gray-900 font-medium">
                              {appointment.date}
                            </div>
                            <div className="text-sm text-gray-900">
                              {appointment.time}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {appointment.followUp ? appointment.followUp : 'รอผล'}
                            </div>
                          </div>
                          <div className="flex-1 pl-4">
                            <div className="text-sm text-gray-900">{appointment.title}</div>
                            {appointment.status && (
                              <div className="mt-1">
                                <span className={`text-sm font-medium ${
                                  appointment.status === 'สำเร็จ' ? 'text-green-600' :
                                  appointment.status === 'No Result' ? 'text-red-600' :
                                  appointment.status === 'เลื่อนนัด' ? 'text-orange-600' :
                                  appointment.status === 'ยกเลิก' ? 'text-gray-600' :
                                  'text-blue-600'
                                }`}>
                                  {appointment.status}
                                </span>
                              </div>
                            )}
                            {appointment.details && (
                              <div className="text-xs text-gray-600 mt-1">
                                วันที่ {appointment.date} {appointment.details.substring(0, 50)}...
                              </div>
                            )}
                            {appointment.workFormat && (
                              <div className="text-xs text-blue-600 mt-1">
                                รูปแบบ: {appointment.workFormat === 'online' ? 'ออนไลน์' : 
                                        appointment.workFormat === 'office' ? 'ที่สำนักงาน' :
                                        appointment.workFormat === 'court' ? 'ที่ศาล' : 'ประชุม'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 p-0 rounded-md">
                          <File className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Appointment Entry Modal */}
        {showAppointmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeAppointmentModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-700 text-white px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">รายการนัด</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeAppointmentModal}
                  className="text-white hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">วันที่นัด</Label>
                      <Input
                        type="date"
                        value={newAppointmentEntry.date}
                        onChange={(e) => setNewAppointmentEntry({...newAppointmentEntry, date: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">เวลา</Label>
                      <Input
                        type="time"
                        value={newAppointmentEntry.time}
                        onChange={(e) => setNewAppointmentEntry({...newAppointmentEntry, time: e.target.value})}
                        className="text-sm"
                        placeholder="13:30"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">รายการนัด</Label>
                    <Input
                      value={newAppointmentEntry.title}
                      onChange={(e) => setNewAppointmentEntry({...newAppointmentEntry, title: e.target.value})}
                      placeholder="นัดสืบพยานโจทก์"
                      className="text-sm"
                    />
                  </div>

                  {/* Result and Follow-up */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">ผลการดำเนินการ</Label>
                      <Select value={newAppointmentEntry.result} onValueChange={(value) => setNewAppointmentEntry({...newAppointmentEntry, result: value})}>
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="เลื่อนนัด">เลื่อนนัด</SelectItem>
                          <SelectItem value="สำเร็จ">สำเร็จ</SelectItem>
                          <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                          <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
                          <SelectItem value="No Result">No Result</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">การติดตาม</Label>
                      <Input
                        value={newAppointmentEntry.followUp}
                        onChange={(e) => setNewAppointmentEntry({...newAppointmentEntry, followUp: e.target.value})}
                        placeholder="การติดตามผล"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">รายละเอียดเพิ่มเติม</Label>
                    <Textarea
                      value={newAppointmentEntry.details}
                      onChange={(e) => setNewAppointmentEntry({...newAppointmentEntry, details: e.target.value})}
                      placeholder="กรุณาแล้ว"
                      className="text-sm"
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={closeAppointmentModal}
                      className="px-4 py-2"
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      onClick={handleSubmitAppointmentEntry}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Status Entry Modal */}
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeStatusModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-700 text-white px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">เพิ่มข้อมูล Status Processed - {activeTab}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeStatusModal}
                  className="text-white hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">หัวข้อ</Label>
                    <Input
                      value={newStatusEntry.title}
                      onChange={(e) => setNewStatusEntry({...newStatusEntry, title: e.target.value})}
                      placeholder="เช่น รับคำฟ้อง - ยื่นคำต้าน ยื่นต่อศาล"
                      className="text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">รายละเอียด</Label>
                    <Textarea
                      value={newStatusEntry.description}
                      onChange={(e) => setNewStatusEntry({...newStatusEntry, description: e.target.value})}
                      placeholder="รายละเอียดของการดำเนินการ"
                      className="text-sm"
                      rows={3}
                    />
                  </div>

                  {/* Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">วันที่</Label>
                      <Input
                        type="date"
                        value={newStatusEntry.date}
                        onChange={(e) => setNewStatusEntry({...newStatusEntry, date: e.target.value})}
                        className="text-sm"
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">สถานะ</Label>
                      <Select value={newStatusEntry.status} onValueChange={(value) => setNewStatusEntry({...newStatusEntry, status: value})}>
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                          <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                          <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                          <SelectItem value="รอการพิจารณา">รอการพิจารณา</SelectItem>
                          <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">หมายเหตุเพิ่มเติม</Label>
                    <Textarea
                      value={newStatusEntry.details}
                      onChange={(e) => setNewStatusEntry({...newStatusEntry, details: e.target.value})}
                      placeholder="หมายเหตุหรือรายละเอียดเพิ่มเติม (ไม่บังคับ)"
                      className="text-sm"
                      rows={2}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={closeStatusModal}
                      className="px-4 py-2"
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      onClick={handleSubmitStatusEntry}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>เพิ่มข้อมูล</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Process Data Entry Modal */}
        {selectedProcess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeProcessModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-700 text-white px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">Status Proceed - {selectedProcess}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeProcessModal}
                  className="text-white hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6">
                {/* Add New Entry Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium">เพิ่มข้อมูลใหม่</h4>
                    <Button
                      onClick={handleAddProcessEntry}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>เพิ่มข้อมูล</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">วันที่นัด</Label>
                      <Input
                        type="date"
                        value={newProcessEntry.date}
                        onChange={(e) => setNewProcessEntry({...newProcessEntry, date: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">เวลา</Label>
                      <Input
                        type="time"
                        value={newProcessEntry.time}
                        onChange={(e) => setNewProcessEntry({...newProcessEntry, time: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">รายการนัด</Label>
                      <Input
                        value={newProcessEntry.description}
                        onChange={(e) => setNewProcessEntry({...newProcessEntry, description: e.target.value})}
                        placeholder="เช่น นัดสืบพยานโจทก์"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">รูปแบบการทำงานวันที่</Label>
                      <Select value={newProcessEntry.workFormat} onValueChange={(value) => setNewProcessEntry({...newProcessEntry, workFormat: value})}>
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">ออนไลน์ (Online)</SelectItem>
                          <SelectItem value="office">ที่สำนักงาน</SelectItem>
                          <SelectItem value="court">ที่ศาล</SelectItem>
                          <SelectItem value="meeting">ประชุม</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">ผลการดำเนินการ</Label>
                      <Select value={newProcessEntry.result} onValueChange={(value) => setNewProcessEntry({...newProcessEntry, result: value})}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="เลือกผลการดำเนินการ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="สำเร็จ">สำเร็จ</SelectItem>
                          <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                          <SelectItem value="เลื่อนนัด">เลื่อนนัด</SelectItem>
                          <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
                          <SelectItem value="No Result">No Result</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">การติดตาม</Label>
                      <Input
                        value={newProcessEntry.followUp}
                        onChange={(e) => setNewProcessEntry({...newProcessEntry, followUp: e.target.value})}
                        placeholder="การติดตามผล"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">รายละเอียดเพิ่มเติม</Label>
                      <Textarea
                        value={newProcessEntry.details}
                        onChange={(e) => setNewProcessEntry({...newProcessEntry, details: e.target.value})}
                        placeholder="รายละเอียดเพิ่มเติมของการนัดหมายหรือการดำเนินการ"
                        className="text-sm"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Process Data Table */}
                <div className="bg-white border rounded-lg">
                  <div className="bg-gray-600 text-white px-4 py-2 flex justify-between items-center">
                    <span className="font-medium">รายการข้อมูล{selectedProcess}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">วันที่กำหนด</span>
                      <span className="text-sm">รายละเอียดการกำหนด</span>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {processData[selectedProcess] && processData[selectedProcess].length > 0 ? (
                      <div className="space-y-3">
                        {processData[selectedProcess].map((entry, index) => (
                          <div key={entry.id} className="border-l-4 border-orange-400 pl-3 py-2 bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{entry.description}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  วันที่: {entry.date}
                                </div>
                                {entry.details && (
                                  <div className="text-xs text-gray-600 mt-1">
                                    {entry.details}
                                  </div>
                                )}
                                <div className="text-xs text-gray-400 mt-1">
                                  สร้างเมื่อ: {entry.createdAt}
                                </div>
                              </div>
                              <div className="ml-2">
                                <Button size="sm" className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>ยังไม่มีข้อมูล{selectedProcess}</p>
                        <p className="text-sm">คลิกปุ่ม "เพิ่มข้อมูล" เพื่อเพิ่มรายการใหม่</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
};

export default EditCasePage; 