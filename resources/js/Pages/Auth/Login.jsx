import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => { reset('password'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/* Header Login */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <img src="/images/logo.png" alt="Green-Resort" className="h-12 w-auto" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Green Resort</h2>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">Login Page</p>
            </div>

            <form onSubmit={submit} className="space-y-5">

                

                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-bold text-gray-700 ml-1" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="Enter Your Email"
                        className="mt-1 block w-full border-gray-200 focus:border-black focus:ring-black rounded-full py-3 px-6 shadow-sm"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Passwords" className="font-bold text-gray-700 ml-1" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            placeholder="Enter Your Passwords"
                            className="mt-1 block w-full border-gray-200 focus:border-black focus:ring-black rounded-full py-3 px-6 shadow-sm"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </span>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex justify-end">
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-xs font-black text-gray-900 hover:underline">
                            Forgot Password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center py-4 bg-black hover:bg-gray-800 rounded-full text-white font-bold text-base transition-all active:scale-[0.98]" disabled={processing}>
                        Login
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-600 font-medium">
                        Don't have an Account ? {' '}
                        <Link href={route('register')} className="text-black font-black hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}