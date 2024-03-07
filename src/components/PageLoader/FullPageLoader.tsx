import {Box} from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";


export default function FullPageLoader(){

  return (
    <Box
      position={'fixed'}
      top={0}
      left={0}
      width={'100%'}
      height={'100vh'}
      background={'background'}
      backgroundImage={'radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0.2) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%)'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      zIndex={'99999'}
    >
      <Image src={'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/4097df10-e154-4cef-4a4e-2a3cbbf4ba00/avatar'} alt={'Logo'} width={170} height={170} />
    </Box>
  )
}