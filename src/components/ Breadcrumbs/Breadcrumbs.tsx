'use client'
import styles from './breadcrumbs.module.scss'
import Link from "next/link";


export interface BreadcrumbsLink{
    title: string,
    link: string
}

interface BreadcrumbsProps {
    links: BreadcrumbsLink[],
    delimiter?: string
}

export default function Breadcrumbs({links, delimiter = '>'} : BreadcrumbsProps){

    return(
        <div className={styles.breadcrumbs}>
            {links.map((breadcrumb, idx) => (
                <>
                    <Link key={idx} href={breadcrumb.link}>{breadcrumb.title}</Link>

                    {idx !== links.length -1 && (
                        <span>{delimiter}</span>
                    )}
                </>

            ))}
        </div>
    )
}