import React from "react";
import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";
import CatalogItems2 from "@/components/CatalogArea/CatalogItems2";



export default function CatalogPage() {


    return (
            <>

                <CatalogItems2 type={'catalog'} id={'all'}/>
            </>
    )
}
