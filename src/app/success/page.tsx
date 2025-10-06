import Link from "next/link";
import { Button } from "@/_components/inputs";
import Info from "@/_components/icons/info";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded text-center">
        <Info />
        <div className="max-w-xl mb-5">
          <h1 className="text-3xl font-black mb-4">Thank you!</h1>
          <p className="font-black">
            Your information was submitted to our team of immigration attorneys.
            Expect an email back from hello@visaapplications.com
          </p>
        </div>

        <Link href="/" className="mt-6">
          <Button>Go Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
