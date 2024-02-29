import {Container, Grid, GridItem} from "@chakra-ui/layout";
import {authOptions} from "@/configs/auth";
import {getServerSession} from "next-auth/next";
import {ExtendedAnimeHistory, UserServices} from "@/services/User";
import HistoryCard from "@/components/AnimeCard/HistoryCard";
import HistoryList from "@/components/HistoryList";


export default async function ProfileHistory() {
    const session = await getServerSession(authOptions)


    const history = await UserServices.getHistory(session.user.id)
    console.log(history)


    return (
        <Container maxW={'container.xl'}>
            <HistoryList userId={session.user.id}/>
        </Container>
    );
}