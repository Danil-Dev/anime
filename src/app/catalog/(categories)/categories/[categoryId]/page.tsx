import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";
import CatalogItems2 from "@/components/CatalogArea/CatalogItems2";


export default async function CategoriesPage({ params: {categoryId} }: {params: {categoryId: string}}) {






  return (
    <>
      <CatalogItems2 type={'catalog'} id={categoryId} />
    </>
  )
}