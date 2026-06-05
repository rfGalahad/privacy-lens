import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;