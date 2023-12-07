import { Outlet } from 'react-router-dom';
import LeftSideBar from './components/LeftSideBar';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

const RoutPage = () => {
    return (
        <div className='w-full md:flex'>
            <TopBar />
            <LeftSideBar />
            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
            <BottomBar />
        </div>
    );
};

export default RoutPage;
