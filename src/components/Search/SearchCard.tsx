import {IAnimeFoundData} from "@/services/Anime";
import styles from "@/components/Search/searchComponent.module.scss"
import Image from "next/image";
import {Tags} from "@/components/Tags";
import {Calendar, Star} from "react-feather";
import buildDateString from "@/utils/buildDateString";
import Link from "next/link";
import {AspectRatio, Box, LinkBox,LinkOverlay, Flex, Text, Heading} from "@chakra-ui/layout";

interface SearchCardProps {
    data: IAnimeFoundData,
    onClick?: () => void
}
export default function SearchCard({data, onClick}: SearchCardProps) {
    const handleClick = () => {
        if ( onClick && typeof onClick == 'function'){
            onClick()
        }

    }
    return (
        <LinkBox

            p={'15px'}
        >
            <LinkOverlay
                display={{base: 'none', md: 'flex'}}
                href={`/anime/${data.id}`}
            >
                    <Flex gap={5} >
                        <Box
                            rounded={'md'}
                            overflow={'hidden'}
                            minW={'120px'}

                        >
                            <Image  src={data.image} alt={data.title} width={120} height={160}/>
                        </Box>
                        <Box mb={5}>
                            <Heading size={"md"}>{data.title}</Heading>
                            <Flex
                                gap={2}
                                alignItems={'center'}
                                alignContent={'center'}
                            >
                                <Tags size={'small'} tags={data.genre}/>
                                <Calendar size={12} />
                                <Text m={0}>{buildDateString(data.release_date)}</Text>
                                <Star size={12} />
                                <Text m={0}>{data.rating}</Text>
                            </Flex>
                            <Text mt={'10px'}>{data.description}</Text>
                        </Box>
                    </Flex>
            </LinkOverlay>
            <LinkOverlay
                display={{base: 'flex', md: 'none'}}
                href={`/anime/${data.id}`}
            >
                    <Box mb={5}>
                        <Heading size={"sm"}>{data.title}</Heading>
                        <Tags size={'small'} tags={data.genre}/>
                    </Box>
            </LinkOverlay>
        </LinkBox>

    )
}