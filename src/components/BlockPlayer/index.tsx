import {Flex, Heading} from "@chakra-ui/layout";


export default function BlockPlayer(){


  return(
    <Flex
      w={'100%'}
      pos={'relative'}
      alignItems={'center'}
      justifyContent={'center'}
      background={'backgroundInteractive'}
      h={{base: '240px', md: '90vh'}}
      maxH={'90vh'}
      mt={{base:'70px', md: '0'}}
    >

      <Heading textAlign={'center'} fontSize={{base: '14px', md: '24px'}}>Нажаль плеєр доступний лише з території України</Heading>
    </Flex>
  )

}