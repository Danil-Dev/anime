'use client'
import React, {useRef, useState} from "react";
import {Box, Flex} from "@chakra-ui/layout";
import {Link, Spacer, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {useParams} from "next/navigation";
import {Minus, Plus} from "react-feather";
import useSWR from "swr";
import {AnimeService} from "@/services/Anime";


type FilterType = "categories" | "audios" | "genres";

interface CatalogFilterProps {
  title: string,
  type: FilterType,
  defaultIsOpen?: boolean,
  current?: string
}

export default function CatalogFilter2({ title, type, defaultIsOpen, current}: CatalogFilterProps) {

  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen)
  const params = useParams()

  const {data, isLoading} = useSWR(type, AnimeService.getCatalogFilter)


  console.log ('Filter', data, isLoading)


  const toggleOpenFilter = () => {
    console.log('toggle')
    setIsOpen(!isOpen)
  }


  return (
    <Box
      bg={'background'}
      borderRadius={'8px'}
      borderColor={'backgroundOutline'}
      borderWidth={1}
    >
      <Flex
        align={'center'}
        p={'18px 18px 18px 26px'}
        cursor={'pointer'}
        borderColor={'backgroundOutline'}
        borderBottomWidth={isOpen ? 1 : 0}
        onClick={toggleOpenFilter}
        mb={isOpen ? '15px' : '0px'}
      >
        <Text as={'h3'} fontSize={'md'} m={0}>
          {title}
        </Text>
        <Spacer/>

        {isOpen ? <Minus size={18}/>: <Plus size={18}/>}

      </Flex>
      <Box
        transition={'all .3s ease-in-out'}
        visibility={isOpen ? 'visible' : 'hidden'}
        opacity={isOpen ? 1 : 0}
        height={isOpen && !isLoading ? 37 * data.length + 35 : 0}
        overflow={'hidden'}
        ref={contentRef}
      >

        {!isLoading ? data.length > 0 ? (


          data.map((item, index) => {

              const isActive = item.name === Object.values(params)[0]


              return(
                <Box
                  key={index}
                  fontSize={'lg'}
                  mb={'6px'}
                >
                  <Link
                    as={NextLink}
                    href={`/catalog/${type}/${item.name}`}
                    p={'5px 12px 5px 26px'}
                    borderRadius={'5px'}
                    display={'block'}
                    transition={'background-color .2s ease-in-out, color .2s ease-in-out'}
                    color={isActive? 'accentActive' : 'textSecondary'}
                    bg={isActive ? 'accentActionSoft' : 'transparent'}
                    _hover={{
                      color: 'accentActive',
                      bg: 'accentActionSoft'
                    }}
                  >{item.title}
                  </Link>
                </Box>
              )
            })
        ):
          <Box
            fontSize={'lg'}

            p={'0px 12px'}
          >
            <Text align={'center'}>No data</Text>
          </Box> : null}

      </Box>

    </Box>
  )
}