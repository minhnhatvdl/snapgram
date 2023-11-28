import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignInValidation } from '@/lib/validation';
import { Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUser } from '@/lib/react-query/queriesAndMutations';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SignInPage = () => {
    const { isPending: isLoginUser, mutateAsync: loginUser } = useLoginUser();
    const { checkAuthenticatedUser } = useAuthContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof SignInValidation>) {
        const session = await loginUser({
            email: values.email,
            password: values.password,
        });
        if (!session)
            return toast({
                variant: 'destructive',
                title: 'Sign in failed. Please try again.',
            });
        const isAuthenticatedUser = await checkAuthenticatedUser();
        if (isAuthenticatedUser) {
            form.reset();
            navigate('/');
        } else {
            return toast({
                variant: 'destructive',
                title: 'Sign in failed. Please try again.',
            });
        }
    }

    return (
        <Form {...form}>
            <div className='flex-center flex-col sm:w-420'>
                <img src='assets/images/logo.svg' alt='logo' />
                <h2 className='h2-bold pt-2'>Log in to your account</h2>
                <p className='text-light-3 small-medium sm:base-regular'>Welcome back ! Please enter your details.</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='text' className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='shad-button_primary'>
                        {isLoginUser ? (
                            <div className='flex-center gap-2'>
                                <Loader /> Loading...{' '}
                            </div>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                    <p className='text-small-regular text-light-2 text-center mt-2'>
                        Do not have an account yet ?
                        <Link to='/sign-up' className='text-primary-500 text-small-semibold ml-1'>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SignInPage;
