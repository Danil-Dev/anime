import {Grid, GridItem, Container, Heading, Center, Box} from "@chakra-ui/layout";
import {UserServices} from "@/services/User";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import {AnimeCard} from "@/components/AnimeCard";
import {IAnimeData} from "@/services/Anime";



export default async function WatchlistPage() {

    const session = await getServerSession(authOptions)

    console.log(session)
    // @ts-ignore
    const watchlist : IAnimeData[] = await UserServices.getWatchlist(session.user.id)


    if (watchlist.length === 0) {
      return (
        <Container maxW={'container.xl'}>
          <Center>
            <Heading size={'sm'} fontStyle={'italic'}> В тебе ще немає закладок</Heading>
          </Center>
        </Container>
      )
    }
    // console.log(watchlist)

    return (
        <Container maxW={'container.xl'}>
            <Grid templateColumns={{base:'repeat(2,1fr)', md: 'repeat(4,1fr)'}} gap={2}>
              {
                    watchlist.map((anime, idx)=>(
                      <GridItem key={idx}>
                        <AnimeCard anime={anime}/>
                      </GridItem>
                    ))

              }

            </Grid>
        </Container>
    );
}