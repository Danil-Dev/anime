import React from 'react';
import {Box, Heading,Container, Grid, GridItem, VStack } from "@chakra-ui/layout";
import Breadcrumbs from "@/components/ Breadcrumbs/Breadcrumbs";
import CatalogFilter from "@/app/catalog/CatalogFilter";
import CatalogHead from "@/components/CatalogHead";
import CatalogFilter2 from './CatalogFilter2';


export default function GenresLayout( props: {
    breadcrumbsLinks: React.ReactNode,
    children: React.ReactNode
} ) {



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
                                {/*<CatalogFilter filter={genres} type={'genres'} title={'Аніме за жанром'} defaultIsOpen={true}/>*/}
                                <CatalogFilter2 title={'Жанри'} type={'genres'} defaultIsOpen={true}/>
                            </Box>

                            <Box
                                borderRadius={'8px'}
                                w={'100%'}
                            >
                                <CatalogFilter2 type={'categories'} title={'Категорії'} defaultIsOpen={true}/>
                            </Box>

                            <Box
                                borderRadius={'8px'}
                                w={'100%'}
                            >
                                <CatalogFilter2 title={'Озвучка'} type={'audios'} defaultIsOpen={false}/>
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