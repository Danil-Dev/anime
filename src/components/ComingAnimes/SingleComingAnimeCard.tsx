'use client'
import {IBannerData} from "@/services/Anime";
import {Flex, Box, Heading, Container, Text, Button, Spacer, Grid, GridItem,} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import {AspectRatio} from "@chakra-ui/layout";


export default function SingleComingAnimeCard({data}:{data:IBannerData}) {

    return (
        <Container maxW={'container.xl'}
                   borderRadius={'12px'}
        >

                <Flex
                    position={'relative'}
                    zIndex={'5'}
                    justifyContent={'space-between'}
                    borderRadius={'12px'} w={'100%'}
                    // overflow={'hidden'}
                    height={'100%'}
                    backgroundSize={'cover'}
                    backgroundRepeat={'no-repeat'}
                    backgroundPosition={'center'}
                    p={{base: '20px', md: '50px'}}
                    backgroundImage={`url(${data.image_banner})`}
                    backgroundColor={'backgroundOutlineBlack'}
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
                        backgroundColor: "backgroundOutlineBlack",
                        zIndex: "10",
                        backdropFilter: "blur(2px)",
                        borderRadius: "12px"
                    }}
                >

                    <Grid
                        templateRows={'1fr 1fr' }
                        zIndex={'11'}
                        flexDirection={'column'}
                        maxW={{base: '100%', md: '50%'}}

                    >

                        <GridItem >

                            <Text textAlign={{base: 'center', md: 'left'}} fontSize={{base: 18 }} fontWeight={'bold'}>НАЙОЧІКУВАНІШИЙ РЕЛІЗ СЕЗОНУ!</Text>
                        </GridItem>
                        <GridItem
                            justifySelf={'center'}

                        >
                            <Heading size={{base: 'md', md: 'lg' }}>{data.title}</Heading>
                            <Text noOfLines={[3, 2, 3]}>{data.description}</Text>
                            <Button
                                variant={'primary'}
                                colorScheme={'blue'}
                                as={NextLink}
                                href={data.link}
                                size={{base: 'md', md: 'lg'}}
                                maxW={{base: '100%', md:'220px'}}
                            >
                                Дивитися
                            </Button>
                        </GridItem>
                    </Grid>
                    <Box
                        display={{base: 'none', md: 'block'}}
                        position={'absolute'}
                        right={'-140px'}
                        bottom={'-20px'}
                        zIndex={'11'}>

                        <Image src={data.image} alt={data.title} width={500} height={700}/>
                    </Box>
                </Flex>

        </Container>

    )

}