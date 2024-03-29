'use client'

import React, {useEffect, useState} from "react";

import Image from "next/image";
import {navLinks} from "@/routing";
import {usePathname} from "next/navigation";
import SearchComponent from '../Search'
import {Box} from "@chakra-ui/layout";
import {Button, Container, Grid, GridItem, Heading, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import AuthButton from "@/components/AuthButton";
import RandomAnimeButton from "@/components/Button/RandomAnimeButton";




export default function Header () {


    const [ isFixed, setIsFixed ]=useState<boolean>(false)


    useEffect(() => {
        const handleScrollPage = (event) => {
            if (window.scrollY >= 150) {
                setIsFixed(true)
            }
            else {

                setIsFixed(false)
            }

        }


        document.addEventListener('scroll' , handleScrollPage)


        return () => {
            document.addEventListener('scroll', handleScrollPage)
        }
    }, []);

    const pathname = usePathname()
    return (
        <Box
            p={'12px 0'}
            position={"fixed"}
            top={0}
            zIndex={100}
            left={0}
            w={'100%'}
            as={'header'}
            maxH={'75px'}
            background={!isFixed? 'backgroundFloating' : 'background'}
            backdropFilter={!isFixed? 'blur(10px)' : 'none'}
            transition={'all .2s cubic-bezier(.4,0,1,1)'}
            // bg={isFixed? '#000': "transparent"}

        >
            <Container maxW={'container.xl'}>
                <Grid templateColumns={{base: '2fr 1fr', md:'repeat(3, 1fr)'}} gap={6}
                >
                    <GridItem
                        w='100%'
                        display={{base: 'flex', md: 'flex'}}
                    >
                        <Link
                            href={'/'} as={NextLink}
                            display={'inline-flex'}
                            alignItems={'center'}
                            mr={'15px'}
                        >
                            {/*https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/4097df10-e154-4cef-4a4e-2a3cbbf4ba00/avatar*/}
                            <Image src={'/assets/img/logo-v3.png'} alt={'Logo'} width={50} height={50} />
                            <Heading
                                mb={0}
                                size={'lg'}
                                display={{base: 'block', md: 'none'}}
                                sx={{
                                    fontFamily: 'var(--font-rubik-mono-one)',
                                }}
                            >
                                Aniverse</Heading>
                        </Link>
                        <Box as={'nav'}
                            display={{base: 'none', md: 'flex'}}
                             margin={'auto 0'}
                        >
                            {navLinks.map((link, index) => {
                                const isActive = pathname ==link.path
                                return (
                                    <Box
                                        as={'li'}
                                        key={index}

                                    >
                                        <Button as={NextLink} href={link.path} variant={'outlined'}  colorScheme={'gray'}>
                                            {link.name}
                                        </Button>
                                    </Box>
                                )
                            })}
                            <RandomAnimeButton/>
                        </Box>
                    </GridItem>
                    <GridItem
                        justifySelf={{base: 'flex-end', md:'stretch'}}
                        alignSelf={'center'}
                        display={'flex'}
                        gap={4}
                    >
                        <Box width={{base: '100%'}}>
                            <SearchComponent/>
                        </Box>


                        <Box display={{base: 'block', md: 'none'}}>
                            <AuthButton/>
                        </Box>
                    </GridItem>
                    <GridItem
                        display={{base: 'none', md: 'flex'}}
                        w={'auto'}
                        justifySelf={'flex-end'}
                        alignSelf={'center'}
                    >

                        <AuthButton/>
                    </GridItem>
                </Grid>
            </Container>
        </Box>

    )
}