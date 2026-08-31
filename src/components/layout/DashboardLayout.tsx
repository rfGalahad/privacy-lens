import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;