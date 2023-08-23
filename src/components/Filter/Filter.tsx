'use client'
import styles from './filter.module.scss'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, ChangeEventHandler} from "react";
import log from "loglevel";
interface FilterProps {
    items:  string[]
}
export function Filter({items} : FilterProps) {

    const searchParams = useSearchParams()



    const handleChangeFilter = (genre: string, event:  ChangeEvent<HTMLInputElement>) => {
        console.log('change filter', genre, event.target)

        if (event.target.checked){
            console.log('add genre', genre)

            // route.replace(`/catalog?genres=${[...currentGenres, genre].join(',')}`)
        }
        else{
            console.log('remove genre')
            // route.replace(`/catalog?genres=${currentGenres.filter(item => item !== genre).join(',')}`)
        }
        // route.replace('/catalog')
    }


    return (
        <div className={styles.filter}>
            {items.map((item, idx) => (
                <div className={styles.filter_item} key={idx}>
                    <input type="checkbox" id={`filter-item-${idx}`}  onChange={(event) => handleChangeFilter(item, event)} checked={undefined}/>
                    <label htmlFor={`filter-item-${idx}`}> {item}</label>
                </div>
            ))}
        </div>
    )
}
