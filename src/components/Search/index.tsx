import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './searchComponent.module.scss';
import {AnimeService, IAnimeData} from "@/services/Anime";
import SearchCard from "@/components/Search/SearchCard";
import {Search} from "react-feather";
import {Scrollbar} from "react-scrollbars-custom";
import pageScrollDisabled from "@/utils/pageScrollDisabled";
import {Button, Text, Box, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";

export default function SearchComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchAnime, setSearchAnime] = useState<IAnimeData[]>([])

    const [searchResultHeight, setSearchResultHeight] = useState<number>(1)

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
                    if (data.length >= 1){

                        setSearchResultHeight(380)
                    }else {
                        setSearchResultHeight(80)
                    }

                })
            }

        }
        else {
            setSearchAnime([])
            setSearchResultHeight(0)
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

    console.log(search.length >= 3 , searchAnime.length >= 1)

    useEffect(() => {
        if (isOpen && inputRef.current){
            inputRef.current.focus()
        }
    }, [isOpen, inputRef]);
    return (

        <>
            <Box
                borderRadius={12}
                backdropFilter={'blur(60px)'}
                overflow={'hidden'}
                position={'relative'}
                zIndex={3}
            >
                <Button
                    ref={buttonRef}
                    onClick={toggleIsOpen}
                    leftIcon={<Search size={16}/> }
                    bg={'none'}
                    width={'100%'}
                    h={'40px'}
                    backdropFilter={'blur(60px)'}
                    borderWidth={'1px'}
                    borderRadius={'12px'}
                    backgroundColor={'searchBackground'}
                    borderColor={'searchOutline'}
                    padding={'6px 16px'}
                    zIndex={'auto'}
                    display={'flex'}
                    gap={'12px'}
                    justifyContent={'flex-start'}
                    _before={{
                        opacity: 0,
                        transition: 'opacity .25s ease-out',
                        bg: 'linear-gradient(91.46deg,#4673fa,#9646fa 100.13%) border-box',
                        border: '1px solid transparent',
                        content: '" "',
                        position: 'absolute',
                        inset: '-1px',
                        ['-webkit-mask']: 'linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        w: '100%',
                        h: '100%',
                        borderRadius: 'inherit'




                    }}
                    _hover = {{
                        _before:{
                            opacity: 1
                        }
                    }}

                >
                    <Text mb={0} fontWeight={300} color={'textSecondary'}>
                        Search the anime...
                    </Text>

                </Button>
            </Box>

            {isOpen && (
                <div style={{width: '$'}} className={styles.modal}>
                    <div className={styles.modal_content} ref={contentRef}>
                        <div className={styles.modal_content_searchBar}>


                                <Box
                                    pos={'relative'}
                                    px={'12px'}
                                    borderColor={search.length >= 3 ? 'backgroundInteractive': 'none'}
                                    borderBottomWidth={search.length >= 3 ? '1px' : '0'}
                                >
                                    <InputGroup >
                                        <InputLeftElement pointerEvents='none'>
                                            <Search size={24}/>
                                        </InputLeftElement>
                                        <Input

                                            type="text"
                                            outline={'none'}
                                            color={'white'}
                                            size={'lg'}
                                            variant={'unstyled'}
                                            onChange={handleChangeSearch}
                                            placeholder={'Start typing anime...'}
                                            ref={inputRef}
                                            h={'42px'}
                                            _placeholder={{
                                                color: 'white'
                                            }}
                                        />
                                    </InputGroup>
                                </Box>







                            <div className={`${styles.modal_content_searchBar_result} ${search.length >= 3 ? styles.modal_content_searchBar_result_visible : ''}`} style={{height: searchResultHeight}}>
                                {search.length > 3 && searchAnime.length == 0 && (
                                    <div className={styles.modal_content_searchBar_result_content}>
                                        <div className={styles.modal_content_searchBar_result_content_notFound}>
                                            Anime not found.
                                        </div>
                                    </div>
                                ) }
                                {!isLoading && searchAnime.length > 0 && (

                                    <>
                                        {searchAnime.length >= 1 ? (
                                            <Scrollbar className={styles.modal_content_searchBar_result_content} noDefaultStyles style={{width: '100%', height: '380px'}}>
                                                <>
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}
                                                    {searchAnime.map((anime, idx) => (
                                                        <SearchCard onClick={closeSearchModal} key={idx} data={anime}/>
                                                    ))}
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