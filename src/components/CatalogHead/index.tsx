'use client'
import {Container, Heading, Box} from "@chakra-ui/layout";
import Breadcrumbs from "@/components/ Breadcrumbs/Breadcrumbs";
import React from "react";
import {usePathname} from "next/navigation";




export default function CatalogHead() {




    return (
            <>
                <Heading>
                    Каталог Аниме
                </Heading>
                <Breadcrumbs />
            </>
    )


}