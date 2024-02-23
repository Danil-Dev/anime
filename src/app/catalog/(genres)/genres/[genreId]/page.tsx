import {AnimeService} from "@/services/Anime";
import {Box} from "@chakra-ui/layout";
import CatalogItems from "@/components/CatalogArea/CatalogItems";
import CatalogItems2 from "@/components/CatalogArea/CatalogItems2";


export default function GenrePage({ params: { genreId } }: { params: {genreId: string} }) {

  
    return (
        <Box>
             <CatalogItems2 type={'genre'} id={genreId}/>
        </Box>
    )
}