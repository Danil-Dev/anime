'use client'


import {Box, Skeleton, SkeletonText} from "@chakra-ui/react";

export function AnimeCardSkeleton({isLoading} : {isLoading: boolean}) {

    return(
        <Box w={'100%'}>
            <Skeleton
                h={'260px'}
                borderRadius={'lg'}
                fadeDuration={4}
                isLoaded={!isLoading}
                startColor={'backgroundOutline'}
                endColor={'stateOverlayHover'}
                speed={2}
            />
            <SkeletonText
                mt={2}
                ml={1}
                noOfLines={1}
                borderRadius={'lg'}
                spacing={0}
                skeletonHeight={3}
                isLoaded={!isLoading}
                w={'70%'}
                startColor={'backgroundOutline'}
                endColor={'stateOverlayHover'}
                speed={2}
            />
        </Box>
    )
}