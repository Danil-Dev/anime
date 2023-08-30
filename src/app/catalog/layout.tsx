import React from 'react';
import {Box, Heading,Container, Grid, GridItem, VStack } from "@chakra-ui/layout";
import Breadcrumbs from "@/components/ Breadcrumbs/Breadcrumbs";
import CatalogFilter from "@/app/catalog/CatalogFilter";
import CatalogHead from "@/components/CatalogHead";


export default function GenresLayout( props: {
    breadcrumbsLinks: React.ReactNode,
    children: React.ReactNode
} ) {


    const genres = [
        {
            id: 'action',
            title: 'Бойовик',
        },
        {
            id: 'adventure',
            title: 'Пригоди',
        },
        {
            id: 'drama',
            title: 'Драма',
        },
        {
            id: 'ecchi',
            title: 'Еччі',
        },
        {
            id: 'fantasy',
            title: 'Фентезі',
        }
    ]
    //
    //
    const voicingList = [
        {
            id: 'amonogawa',
            title: 'Amonogawa',
        },
        {
            id: 'tagaroshi',
            title: 'Tagaroshi',
        },
        {
            id: 'dzuski',
            title: 'Dzuski',
        },
        {
            id: 'fanvoxua',
            title: 'FanVoxUa',
        }
    ]
    //
    const categoryList =[
        {
            id: 'popular',
            title: 'Популярні',
        },
        {
            id: 'new',
            title: 'Нові',
        },
        {
            id: 'ongoing',
            title: 'Онгоінги',
        }
    ]


    return (

        <Box minHeight={'85vh'}
            mt={'95px'}
        >
            <Container maxW={'container.xl'}>
                <CatalogHead/>
            </Container>
            <Container maxW={'container.xl'}>

                <Grid
                    templateColumns={{base: 'repeat(1, 1fr)', md: '1fr 3fr'}}
                    gap={8}
                    marginTop={'20px'}
                >
                    <GridItem>
                        <VStack spacing={'20px'}>
                            <Box
                                borderRadius={'8px'}
                                w={'100%'}
                            >
                                <CatalogFilter filter={genres} type={'genres'} title={'Аніме за жанром'} defaultIsOpen={true}/>
                            </Box>

                            <Box
                                borderRadius={'8px'}
                                w={'100%'}
                            >
                                <CatalogFilter filter={categoryList} type={'categories'} title={'Категори'} defaultIsOpen={true}/>
                            </Box>

                            <Box
                                borderRadius={'8px'}
                                w={'100%'}
                            >
                                <CatalogFilter filter={voicingList} type={'sub'} title={'Озвучення'} defaultIsOpen={false}/>
                            </Box>



                        </VStack>
                    </GridItem>
                    <GridItem>
                        {props.children}
                    </GridItem>
                </Grid>

            </Container>
        </Box>



    )
}