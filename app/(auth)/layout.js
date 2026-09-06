import AuthShowcase from "@/components/auth/auth-showcase";

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen bg-black lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <AuthShowcase />
    </div>
  );
}
