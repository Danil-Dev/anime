'use client'
import {Button, ButtonGroup, Container, Flex, Heading} from "@chakra-ui/react";
import {useParams, usePathname} from "next/navigation";
import NextLink from "next/link";


export default function ProfileMenu() {

    const pathname = usePathname()

    console.log(pathname)

    return (
        <Container
            maxW={'container.xl'}
            centerContent
            pt={50}
            pb={50}
        >
            <Heading mb={'30px'}>Profile</Heading>
            <ButtonGroup spacing={4} colorScheme={'gray'} variant={'outlined'} size={'lg'}>
                <Button as={NextLink} href={'/profile/watchlist'} isActive={pathname === '/profile/watchlist'}>
                    Watchlist
                </Button>
                <Button as={NextLink} href={'/profile/history'} isActive={pathname === '/profile/history'}>
                    History
                </Button>
                <Button as={NextLink} href={'/profile/settings'} isActive={pathname === '/profile/settings'}>
                    Settings
                </Button>
            </ButtonGroup>
        </Container>
    )
}