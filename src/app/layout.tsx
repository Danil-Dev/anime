import './globals.scss'
import {Rubik_Mono_One, Russo_One, Ubuntu} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css'

import {Providers} from "@/app/providers";
import {Metadata} from "next";
import MobileMenu from "@/components/Header/MobileMenu";

// const inter = Inter({subsets: ['latin']})
const ubuntu = Ubuntu({subsets: ['cyrillic', 'latin'], weight: ['300', '400', '500', '700'], variable: '--font-ubuntu'})
const russoOne = Russo_One({subsets: ['cyrillic', 'latin'], weight: ['400'], variable: '--fort-russo-one'})
const rubikMono = Rubik_Mono_One({subsets: ['latin'], weight: ['400'], variable: '--font-rubik-mono-one'})
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (

        <html lang="ua" className={`${ubuntu.variable} ${russoOne.variable} ${rubikMono.variable}`}>
        <body>
            <Providers>
                <Header/>
                <main>
                    {children}
                </main>

                <Footer/>
              <MobileMenu/>
            </Providers>
        </body>
        </html>
    )
}
