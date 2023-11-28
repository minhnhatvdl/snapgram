import { getCurrentUser } from '@/lib/appwrite/api';
import { IAuthContext, IUser } from '@/types';
import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsLoading: () => {},
    setIsAuthenticated: () => {},
    checkAuthenticatedUser: async () => false,
};

const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const checkAuthenticatedUser = async () => {
        try {
            setIsLoading(true);
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser({
                    id: currentUser.$id,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio,
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsLoading,
        setIsAuthenticated,
        checkAuthenticatedUser,
    };

    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === null || localStorage.getItem('cookieFallback') === '[]') {
            navigate('/sign-in');
        }
        checkAuthenticatedUser();
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
