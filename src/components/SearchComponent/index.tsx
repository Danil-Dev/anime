import React, {useEffect, useRef, useState} from 'react';
import styles from './searchComponent.module.scss';
import {AnimeList} from "@/components/AnimeList";
import {IAnimeData, IAnimeFoundData} from "@/services/Anime";
import SearchCard from "@/components/SearchComponent/SearchCard";
import {Search} from "react-feather";

export default function SearchComponent(){
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)

    const found : IAnimeFoundData[] = [
        {
            title : 'Реінкарнація безробітного',
            id: 'mushoku-2',
            rating: 9,
            description:'34-летний безработный спасает группу подростков от смерти под колёсами грузовика, однако погибает сам. Он перерождается в волшебном мире под именем Рудеус Грейрат. Сохранив знания и опыт, он клянется вести полноценную жизнь и не повторять свои прошлые ошибки.',
            image:'/assets/img/poster/mushoku.webp',
            genre:['csfgs', 'salksaljk.', 'askahjnkskjasdkjasdjkakjsdjsd'],
            release_date:'1488',
        },
        {
            title : 'Реінкарнація безробітного: В інший світ на повному серйозі (2 частина)',
            id: 'mushoku-2',
            rating: 9,
            description:'weqdrfasdgfasdg',
            image:'/assets/img/poster/mushoku.webp',
            genre:['csfgs'],
            release_date:'1488',
        },
        {
            title : 'Реінкарнація безробітного: В інший світ на повному серйозі (2 частина)',
            id: 'mushoku-2',
            rating: 9,
            description:'weqdrfasdgfasdg',
            image:'/assets/img/poster/mushoku.webp',
            genre:['csfgs'],
            release_date:'1488',
        }
    ]
    const toggleIsOpen = () => {
        if (isOpen){
            setIsOpen(false)
            document.body.style.overflow = 'auto'
        }
        else {
            setIsOpen(true)
            document.body.style.overflow = 'hidden'

        }

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && buttonRef.current){
                if (!contentRef.current.contains(event.target) && !buttonRef.current.contains(event.target)){
                    setIsOpen(false)
                    // document.body.style.overflow = 'auto'
                }
            }

        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, []);
    return (

        <>
            <button
                className={styles.btnModal}
                onClick={toggleIsOpen}
                ref={buttonRef}
            >
                <Search size={22}/>
                Search...
            </button>
            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content} ref={contentRef}>
                       <div className={styles.modal_content_searchBar}>
                           <input type="text" placeholder={'Search'}/>
                       </div>
                        <div className={styles.searchResults}>
                            {found.map((anime, index) => (

                                <SearchCard key={index} data={anime}/>
                            ))}
                        </div>
                    </div>

                </div>
            )}

        </>
    )
}