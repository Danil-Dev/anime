import {useState} from "react";
import {AnimeService} from "@/services/Anime";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/navigation";


export default function RandomAnimeButton( ) {
    const [loading, setLoading] = useState<boolean>(false)
    const Router = useRouter()
    const RandomAnime = () => {
        setLoading(true)
        AnimeService.getRandomAnime().then((res) => {
            setLoading(false)
            Router.push(`/anime/${res.id}/`)
        })
    }

    return (
        <Button
            variant={'outlined'}
            colorScheme={'gray'}
            isLoading={loading}
            onClick={RandomAnime}
        >
            Рандомчик
        </Button>
    )
}