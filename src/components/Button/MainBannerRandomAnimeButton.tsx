import {useState} from "react";
import {AnimeService} from "@/services/Anime";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/navigation";


export default function MainBannerRandomAnimeButton( ) {
    const [loading, setLoading] = useState<boolean>(false)
    const Router = useRouter()
    const RandomAnime = () => {
        setLoading(true)
        AnimeService.getRandomAnime().then((res) => {
            console.log('Random anime', res)
            setLoading(false)
            Router.push(`/anime/${res.id}/`)
        })
    }

    return (
        <Button
            variant={'primary'}
            colorScheme={'blue'}
            isLoading={loading}
            onClick={RandomAnime}
        >
            Random
        </Button>
    )
}