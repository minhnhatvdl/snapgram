import { Route, Routes } from 'react-router-dom';
import './globals.css';
import SignInPage from './features/auth/presentations/SignInPage';
import SignUpPage from './features/auth/presentations/SignUpPage';
import AuthPage from './features/auth/presentations/AuthPage';
import { Toaster } from './components/ui/toaster';
import RoutPage from './features/root/presentations/RootPage';
import { AllUsersPage, CreatePostPage, ExplorePage, HomePage, SavedPage } from './features/root/presentations/pages';

const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                <Route element={<AuthPage />}>
                    <Route path='sign-in' element={<SignInPage />} />
                    <Route path='sign-up' element={<SignUpPage />} />
                </Route>
                <Route element={<RoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path='/explore' element={<ExplorePage />} />
                    <Route path='/all-users' element={<AllUsersPage />} />
                    <Route path='/saved' element={<SavedPage />} />
                    <Route path='/create-post' element={<CreatePostPage />} />
                </Route>
            </Routes>
            <Toaster />
        </main>
    );
};

export default App;
