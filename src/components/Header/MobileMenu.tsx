'use client'

import {Hide, Link} from "@chakra-ui/react";
import {Box, Container, Flex, Text} from "@chakra-ui/layout";
import {Film, Home, User} from "react-feather";
import NextLink from "next/link";

export default function MobileMenu() {

    return (
        <Hide breakpoint='(min-width: 760px)'>
            <Box
              position={'fixed'}
              bottom={0}
              left={0}
              w={'100%'}
              minH={'60px'}
              py={'10px'}
              zIndex={'100'}
              background={'backgroundSurface'}
            >
              <Container maxW={'container.xl'}>
                <Flex
                  as={'nav'}
                  alignItems={"center"}
                  h={'100%'}
                  justifyContent={'space-around'}
                >
                  <Box
                    as={'li'}
                  >
                    <Link
                      href={'/'}
                      as={NextLink}
                      display={'inline-flex'}
                      flexDir={'column'}
                      alignItems={'center'}
                    >
                      <Home size={24}/>

                      <Text fontSize={'12px'} m={0}> Головна</Text>
                    </Link>

                  </Box>
                  <Box
                    as={'li'}
                  >

                    <Link
                      href={'/catalog'}
                      as={NextLink}
                      display={'inline-flex'}
                      flexDir={'column'}
                      alignItems={'center'}
                    >
                      <Film size={24}/>
                      <Text fontSize={'12px'} m={0}> Каталог</Text>
                    </Link>


                  </Box>
                  <Box
                    as={'li'}
                  >

                    <Link
                      href={'/profile/history'}
                      as={NextLink}
                      display={'inline-flex'}
                      flexDir={'column'}
                      alignItems={'center'}
                    >
                      <User size={24}/>
                      <Text fontSize={'12px'} m={0}> Профіль</Text>
                    </Link>

                  </Box>
                </Flex>
              </Container>

            </Box>

        </Hide>
    )
}