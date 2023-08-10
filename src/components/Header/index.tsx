'use client'

import React from "react";

import Image from "next/image";
import {navLinks} from "@/routing";
import {usePathname} from "next/navigation";
import styles from './header.module.scss'
import {Lilita_One} from "next/font/google";
import SearchComponent from '../Search'
import {Box} from "@chakra-ui/layout";
import {Button, Container, Flex, Grid, GridItem, Heading, Link, Spacer, Text} from "@chakra-ui/react";
import NextLink from "next/link";


const lilita = Lilita_One({subsets: ['latin'], weight: ['400']})


export default function Header () {

    const pathname = usePathname()
    return (
        <Box
            p={'12px 0'}

            w={'100%'}
            as={'header'}

        >
            <Container maxW={'container.xl'}>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}
                >
                    <GridItem
                        w='100%'
                        display={'flex'}
                    >
                        <Link
                            href={'/'} as={NextLink}
                            display={'inline-flex'}
                            alignItems={'center'}
                            gridGap={'20px'}
                            mr={'15px'}
                        >
                            <Image src={'/assets/img/logo/logo.png'} alt={'Logo'} width={60} height={60}/>
                        </Link>
                        <Box as={'nav'}
                            display={'flex'}
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
                        </Box>
                    </GridItem>
                    <GridItem>
                        <SearchComponent/>
                    </GridItem>
                    <GridItem
                        w={'auto'}
                        justifySelf={'flex-end'}
                        alignSelf={'center'}

                    >
                        <Button
                            variant={'outlined'}
                            colorScheme={'purple-gradient'}
                            fontSize={'14px'}
                            size={'md'}
                        >
                            РЕГИСТРАЦИИ</Button>
                    </GridItem>
                </Grid>
            </Container>
        </Box>

    )
}