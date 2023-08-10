'use client'
import {ReactNode} from "react";
import {ReduxProvider} from "@/providers/ReduxProvider";
import {ShakaProvider} from "@/lib/dshaka-player/components/ShakaProvider";
import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "@/theme/theme";






export function Providers({
    children
}: {
    children: ReactNode
} ){
    return(

        <ReduxProvider>
            <ShakaProvider>
                <CacheProvider>
                    <ChakraProvider theme={theme}>
                        {children}
                    </ChakraProvider>
                </CacheProvider>
            </ShakaProvider>
        </ReduxProvider>
    )
}