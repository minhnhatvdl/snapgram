import { bottombarLinks } from '@/constants';
import { NavLink, useLocation } from 'react-router-dom';

const BottomBar = () => {
    const { pathname } = useLocation();
    return (
        <section className='bottom-bar'>
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <NavLink
                        to={link.route}
                        className={`flex flex-col justify-center items-center gap-1 p-2 transition ${isActive && 'bg-primary-500 rounded-[10px] '}`}
                    >
                        <img width={16} height={16} src={link.imgURL} alt={link.label} className={`${isActive && 'invert-white'}`} />
                        <p className='tiny-medium text-light-2'>{link.label}</p>
                    </NavLink>
                );
            })}
        </section>
    );
};

export default BottomBar;
