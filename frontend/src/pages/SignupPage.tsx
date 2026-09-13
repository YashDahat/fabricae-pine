import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">Register for a B2B Account</h1>
        <SignupForm />
      </div>
    </section>
  );
}