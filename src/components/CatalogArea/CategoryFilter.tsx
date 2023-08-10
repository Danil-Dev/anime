import {useParams} from "next/navigation";
import styles from './catalogArea.module.scss'
import Link from "next/link";
import {useRef, useState} from "react";
import {Minus, Plus} from "react-feather";

interface CategoryFilterProps{
    genres: string[],
    title: string,
    defaultIsOpen?: boolean
}
export default function CategoryFilter({genres, title, defaultIsOpen = false} : CategoryFilterProps){

    const contentRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen)
    const params = useParams()
    const currentCategory = params.genre && typeof params.genre === 'string' ? params.genre : null

    const toggleOpenFilter = () => {
        setIsOpen(!isOpen)
    }


    console.log(currentCategory === genres[4])

    return (
        <div className={styles.catalog_filter}>

            <div className={`${styles.catalog_filter_head} ${isOpen && styles.catalog_filter_head_open}`} onClick={toggleOpenFilter}>
                <h3>{title}</h3>
                {isOpen ? <Minus size={18}/> : <Plus size={18}/> }

            </div>

            <div className={!isOpen ? styles.hidden + ' ' + styles.catalog_filter_content : styles.catalog_filter_content} ref={contentRef} style={{height: isOpen ? 37 * genres.length + 20 : 0, paddingTop: isOpen ? 15 : 0 }}>
                {genres.map((genre, idx) => (
                    <div key={idx} className={styles.catalog_filter_item}>
                        <Link href={`/catalog/${genre}`} className={currentCategory && decodeURIComponent(currentCategory) === genre ? styles.catalog_filter_active : null}>
                            {genre}
                        </Link>
                    </div>
                ))}
            </div>


        </div>
    )

}