import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLogoutUser } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useAuthContext();
    const { mutateAsync: logoutUser, isSuccess } = useLogoutUser();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-10'>
                <Link to='/'>
                    <img src='/assets/images/logo.svg' alt='logo' width={170} />
                </Link>
                <Link to={`/profile/${user.id}`} className='flex items-center gap-2'>
                    <img className='h-8 w-8 rounded-full' src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt='profile' />
                    <div className='flex flex-col'>
                        <p className='body-bold'>{user.name}</p>
                        <p className='small-regular text-light-3'>@{user.username}</p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                <NavLink to={link.route} className='flex gap-4 p-4 items-center'>
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Button variant='ghost' className='shad-button_ghost' onClick={() => logoutUser()}>
                <img src='/assets/icons/logout.svg' alt='logout' />
                <p className='small-medium lg:base-medium'>Log out</p>
            </Button>
        </nav>
    );
};

export default LeftSideBar;
