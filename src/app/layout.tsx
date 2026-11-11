import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";
import { DeviceFrame } from "@/components/shell/device-frame";
import { PwaRegister } from "@/components/pwa-register";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Acadêmico Inatel · Gamificação",
    template: "%s · Acadêmico Inatel",
  },
  description:
    "Protótipo acadêmico (S05 — Interface Homem-Máquina) do App Acadêmico Inatel com módulo de gamificação: Conquistas por medalhas e Ranking normalizado por créditos e presença em laboratórios.",
  applicationName: "Acadêmico Inatel",
  appleWebApp: {
    capable: true,
    title: "Acadêmico",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1d3b5a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-bg text-fg">
        <SessionProvider>
          <DeviceFrame>{children}</DeviceFrame>
        </SessionProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
