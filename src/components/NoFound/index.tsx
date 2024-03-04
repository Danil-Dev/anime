'use client'

import {Box, Container, Heading} from "@chakra-ui/layout";
import {AbsoluteCenter} from "@chakra-ui/react";



export default function NoFound({ text }: { text: string }) {


  return(
    <Container maxW={'container.xl'}>
      <AbsoluteCenter>
        <Box textAlign={'center'}>
          <Heading
            fontSize={'64px'}
            sx={{
              fontFamily: 'var(--font-rubik-mono-one)',
            }}
          >
            404
          </Heading>
          <Heading>{text}</Heading>
        </Box>


      </AbsoluteCenter>
    </Container>
  )
}