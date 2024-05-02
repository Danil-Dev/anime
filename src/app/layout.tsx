import './globals.scss'
import {Rubik_Mono_One, Russo_One, Ubuntu} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css'

import {Providers} from "@/app/providers";
import {Metadata} from "next";
import MobileMenu from "@/components/Header/MobileMenu";
import {Analytics} from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

// const inter = Inter({subsets: ['latin']})
const ubuntu = Ubuntu({subsets: ['cyrillic', 'latin'], weight: ['300', '400', '500', '700'], variable: '--font-ubuntu'})
const russoOne = Russo_One({subsets: ['cyrillic', 'latin'], weight: ['400'], variable: '--fort-russo-one'})
const rubikMono = Rubik_Mono_One({subsets: ['latin'], weight: ['400'], variable: '--font-rubik-mono-one'})
export const metadata: Metadata = {
  title: 'Aniverse - Дивитись Аніме Онлайн на Українській | Найкращі Аніме Серіали',
  description: 'Відкрийте для себе Aniverse - ваше головне джерело українського аніме! Насолоджуйтесь переглядом аніме серіалів онлайн у високій роздільній здатності. Щоденні оновлення та нові релізи!',
  keywords: ['українське аніме', 'аніме онлайн', 'дивитись аніме', 'аніме серіали', 'anime', 'Anime', 'Аніме', 'найкраще аніме', 'Найкраще аніме', 'аніме українською', 'онлайн', 'аніме українською онлайн', 'аніме жанри', 'онлайн на українській', 'жанри аніме', 'anime ukr', 'аніверсе', 'aniverse', 'аніме всесвіт'],
  generator: 'aniverse.com.ua (https://aniverse.com.ua)',
  openGraph: {
    title: 'Aniverse - Дивитись Аніме Онлайн на Українській | Найкращі Аніме Серіали',
    description: 'Відкрийте для себе Aniverse - ваше головне джерело українського аніме! Насолоджуйтесь переглядом аніме серіалів онлайн у високій роздільній здатності. Щоденні оновлення та нові релізи!',
    url: 'https://aniverse.com.ua',
    siteName: 'Aniverse',
    images: [
      {
        url: 'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/f07a7614-34cf-4998-02ea-872bac2a1c00/opengraph', // Must be an absolute URL
        width: 1280,
        height: 670,
      },
      {
        url: 'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/c713d0d9-7d42-4f98-782b-259de590cc00/opengraphalt', // Must be an absolute URL
        width: 500,
        height: 500,
        alt: 'My custom alt',
      },
    ],
    locale: 'ua_UA',
    type: 'website',
  },
  manifest: '/site.manifest',
  themeColor: '#ffffff'

}

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (

        <html lang="ua" className={`${ubuntu.variable} ${russoOne.variable} ${rubikMono.variable}`}>
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>

            <script defer src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
          <meta name="msapplication-TileColor" content="#da532c"/>
        </head>
        <body>
        <Providers>

          <Header/>
          <main>
            {children}
          </main>

          <Footer/>
          <MobileMenu/>
        </Providers>
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    )
}
