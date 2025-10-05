import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 px-6 overflow-hidden">
      {/* Background dark shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-60"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-50"></div>

      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-9xl font-extrabold text-white animate-pulse">404</h1>
        <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-gray-200">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-400 text-lg">
          Sorry, the page you are looking for might have been removed or does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block px-8 py-3 bg-gray-800 text-white font-medium rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:-translate-y-1"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
