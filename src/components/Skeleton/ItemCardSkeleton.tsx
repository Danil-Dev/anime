'use client';
import {Skeleton} from "@chakra-ui/react";
import {useRef} from "react";


export function ItemCardSkeleton(){

  const ref = useRef<HTMLDivElement | null>(null);
  console.log (ref.current)
  return(
    <>

        <Skeleton
          minH={{base: '260px', md: '300'}}
          height={ref.current ? ref.current.clientWidth / 3 * 4 : 'auto'}
          ref={ref}
          borderRadius={'lg'}
          fadeDuration={4}
          startColor={'backgroundOutline'}
          endColor={'stateOverlayHover'}
          speed={2}
        />


    </>
  )
}