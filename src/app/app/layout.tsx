import { LeadStoreProvider } from "@/providers/lead-store-provider";
import Sidebar from "./sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LeadStoreProvider>
      <div className="flex min-h-screen relative">
        <Sidebar />
        <main className="flex-1 m-4 ml-0 lg:ml-4 w-[100vw]">{children}</main>
      </div>
    </LeadStoreProvider>
  );
}
