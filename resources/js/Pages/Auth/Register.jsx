import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <img src="/images/logo.png" alt="Green-Resort" className="h-12 w-auto" />
                </div>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">Register Page</p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Create Account</h2>
                <p className="text-gray-500 text-sm mt-1">Fill in the form below to create your account</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="font-bold text-gray-700 ml-1" />
                    <TextInput
                        id="name"
                        value={data.name}
                        placeholder="Your Name"
                        className="mt-1 block w-full border-gray-200 focus:border-black rounded-full py-3 px-6 shadow-sm"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-bold text-gray-700 ml-1" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="Email Address"
                        className="mt-1 block w-full border-gray-200 focus:border-black rounded-full py-3 px-6 shadow-sm"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="font-bold text-gray-700 ml-1" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        placeholder="Create Password"
                        className="mt-1 block w-full border-gray-200 focus:border-black rounded-full py-3 px-6 shadow-sm"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="font-bold text-gray-700 ml-1" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        placeholder="Repeat Password"
                        className="mt-1 block w-full border-gray-200 focus:border-black rounded-full py-3 px-6 shadow-sm"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center py-4 bg-black hover:bg-gray-800 rounded-full text-white font-bold text-base transition-all" disabled={processing}>
                        Create Account
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-600 font-medium">
                        Already have an account? {' '}
                        <Link href={route('login')} className="text-black font-black hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}