import {Container, Grid, GridItem} from "@chakra-ui/layout";
import {authOptions} from "@/configs/auth";
import {getServerSession} from "next-auth/next";
import {ExtendedAnimeHistory, UserServices} from "@/services/User";
import HistoryCard from "@/components/AnimeCard/HistoryCard";


export default async function ProfileHistory() {
    const session = await getServerSession(authOptions)


    const history = await UserServices.getHistory(session.user.id)
    console.log(history)


    return (
        <Container maxW={'container.xl'}>
            <Grid templateColumns={'repeat(4,1fr)'}>
                {history.success && (
                    <>
                        {history.list.map((historyItem: ExtendedAnimeHistory, idx: number)=>(
                            <GridItem key={idx}>
                                <HistoryCard historyItem={historyItem}/>
                            </GridItem>
                        ))}
                    </>
                )}

            </Grid>
        </Container>
    );
}