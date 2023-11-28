import { Route, Routes } from 'react-router-dom';
import './globals.css';
import HomePage from './features/home/presentations/HomePage';
import SignInPage from './features/auth/presentations/SignInPage';
import SignUpPage from './features/auth/presentations/SignUpPage';
import AuthPage from './features/auth/presentations/AuthPage';
import { Toaster } from './components/ui/toaster';

const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                <Route element={<AuthPage />}>
                    <Route path='sign-in' element={<SignInPage />} />
                    <Route path='sign-up' element={<SignUpPage />} />
                </Route>
                <Route index element={<HomePage />} />
            </Routes>
            <Toaster />
        </main>
    );
};

export default App;
