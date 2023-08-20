'use client'
import styles from './breadcrumbs.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import log from "loglevel";


export interface BreadcrumbsLink{
    title: string,
    link: string
}

interface BreadcrumbsProps {
    delimiter?: string
}

export default function Breadcrumbs({ delimiter = '>'} : BreadcrumbsProps){
    const pathname = usePathname()

    const routes = pathname.split('/')
    console.log(routes)

    console.log(pathname)
    return(
        <div className={styles.breadcrumbs}>
            <Link href={'/'}>{'Головна'}</Link>
            <span>{delimiter}</span>
            <Link href={'/catalog'}>{'Каталог'}</Link>
            <span>{delimiter}</span>

            {routes[2] ===  'categories' ? (
                <Link href={'/catalog/categoties/'}>{'Категории'}</Link>
            ) : (
                <Link href={'/catalog/categoties/'}>{'Жанри'}</Link>
            )}
        </div>
    )
}