'use client'
import {settingNav} from "@/routing";
import {Box, Link} from "@chakra-ui/layout";
import NextLink from "next/link";
import {usePathname} from "next/navigation";


export default function SettingsMenu(){

  const pathname = usePathname()

  console.log (pathname)
  return(
    <Box as={'nav'}>
      {
        settingNav.map((link) => {

          const isActive = pathname ==link.path
          return (
            <>
              <Box
                as={'li'}
                key={link.path}
                fontSize={18}
                color={isActive ? 'accentActive' : 'inherit'}
                mb={2}
                _hover={{
                  color: 'accentActive',
                  bg: 'accentActionSoft'
                }}
              >
                <Link display={'block'} p={4} as={NextLink} href={link.path}>{link.name}</Link>
              </Box>

            </>
          )


        } )
      }
    </Box>
  )
}