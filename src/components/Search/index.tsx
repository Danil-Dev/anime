import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './searchComponent.module.scss';
import {AnimeList} from "@/components/AnimeList";
import {AnimeService, IAnimeData, IAnimeFoundData} from "@/services/Anime";
import SearchCard from "@/components/Search/SearchCard";
import {Search} from "react-feather";
import {Scrollbar} from "react-scrollbars-custom";
import pageScrollDisabled from "@/utils/pageScrollDisabled";

export default function SearchComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchAnime, setSearchAnime] = useState<IAnimeData[]>([])

    const inputRef = useRef<HTMLInputElement>(null);

    const closeSearchModal = () => {
        setIsOpen(false)
        setSearchAnime([])
        pageScrollDisabled(false)
    }
    const toggleIsOpen = () => {
        pageScrollDisabled(!isOpen)

        setIsOpen(!isOpen)
    }

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const {target} = event

        setSearch(target.value)

        if (target.value.length >= 3) {
            console.log('Get search req')


            if (!isLoading) {
                setIsLoading(true)
                AnimeService.searchAnime(target.value).then((data) => {
                    console.log("Searched", data)
                    setSearchAnime(data)
                    setIsLoading(false)

                })
            }

        }
        else {
            setSearchAnime([])
        }

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && buttonRef.current) {
                if (!contentRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                    setIsOpen(false)
                    setSearch('')
                    setSearchAnime([])
                    pageScrollDisabled(false)
                    // document.body.style.overflow = 'auto'
                }
            }

        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current){
            inputRef.current.focus()
        }
    }, [isOpen, inputRef]);
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
                <div style={{width: '$'}} className={styles.modal}>
                    <div className={styles.modal_content} ref={contentRef}>
                        <div className={styles.modal_content_searchBar}>
                            <div className={styles.modal_content_searchBar_input_wrapper} data-search={search.length >= 3}>
                                <div className={styles.modal_content_searchBar_input_wrapper_content}>
                                    <input
                                        type="text"
                                        onChange={handleChangeSearch}
                                        placeholder={'Start typing anime...'}
                                        ref={inputRef}
                                    />

                                    <div className={styles.modal_content_searchBar_input_wrapper_icon}>
                                        {isLoading  ? (
                                            <div className={styles.loader}></div>
                                        ) : <Search size={24}/>}
                                    </div>
                                </div>

                            </div>




                            <div className={styles.modal_content_searchBar_result}>
                                {search.length > 3 && searchAnime.length == 0 && (
                                    <div className={styles.modal_content_searchBar_result_content}>
                                        <div className={styles.modal_content_searchBar_result_content_notFound}>
                                            Anime not found.
                                        </div>
                                    </div>
                                ) }
                                {!isLoading && searchAnime.length > 0 && (

                                    <>
                                        {searchAnime.length > 2 ? (
                                            <Scrollbar className={styles.modal_content_searchBar_result_content} noDefaultStyles style={{width: '100%', height: '380px'}}>
                                                <>
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}
                                                </>

                                            </Scrollbar>
                                        ) : (
                                                <div className={styles.modal_content_searchBar_result_content}>
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}

                                                </div>
                                        )}

                                    </>

                                )}
                            </div>
                        </div>

                    </div>

                </div>
            )}

        </>
    )
}