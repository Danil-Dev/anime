'use client'
import {ICollectionItem} from "@/services/Anime";
import {Box, LinkBox, LinkOverlay} from "@chakra-ui/layout";
import Image from "next/image";


export function CollectionItem ({item, width = 150} : {item: ICollectionItem, width?: number}) {


    return(
        <>

            <LinkBox as={'div'}>
                <Box mb={5}>
                    <LinkOverlay href={`/anime/${item.id}`}>
                        <Box
                            rounded={'md'}
                            overflow={'hidden'}
                            sx={{
                                '& > img': {
                                    width: '100%',
                                }
                            }}
                        >
                            <Image src={item.image} alt={item.title} width={width} height={width / 3 * 4}/>
                        </Box>
                    </LinkOverlay>
                </Box>
            </LinkBox>
        </>
    )
}