'use client'
import {Box, Container, Heading, VStack, Text, Flex} from "@chakra-ui/layout";
import {useSession} from "next-auth/react";
import {Avatar} from "@chakra-ui/react";

export  default function ProfileSettings() {

    const session = useSession()

  console.log ('Session', session)

    return (
        <>
            <Container maxW="container.lg">
              {
                session.status === 'authenticated' && (
                  <Flex alignItems={'center'} gap={4}>
                    <Box>
                      {
                        session.data.user.image ?
                          <Avatar size="xl" name={session.data.user.name} src={`https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${session.data.user.image}/avatar`}/>:
                          <Avatar size="xl" bg='teal.500'/>
                      }
                    </Box>


                    <Box>
                      <Heading>{session.data.user.name}</Heading>
                      <Text mb={0}>subscribtion status</Text>
                    </Box>
                  </Flex>
                )
              }

            </Container>
        </>
    );
}