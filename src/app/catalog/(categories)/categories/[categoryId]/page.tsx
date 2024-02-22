import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";


export default async function CategoriesPage({ params: {categoryId} }: {params: {categoryId: string}}) {

  const animeList =  await AnimeService.getCatalog(categoryId)

  console.log ("Cat", categoryId, animeList)


  return (
    <>
      <CatalogItems animeList={animeList} />
    </>
  )
}