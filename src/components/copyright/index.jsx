'use client';
import React from "react";
import styles from "./copyright.module.scss";
import { Lilita_One } from "next/font/google";
import Link from "next/link";
const lilita = Lilita_One({ subsets: ['latin'], weight: ['400'] });
export default function Copyright() {
    return (<div className={'container'}>
            <div className={styles.cptext}>
                <Link href={'/'}>
                    <h2>
                        Copyright © 2023. All Rights Reserved By Aniverse
                    </h2>
                </Link>
            </div>
        </div>);
}
