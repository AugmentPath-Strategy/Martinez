import { Figtree, Fraunces } from "next/font/google";
import { QuoteProvider } from "@/components/QuoteContext";
import QuoteModal from "@/components/QuoteModal";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
  title: "Martinez Painting | The Painter Service in Austin, TX",
  description: "Martinez Painting provides reliable painter services in Austin, TX and surrounding areas, delivering quality results for homes and businesses.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${figtree.className} ${fraunces.variable}`}>
        <QuoteProvider>
          {children}
          <QuoteModal />
        </QuoteProvider>
      </body>
    </html>
  );
}
