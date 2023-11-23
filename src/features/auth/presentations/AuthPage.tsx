import { Navigate, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const isAuthentificated = false;
    return isAuthentificated ? (
        <Navigate to='/home' />
    ) : (
        <>
            <section className='flex flex-col justify-center items-center flex-1 py-10'>
                <Outlet />
            </section>
            <img className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' src='assets/images/side-img.svg' />
        </>
    );
};

export default AuthPage;
