import { LeadStoreProvider } from "@/providers/lead-store-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LeadStoreProvider>{children}</LeadStoreProvider>;
}
