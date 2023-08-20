'use client'
import {signOut, useSession} from "next-auth/react";
import {Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import NextLink from "next/link";
import {LogOut, Settings, User, UserPlus} from "react-feather";

export default function AuthButton() {


    const session = useSession()




    return (
        <>
            {session?.data ? (
                <Menu>
                    <MenuButton as={Button} variant={'primary'} leftIcon={<User/>} colorScheme={'primary'}>Profile</MenuButton>
                    <MenuList>
                            <MenuItem icon={<UserPlus/>} as={NextLink} href={'/profile/settings'}>Profile</MenuItem>
                            <MenuItem icon={<UserPlus/>} as={NextLink} href={'/profile/watchlist'}>Watchlist</MenuItem>
                            <MenuItem icon={<Settings size={18}/>} as={NextLink} href={'/profile/settings'}>Settings</MenuItem>
                            <MenuDivider/>
                            <MenuItem icon={<LogOut size={18}/>} as={NextLink} href={'/'}
                                onClick={() => signOut({
                                    callbackUrl: '/'
                                })}>
                                SignOut
                            </MenuItem>


                    </MenuList>
                </Menu>
            ) : (
                <Button as={NextLink} href={'/auth/login'} variant={'primary'} colorScheme={'primary'}>SignIn</Button>
            )}

        </>
    );
}
