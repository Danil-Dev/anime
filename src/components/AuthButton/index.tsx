'use client'
import {signOut, useSession} from "next-auth/react";
import {Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import NextLink from "next/link";
import {Bookmark, Clock, LogOut, Settings, User, UserPlus} from "react-feather";

export default function AuthButton() {


    const session = useSession()




    return (
        <>
            {session?.data ? (
                <Menu>
                    <MenuButton
                      as={IconButton}
                      variant={'primary'}
                      icon={<User/>}
                      colorScheme={'primary'}
                      p={2}
                    />
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
                <Button as={NextLink} href={'/auth/login'} variant={'primary'} colorScheme={'primary'}>Вхід</Button>
            )}

        </>
    );
}
