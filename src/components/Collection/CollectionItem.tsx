'use client'
import {ICollectionItem} from "@/services/Anime";
import {Box, Heading, LinkBox, LinkOverlay} from "@chakra-ui/layout";
import Image from "next/image";
import {Text} from "@chakra-ui/react";


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
                        <Heading mt={2}>
                            <LinkOverlay href={`/anime/${item.id}/`}>
                                <Text noOfLines={1} fontSize={{base: 'sm', md: 'sm'}}>{item.title}</Text>
                            </LinkOverlay>
                        </Heading>
                    </LinkOverlay>
                </Box>
            </LinkBox>
        </>
    )
}