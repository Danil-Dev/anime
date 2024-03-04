'use client'
import {signOut, useSession} from "next-auth/react";
import {Avatar, Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import NextLink from "next/link";
import {Bookmark, Clock, LogOut, Settings, User, UserPlus} from "react-feather";
import {Box} from "@chakra-ui/layout";

export default function AuthButton() {


    const session = useSession()


    console.log (session)

    return (
        <>
            {session?.data ? (
                <Menu>
                    <Box>
                        {
                            session.data.user.image ?
                              <MenuButton
                                cursor={'pointer'}
                                as={Avatar}
                                name={session.data.user.name}
                                src={`https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${session.data.user.image}/avatar`}
                              /> :
                              <MenuButton as={Avatar} bg='teal.500'/>
                        }
                    </Box>

                    <MenuList>
                            <MenuItem icon={<Clock/>} as={NextLink} href={'/profile/history'}>Історія</MenuItem>
                            <MenuItem icon={<Bookmark/>} as={NextLink} href={'/profile/watchlist'}>Закладки</MenuItem>
                            <MenuItem icon={<Settings size={18}/>} as={NextLink} href={'/profile/settings'}>Налаштування</MenuItem>
                            <MenuDivider/>
                            <MenuItem icon={<LogOut size={18}/>} as={NextLink} href={'/'}
                                onClick={() => signOut({
                                    callbackUrl: '/'
                                })}>
                                Вихід
                            </MenuItem>


                    </MenuList>
                </Menu>
            ) : (
                <Button as={NextLink} href={'/auth/login'} h={'48px'} variant={'primary'} colorScheme={'primary'}>Вхід</Button>
            )}

        </>
    );
}
