'use client'

import React, {useEffect, useState} from "react";

import Image from "next/image";
import {navLinks} from "@/routing";
import {usePathname} from "next/navigation";
import styles from './header.module.scss'
import {Lilita_One} from "next/font/google";
import SearchComponent from '../Search'
import {Box} from "@chakra-ui/layout";
import {Button, Container, Flex, Grid, GridItem, Heading, Link, Spacer, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import AuthButton from "@/components/AuthButton";
import RandomAnimeButton from "@/components/Button/RandomAnimeButton";


const lilita = Lilita_One({subsets: ['latin'], weight: ['400']})


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
            position={isFixed? 'fixed' : 'relative'}
            top={0}
            zIndex={100}
            left={0}
            w={'100%'}
            as={'header'}
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
                            <Image src={'/assets/img/banner/101.png'} alt={'Logo'} width={45} height={45} />
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
                    >

                        <SearchComponent/>
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