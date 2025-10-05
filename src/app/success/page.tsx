import Link from "next/link";
import { Button } from "@/_components/inputs";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h1>
        <p className="text-gray-700">
          Your information was submitted to our team of immigration attorneys.
          Expect an email back from hello@visaapplications.com
        </p>

        <Link href="/" className="mt-6">
          <Button>Go Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
