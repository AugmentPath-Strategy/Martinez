import { Cormorant_Garamond, Outfit } from "next/font/google";
import { QuoteProvider } from "@/components/QuoteContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import QuoteModal from "@/components/QuoteModal";
import ChatWidget from "@/components/ChatWidget";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Martinez Painting | The Painter Service in Austin, TX",
  description: "Martinez Painting provides reliable painter services in Austin, TX and surrounding areas, delivering quality results for homes and businesses.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

const themeBoot = `(() => {
  try {
    const stored = localStorage.getItem("martinez-theme");
    document.documentElement.dataset.theme = stored === "light" ? "light" : "dark";
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className={`${outfit.variable} ${outfit.className} ${cormorant.variable} bg-[color:var(--bg)] text-[color:var(--fg)] antialiased`}>
        <ThemeProvider>
          <QuoteProvider>
            {children}
            <QuoteModal />
            <ChatWidget />
            <ThemeToggle />
          </QuoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
