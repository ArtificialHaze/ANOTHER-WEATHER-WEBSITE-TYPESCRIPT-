import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={"font-sans"}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
