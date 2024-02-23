import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";
import CatalogItems2 from "@/components/CatalogArea/CatalogItems2";


export default async function CategoriesPage({ params: {categoryId} }: {params: {categoryId: string}}) {

  const animeList =  await AnimeService.getCatalog(categoryId)

  console.log ("Cat", categoryId, animeList)


  return (
    <>
      <CatalogItems2/>
      <CatalogItems animeList={animeList} />
    </>
  )
}