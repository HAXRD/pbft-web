import type { Metadata } from "next";
import "../styles/mordern-normalize.css"
import "../styles/style.css"
import "../styles/utils.css"
import "../styles/components/node.css"
import "../styles/components/pool.css"

export const metadata: Metadata = {
  title: "Illustration of PBFT",
  description: "An illustration of PBFT consensus algorithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
