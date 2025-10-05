import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h1>
        <p className="text-gray-700">
          Your information was submitted to our team of immigration attorneys.
          Expect an email back from hello@visaapplications.com
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
}
