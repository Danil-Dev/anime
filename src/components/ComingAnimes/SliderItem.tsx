'use client'
import styles from './comingAnimes.module.scss'
import {IBannerData} from "@/services/Anime";
import {Button, Center, Link, Spacer} from '@chakra-ui/react'
import {Tags} from "@/components/Tags";
import Image from "next/image";
import {Container, Flex, Heading, Text} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout";
import NextLink from "next/link";
import {ChevronRight} from "react-feather";



export default function SliderItem ({data}: {data: IBannerData}) {
    return (

            <Flex
                position={'relative'}
                zIndex={'5'}
                justifyContent={'space-between'}
                borderRadius={'12px'} w={'100%'}
                overflow={'hidden'}
                height={'100%'}
                backgroundSize={'cover'}
                backgroundRepeat={'no-repeat'}
                p={'50px'}
                backgroundImage={`url(${data.image_banner})`}
                _before={{
                    content: "''",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundColor: "backgroundScrolledSurface",
                    zIndex: "10"
                }}
            >
                <Box zIndex={'11'} maxW={'50%'} position={'relative'}>
                    <Text
                        display={'inline'}
                        fontSize={'xl'}
                        backgroundColor={'blue.600'}
                        color={'textPrimary'}
                        p={'12px  18px'}
                        borderRadius={'10px'}
                    >
                            НАЙОЧІКУВАНІШИЙ РЕЛІЗ СЕЗОНУ!
                    </Text>
                    <Heading size={'xl'} mt={'20px'}>{data.title}</Heading>
                    <Tags tags={data.genre}/>
                    <Text size={'xl'} mt={'20px'} mb={'20px'}>{data.studio}</Text>
                    <Text size={'xl'} mt={'20px'} mb={'20px'} noOfLines={[1, 2, 3]}>{data.description}</Text>
                        <Button
                            variant={'primary'}
                            colorScheme={'blue'}
                            as={NextLink}
                            href={data.link}
                            size={'lg'}
                            maxW={'220px'}
                            position={'absolute'}
                            bottom={0}
                        >
                            Дивитися
                        </Button>


                </Box>
                <Spacer/>
                <Box alignSelf={'center'} borderRadius={'10px'} overflow={'hidden'} zIndex={'11'}>
                    <Image  src={data.image} alt={data.title} width={300} height={430}/>
                </Box>
            </Flex>


    )
}