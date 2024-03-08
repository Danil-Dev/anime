'use client'
import {AnimeHistory2} from "@/services/User";
import {Swiper, SwiperSlide} from "swiper/react";
import HistoryCard from "@/components/AnimeCard/HistoryCard";
import {Box, Container, Flex, Spacer} from "@chakra-ui/layout";
import {Button, Heading} from "@chakra-ui/react";
import {ChevronRight} from "react-feather";
import NextLink from "next/link";


export default function HistoryListLanding({ historyList } : { historyList : AnimeHistory2[] }) {



  return(

    <Container maxW={'container.xl'}>
      <Flex align={'center'} pb={25}>
        <Box>
          <Heading size={'xl'} mb={0}>Продовжити перегляд</Heading>
        </Box>
        <Spacer/>
        <Box>
          <Button
            variant={'primary'}
            colorScheme={'blue'}
            rightIcon={<ChevronRight size={14}/>}
            as={NextLink}
            href={'/profile/history'}
            size={'md'}
            display={{base: 'none', md: 'block'}}
          >
            Історія
          </Button>
        </Box>
      </Flex>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={15}
      >
        { historyList.map((historyItem, idx) => (

          <SwiperSlide style={{maxWidth: '300px'}} key={idx}>
            <Box maxW={'300px'}>
              <HistoryCard historyItem={historyItem}/>
            </Box>

          </SwiperSlide>
        ) )}
      </Swiper>
      <Button
        variant={'primary'}
        colorScheme={'blue'}
        rightIcon={<ChevronRight size={18}/> }
        as={NextLink}
        href={'/profile/history'}
        justifySelf={'center'}
        display={{base: 'flex', md: 'none'}}
        mt={10}
      >
        Історія
      </Button>
    </Container>

  )
}