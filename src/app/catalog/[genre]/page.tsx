import CatalogArea from "@/components/CatalogArea";
import React from "react";
import styles from '../catalog.module.scss'
import Breadcrumbs, {BreadcrumbsLink} from "@/components/ Breadcrumbs/Breadcrumbs";

export default function CatalogGenrePage ({params: {genre}} : {params: {genre:string}}) {


    const links: BreadcrumbsLink[] = [
        {
            title: 'Головна',
            link: '/'
        },
        {
            title: 'Категорії',
            link: '/catalog'
        },
        {
            title: decodeURIComponent(genre),
            link: `/catalog/${decodeURIComponent(genre)}`
        },
    ]


    return (
        <main>
            <section className={styles.catalog_page}>

                <div className="container">
                    <div className={styles.catalog_page_head}>
                        <h2>Каталог аниме | {decodeURIComponent(genre)}</h2>
                        <Breadcrumbs links={links} delimiter={'|'}/>
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