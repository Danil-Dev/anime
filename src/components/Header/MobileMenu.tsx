'use client'

import {Hide} from "@chakra-ui/react";
import {Box, Container, Flex, Text} from "@chakra-ui/layout";
import {Film, Home, User} from "react-feather";

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
                  alignItems={"center"}
                  h={'100%'}
                  justifyContent={'space-around'}
                >
                  <Box
                    flexDir={'column'}
                    alignItems={'center'}
                    display={"flex"}
                  >
                    <Home size={24}/>
                    <Text fontSize={'12px'} m={0}> Home</Text>
                  </Box>
                  <Box
                    flexDir={'column'}
                    alignItems={'center'}
                    display={"flex"}
                  >
                    <Film size={24}/>
                    <Text fontSize={'12px'} m={0}> Catalog</Text>
                  </Box>
                  <Box
                    flexDir={'column'}
                    alignItems={'center'}
                    display={"flex"}
                  >
                    <User size={24}/>
                    <Text fontSize={'12px'} m={0}> Profile</Text>
                  </Box>
                </Flex>
              </Container>

            </Box>

        </Hide>
    )
}