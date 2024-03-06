import {ReactNode} from "react";
import {Box, Container, Flex, Grid, GridItem, Heading, Link, Text} from "@chakra-ui/layout";
import {settingNav} from "@/routing";

import NextLink from "next/link";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import Avatar from "@/components/Avatar";
import SettingsMenu from "@/components/SettingsMenu";


export default async function SettingsLayout({children}: {children: ReactNode}){

  const session = await getServerSession(authOptions)
  console.log (session)

  return(
    <Container maxW={'container.xl'}>

      <Flex alignItems={'center'}  gap={4} mb={10}>
        <Box ml={4}>
          <Avatar user={session.user}/>
        </Box>
        <Box>
          <Heading>{session.user.name}</Heading>
          <Text mb={0}>Free plan</Text>
        </Box>
      </Flex>

      <Grid templateColumns={'1fr 3fr'} gap={10}>
        <GridItem>
          <Heading
            pl={4}
            fontSize={22}
            mb={4}
          >Основні налаштування</Heading>
          <SettingsMenu/>
        </GridItem>
        <GridItem>
          {children}
        </GridItem>
      </Grid>
    </Container>
  )
}