'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'
import {Box, Container, Flex, Heading, Text} from "@chakra-ui/react";


export default function MainBanner () {


    return (
        <Box
            h={'80vh'}
            bgRepeat={'no-repeat'}
            w={'100%'}
            bgImage={'/assets/img/banner/anime_bg2.jpg'}
            bgSize={'cover'}
            bgPosition={'center center'}
            mt={'-140px'}
        >
            <Container maxW={'container.xl'} h={'100%'}>
                <Flex h={'100%'} pt={'140px'}  alignItems={'center'} >
                    <Box w={'50%'}  mt={'25px'}>
                        <Heading
                            size={'3xl'}
                            bgGradient={'linear(to-b, #CFE7fA, #9646fa)'}
                            bgClip={'text'}
                            mb={'10px'}
                            sx={{
                                fontFamily: 'var(--font-rubik-mono-one)',
                            }}
                        >
                            Aniverse
                        </Heading>
                        <Heading size={'sm'}>
                            Дивіться аніме українською
                        </Heading>
                    </Box>
                </Flex>
            </Container>

        </Box>
    )
}