'use client';
import styles from './animeList.module.scss';
import AnimeListSlider from "@/components/AnimeList/AnimeListSlider";
import { Box, Button, Container, Flex, Spacer } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronRight } from "react-feather";
export const AnimeList = ({ animeList, title, link }) => {
    return (<section className={styles.anime_list}>
            <Container maxW={'container.xl'}>
                <Flex align={'center'} pb={25}>
                    <Box>
                        <Heading size={'2xl'} mb={0}>{title}</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button variant={'primary'} colorScheme={'blue'} rightIcon={<ChevronRight size={14}/>} as={NextLink} href={link} size={'md'}>
                            Каталог
                        </Button>
                    </Box>
                </Flex>
                <AnimeListSlider animeList={animeList}/>
            </Container>
        </section>);
};
