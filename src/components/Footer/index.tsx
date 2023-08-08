
'use client'

import React from "react";
import styles from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";
import {Lilita_One} from "next/font/google";
import {navLinks} from "@/routing";
const lilita = Lilita_One({subsets: ['latin'], weight: ['400']})

export default function Footer(){

    return(
        <footer className={styles.footer}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <nav className={styles.footer_navigation}>
                            <div className={styles.footer_logo}>
                                <Link href={'/'}>
                                    <Image src={'/assets/img/logo/logo.png'} alt={'Logo'} width={60} height={60}/>
                                    <p className={lilita.className}>Aniverse</p>
                                </Link>
                            </div>
                            <div className={styles.footer_wrapper}>
                                <ul>
                                    {navLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={link.path} >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className={styles.footer_faq}>
                        <nav className={styles.footer_faq_nav}>
                            <div className={styles.footer_wrapper}>
                                <ul>
                                    <li><Link href={'/'}>FAQ</Link></li>
                                    <li><Link href={'/'}>HELP CENTER</Link></li>
                                    <li><Link href={'/'}>TERMS OF USE</Link></li>
                                    <li><Link href={'/'}>PRIVACY</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className={styles.footer_copyright}>
                        <h2>Copyright © 2023. All Rights Reserved By Aniverse</h2>
                    </div>
                </div>
            </div>
        </footer>
    )
}