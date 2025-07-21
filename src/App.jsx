import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import CaseManagement from '@/pages/CaseManagement';
import FileManagement from '@/pages/FileManagement';
import UserManagement from '@/pages/UserManagement';
import AppointmentScheduler from '@/pages/AppointmentScheduler';
import ExcelImport from '@/pages/ExcelImport';
import EditCasePage from '@/pages/EditCasePage';
import RecordDataPage from '@/pages/RecordDataPage';
import NewRecordPage from '@/pages/NewRecordPage';
import NotificationPage from '@/pages/NotificationPage';
import Layout from '@/components/Layout';
import PlaceholderPage from '@/pages/PlaceholderPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authStatus = localStorage.getItem('lawjaz_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Lawjaz - ระบบจัดการคดีความออนไลน์</title>
          <meta name="description" content="ระบบจัดการคดีความออนไลน์ที่ทันสมัยและใช้งานง่าย" />
        </Helmet>
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
        <Toaster />
      </>
    );
  }

  return (
    <Router>
      <Helmet>
        <title>Lawjaz - ระบบจัดการคดีความออนไลน์</title>
        <meta name="description" content="ระบบจัดการคดีความออนไลน์ที่ทันสมัยและใช้งานง่าย" />
      </Helmet>
      <Layout onLogout={() => setIsAuthenticated(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases" element={<CaseManagement />} />
                      <Route path="/record-data" element={<RecordDataPage />} />
            <Route path="/new-record" element={<NewRecordPage />} />
          <Route path="/files" element={<FileManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/import" element={<ExcelImport />} />
          <Route path="/edit-case" element={<EditCasePage />} />
          <Route path="/plaintiffs" element={<PlaceholderPage title="โจทก์/ผู้ร้อง" />} />
          <Route path="/defendants" element={<PlaceholderPage title="จำเลย/ผู้คัดค้าน" />} />
          <Route path="/petitions" element={<PlaceholderPage title="คำร้อง/คำขอ/คำแถลง" />} />
          <Route path="/submissions" element={<PlaceholderPage title="ฉบับร่างและผลการยื่น" />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;