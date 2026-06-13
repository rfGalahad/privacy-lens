import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;