import React from "react";
import styles from './catalog.module.scss'
import CatalogArea from "@/components/CatalogArea";
import Breadcrumbs, {BreadcrumbsLink} from "@/components/ Breadcrumbs/Breadcrumbs";



export default function CatalogPage() {


    const links: BreadcrumbsLink[] = [
        {
            title: 'Головна',
            link: '/'
        },
        {
            title: 'Категорії',
            link: '/catalog'
        },
    ]

    return (
        <main>
            <section className={styles.catalog_page}>

                <div className="container">
                    <div className={styles.catalog_page_head}>
                        <h2>Каталог аниме</h2>

                        <Breadcrumbs links={links} delimiter={'/'}/>
                    </div>
                </div>

                <div className="container">
                    <div className="row">

                        <CatalogArea/>
                    </div>
                </div>
            </section>
        </main>
    )
}
