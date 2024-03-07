import {Box, Container, Flex, Heading} from "@chakra-ui/layout";


export default function PageLoader(){


  return (
    <Container maxW={'container.xl'}>
      <Flex minH={'30vh'} justifyContent={'center'}  alignItems={'center'}>

          <Heading>Loading</Heading>
      </Flex>
    </Container>
  )
}