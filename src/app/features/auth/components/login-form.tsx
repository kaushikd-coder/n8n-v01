'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';


const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        await authClient.signIn.email({
            email: values.email, 
            password: values.password,
            callbackURL: '/' 
        },{
            onSuccess: () => {
                router.push('/');
                toast.success('Login successful!');
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
                console.error(ctx.error);
            }
        });
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className='flex flex-col gap-6'>
            <Card>

                <CardHeader className='text-center'>
                    <CardTitle>
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Login to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <div className='grid gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <Button
                                        variant={'outline'}
                                        className='w-full'
                                        type='button'
                                        disabled={isPending}
                                    >
                                        Continue with GitHub
                                    </Button>

                                    <Button
                                        variant={'outline'}
                                        className='w-full'
                                        type='button'
                                        disabled={isPending}
                                    >
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className='grid gap-6'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type='email' placeholder="me@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder="*******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type='submit' className='w-full' disabled={isPending}>Login</Button>
                                </div>

                                <div className='text-center text-sm'>
                                    Don't have an account? {" "}
                                    <Link href="/signup" className='underline underline-offset-4'>Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}