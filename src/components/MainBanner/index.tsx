'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'
import {Box, Button, Container, Flex, Heading, Text} from "@chakra-ui/react";
import RandomAnimeButton from "@/components/Button/RandomAnimeButton";
import {navLinks} from "@/routing";
import NextLink from "next/link";
import React from "react";
import {usePathname} from "next/navigation";
import MainBannerRandomAnimeButton from "@/components/Button/MainBannerRandomAnimeButton";


export default function MainBanner () {

    const pathname = usePathname()
    return (
        <Box
            h={{base:'100vh',md:'80vh'}}
            bgRepeat={'no-repeat'}
            w={'100%'}
            bgImage={{base:'/assets/img/banner/mainbannermobile.png',md:'/assets/img/banner/anime_bg2.jpg'}}
            backdropFilter={{base:'blur(10px)',md:'none'}}
            bgSize={{base:'auto 100%',md:'cover'}}
            bgPosition={{base:'top center',md:'center'}}
            mt={'-140px'}
            position={'relative'}
            _before={{
                position: 'absolute',
                w: '100%',
                h: '100%',
                top: 0,
                left: 0,
                content: '""',
                bg: 'rgba(255,255,255,.05)',
                // backdropFilter: 'blur(2px)',
                zIndex: -1
            }}
        >
            <Container maxW={'container.xl'} h={'100%'}>
                <Flex h={'100%'} pt={'140px'}  alignItems={'center'} >
                    <Box w={{base: '100%', md: '60%'}}  mt={'25px'}>
                        <Heading

                            size={'3xl'}
                            mb={'10px'}
                            sx={{
                                fontFamily: 'var(--font-rubik-mono-one)',
                            }}
                        >
                            Aniverse
                        </Heading>
                        <Heading size={'sm'}>
                            Дивіться аніме українською
                        </Heading>
                        <Box as={'nav'}
                             display={{base: 'flex', md: 'none'}}
                             margin={'auto 0'}
                        >
                            {navLinks.map((link, index) => {
                                const isActive = pathname ==link.path
                                return (
                                    <Box
                                        as={'li'}
                                        key={index}

                                    >
                                        <Button as={NextLink} href={link.path} variant={'primary'}  colorScheme={'blue'}>
                                            {link.name}
                                        </Button>
                                    </Box>
                                )
                            })}
                            <MainBannerRandomAnimeButton/>
                        </Box>
                    </Box>
                </Flex>
            </Container>

        </Box>
    )
}