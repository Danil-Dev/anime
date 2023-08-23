'use client';
import { Heading } from "@chakra-ui/layout";
import Breadcrumbs from "@/components/ Breadcrumbs/Breadcrumbs";
import React from "react";
export default function CatalogHead() {
    return (<>
                <Heading>
                    Каталог Аниме
                </Heading>
                <Breadcrumbs />
            </>);
}
