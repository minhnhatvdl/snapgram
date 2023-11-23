import { Route, Routes } from 'react-router-dom';
import './globals.css';
import HomePage from './features/home/presentations/HomePage';
import SignInPage from './features/auth/presentations/SigninPage';
import SignUpPage from './features/auth/presentations/SignUpPage';

const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/sign-in' element={<SignInPage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
            </Routes>
        </main>
    );
};

export default App;
