'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {navLinks} from "@/routing";
import {usePathname} from "next/navigation";
import styles from './header.module.scss'
import {Lilita_One} from "next/font/google";
import DropdownMenu from "@/components/dropdownMenu";


const lilita = Lilita_One({subsets: ['latin'], weight: ['400']})


export default function Header () {

    const pathname = usePathname()
    return (
        <header className={styles.header}>
            <div className={'container'}>
                <div className={'row'}>
                   <div className={'col-md-12'}>
                        <nav className={styles.header_navigation}>
                            <div className={styles.header_logo}>
                                <Link href={'/'}>
                                    <Image src={'/assets/img/logo/logo.png'} alt={'Logo'} width={60} height={60}/>
                                    <p className={lilita.className}>Aniverse</p>
                                </Link>
                            </div>
                            <div className={styles.header_wrapper}>
                                <DropdownMenu/>
                            </div>
                        </nav>

                   </div>
                </div>
            </div>
        </header>
    )
}