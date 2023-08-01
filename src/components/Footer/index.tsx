'use client'

import React from "react";
import styles from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";
import {Lilita_One} from "next/font/google";
const lilita = Lilita_One({subsets: ['latin'], weight: ['400']})

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.footer_navigation}>
                            <div>
                                <Link href={'/'}>
                                    <Image src={'/assets/img/logo/logo.png'} alt={'logo'} width={60} height={60}/>
                                    <p className={lilita.className}>Aniverse </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}