import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";


export default async function CategoriesPage({ params }: { params: {categoryId: string}}) {

    const animeList =  await AnimeService.getCatalog('all')


    return (
        <>
            <CatalogItems animeList={animeList} />
        </>
    )
}