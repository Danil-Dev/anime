import {Grid, GridItem, Container} from "@chakra-ui/layout";
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
    // console.log(watchlist)

    return (
        <Container maxW={'container.xl'}>
            <Grid templateColumns={'repeat(4,1fr)'}>
                {watchlist.map((anime, idx)=>(
                    <GridItem key={idx}>
                        <AnimeCard anime={anime}/>
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
}