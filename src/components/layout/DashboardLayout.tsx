import { Outlet } from 'react-router-dom';

import Breadcrumbs from '../ui/Breadcrumbs';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';


const DashboardLayout = () => {

  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 flex justify-center overflow-y-auto bg-bg">
          <div className='min-w-6xl py-6'>
            <Breadcrumbs items={breadcrumbs} />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;