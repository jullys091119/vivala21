import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: 'Viva La Noticia',
  description: 'Noticias de Sinaloa y el mundo',
  openGraph: {
    title: 'Viva La Noticia',
    description: 'Noticias de Sinaloa y el mundo',
    url: 'https://vivala21-j4ml.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://vivala21-j4ml.vercel.app/images/logo.jpg', // o cualquier imagen accesible públicamente
        width: 1200,
        height: 630,
        alt: 'Viva La Noticia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viva La Noticia',
    description: 'Noticias de Sinaloa y el mundo',
    image: 'https://vivala21-j4ml.vercel.app/images/logo.jpg',
  },
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
