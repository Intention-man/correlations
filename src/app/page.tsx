import "./globals.css";
import Link from "next/link";
import Home from "./pages/home";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <nav>
          <Link href="/">Default</Link>
          <Link href="/pages/home">Home</Link>
        </nav> */}
        {/* {children} */}
        <Home/>
      </body>
    </html>
  );
}
