import { Montserrat } from "next/font/google";
import "./globals.css";
import { RadioProvider } from '@/app/Context';


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: 'Viva La Noticia',
  description: 'Noticias de Sinaloa y el mundo',
  fbAppId: '1234567890',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        <RadioProvider>
          {children}
        </RadioProvider>
      </body>
    </html>
  );
}
