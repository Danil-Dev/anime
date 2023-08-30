
import {AnimeService, IAnimeData, UserData} from "@/services/Anime";
import Image from "next/image";
import {Tags} from "@/components/Tags";
import {Calendar, Play, Star} from "react-feather";
import AddToWatchListButton from "@/components/Button/AddToWatchlist";
import {EpisodeCard} from "@/components/EpisodeCard";
import {Box, Container, Flex, Text, Heading, VStack, HStack, Spacer, Grid, GridItem,} from "@chakra-ui/layout";

import AnimeInfo from "@/components/AnimeInfo";
import {authOptions} from "@/configs/auth";
import {getServerSession} from "next-auth/next";
import ContinueWatchingButton from "@/components/Button/ContinueWatchingButton";





export default async function SinglePage ({params: {id}} : {params: {id:string}}) {


    const session = await getServerSession(authOptions)

    console.log('single page', id)

    const anime = await AnimeService.getAnime(id, session?.user?.id)


    console.log('anime', anime)

    const pretty_date = new Date(anime.release_date).getFullYear()


    // const userData : UserData = await AnimeService.getAnimeWithCredentials( anime.id, session?.user?.id)
    // console.log(userData)






    return (
        <>
            <Box
                pt={{base:'20px', md:'175px'}}
                pb={{base:'20px', md:'120px'}}
                bgImage={`url("${anime.image_banner}")`}
                bgPosition={'top center'}
                bgSize={'cover'}
                zIndex={'-1'}
                position={'relative'}
                _before={{
                    content: "''",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "backgroundOutlineBlack",
                    zIndex: "-1",
                    backdropFilter: "blur(5px)"
                }}
            >
                <Container
                    maxW={'container.xl'}

                >
                    <Box
                        borderRadius={'10px'}
                        overflow={'hidden'}
                        display={{base: 'inline-block', md: 'none'}}
                    >
                        <Image src={anime.image} alt={anime.title} width={300} height={430}/>
                        <Box
                            mt={'15px'}
                            display={{base: 'block', md: 'none'}}
                        >
                            <Heading fontSize={'18px'}>{anime.title}</Heading>
                            <Tags tags={anime.genre}/>
                        </Box>
                    </Box>
                    <Flex
                        alignItems={'center'}
                        justifyContent={{base:'center',md:'space-between'}}>
                        <Box
                            display={{base: 'none', md: 'flex'}}
                            w={'35%'}
                        >
                            <Box
                                borderRadius={'10px'}
                                overflow={'hidden'}
                                display={'inline-block'}
                            >
                                <Image src={anime.image} alt={anime.title} width={300} height={430}/>
                            </Box>
                        </Box>
                        <VStack spacing={4}
                                align={'left'}
                                w={'65%'}
                        >
                            <Box display={{base: 'none', md: 'flex'}}><Heading fontSize={'52px'}>{anime.title}</Heading></Box>
                            <Box
                                    display={{base:'none',md:'flex'}}
                            >
                                <HStack spacing={2} alignItems={'center'}>
                                    <Tags tags={anime.genre}/>
                                    <Calendar size={16}/>
                                    <Text mb={0}>{pretty_date}</Text>
                                    <Star size={16}/>
                                    <Text mb={0}>{anime.rating}</Text>
                                </HStack>
                            </Box>
                            <Box
                                display={{base:'none',md:'flex'}}
                            >
                                <Text>{anime.description}</Text>
                            </Box>
                        </VStack>
                    </Flex>
                </Container>
            </Box>
            <Container
                maxW={'container.xl'}
                paddingTop={{base:'5px', md:'50px'}}
            >
                <Flex
                    display={{base: 'block', md: 'flex'}}
                >
                    <Box w={{base: '100%',md:'60%'}}>
                        <Box
                            mt={'-15px'}
                            display={{base:'none', md:'flex'}}
                        >
                            <Heading fontSize={'26px'}>{anime.title}</Heading>
                        </Box>
                        <Box
                            display={{base:'box', md:'none'}}
                        >
                            <Text>{anime.description}</Text>
                        </Box>
                        <Box>
                            <AddToWatchListButton disable={ !anime.auth} isInWatchlist={anime.isInWatchlist} id={anime._id}/>
                        </Box>
                        <Box >
                            <AnimeInfo anime={anime}/>
                        </Box>
                    </Box>
                    <Spacer/>
                    <Box
                        w={{base:'100%',md:'30%'}}
                    >
                        <Box display={{base: 'block', md:'none'}}>
                            <ContinueWatchingButton episode={anime.episodes[anime.lastWatchedEpisode | 0]} animeId={anime.id}/>

                        </Box>
                        <Box display={{base: 'none', md:'block'}}>
                            <Heading fontSize={'24px'}>
                                Current episode
                            </Heading>
                        </Box>
                        <Box display={{base: 'none', md:'block'}}>
                            <EpisodeCard episode={anime.episodes[anime.lastWatchedEpisode | 0]} animeId={anime.id}/>
                        </Box>
                    </Box>
                </Flex>
            </Container>
            <Container
                maxW={'container.xl'}
                pt={{base:'25px' ,md:'50px'}}
                pb={'50px'}
            >
                <Heading>Episodes</Heading>
                <Grid templateColumns={{base: 'repeat(2, 1fr)' ,md:'repeat(3, 1fr)'}} gap={6}>
                    {anime.episodes.map((episode , idx)=> (
                        <GridItem key={idx}>
                            <EpisodeCard episode={episode}  animeId={anime.id}/>
                        </GridItem>

                    ))}
                </Grid>
            </Container>
        </>
    )

}