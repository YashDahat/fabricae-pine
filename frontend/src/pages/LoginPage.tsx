import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">Login to Your Account</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;