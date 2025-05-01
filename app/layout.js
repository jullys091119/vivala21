import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Viva La Noticia",
  description: "Noticias de Sinaloa y el mundo",
  'fb:app_id': '2331839577209552',
  facebook: {
    appId: '2331839577209552',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
