
import {Box, Container, Heading, VStack, Text, Flex} from "@chakra-ui/layout";
import Image from 'next/image'

export default function ProfileSettings() {
    return (
        <>
            <Container maxW="container.lg">
                <Box>
                    <VStack align={'left'}>

                        <Box>
                            <Heading>USER NAME</Heading>
                            <Text>subscribtion status</Text>
                        </Box>
                    </VStack>
                </Box>
                <Flex>
                    <Box>
                        <Flex>

                        </Flex>
                    </Box>
                    <Box>

                    </Box>
                </Flex>
            </Container>
        </>
    );
}