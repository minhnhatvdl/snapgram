import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUpValidation } from '@/lib/validation';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const isLoading = false;

    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof SignUpValidation>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className='flex-center flex-col sm:w-420'>
                <img src='assets/images/logo.svg' alt='logo' />
                <h2 className='h2-bold pt-2'>Create a new account</h2>
                <p className='text-light-3 small-medium sm:base-regular'>To use Snapgram, please enter your details.</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type='text' className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type='text' className='shad-input' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        {isLoading ? (
                            <div className='flex-center gap-2'>
                                <Loader /> Loading...{' '}
                            </div>
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                    <p className='text-small-regular text-light-2 text-center mt-2'>
                        Already have an account ?
                        <Link to='/sign-in' className='text-primary-500 text-small-semibold ml-1'>
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SignUpPage;
