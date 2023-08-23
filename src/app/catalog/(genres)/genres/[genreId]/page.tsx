import {AnimeService} from "@/services/Anime";
import {Box} from "@chakra-ui/layout";
import CatalogItems from "@/components/CatalogArea/CatalogItems";


export default async function GenrePage({ params }: { params: {genreId: string} }) {


    const animeList= await AnimeService.getCategory(params.genreId)


    return (
        <Box>
             <CatalogItems animeList={animeList} />

        </Box>
    )
}