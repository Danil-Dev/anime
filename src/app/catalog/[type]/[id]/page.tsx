import CatalogItems2 from "@/components/CatalogArea/CatalogItems2";
import {FilterType} from "@/components/CatalogArea/types";


export default function CatalogPage({params: {type, id}}: { params: {type: FilterType, id: string}}){

  return(
    <CatalogItems2 type={type} id={id}/>
  )

}