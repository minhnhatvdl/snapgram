import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLogoutUser } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();
    const { mutateAsync: logoutUser, isSuccess } = useLogoutUser();
    const { user } = useAuthContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <section className='topbar'>
            <div className='flex-between px-4 py-4'>
                <Link to='/'>
                    <img src='/assets/images/logo.svg' alt='logo' width={130} />
                </Link>
                <div className='flex-center gap-4'>
                    <Button variant='ghost' className='shad-button_ghost' onClick={() => logoutUser()}>
                        <img src='/assets/icons/logout.svg' alt='logout' />
                    </Button>
                    <Link to={`/profile/${user.id}`}>
                        <img className='h-8 w-8 rounded-full' src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt='profile' />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopBar;
