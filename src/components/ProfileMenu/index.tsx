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
            <Heading mb={'30px'}>Профіль</Heading>
            <ButtonGroup spacing={4} colorScheme={'gray'} variant={'outlined'} size={'lg'}>
                <Button as={NextLink} href={'/profile/watchlist'} isActive={pathname === '/profile/watchlist'}>
                    Закладки
                </Button>
                <Button as={NextLink} href={'/profile/history'} isActive={pathname === '/profile/history'}>
                    Історія
                </Button>
                <Button as={NextLink} href={'/profile/settings'} isActive={pathname === '/profile/settings'}>
                    Налаштування
                </Button>
            </ButtonGroup>
        </Container>
    )
}