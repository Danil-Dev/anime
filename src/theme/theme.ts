import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import {darkTheme} from "@/theme/colors";
import {buttonTheme} from "@/components/Button";
import {opacities} from "@/theme/index";
import {defineStyle, defineStyleConfig} from "@chakra-ui/styled-system";

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

let isMobile = false;
if (typeof window !== "undefined") {
    // You would not use window directly in production try to abstract it
    // in other variable or prop
    isMobile = window.innerWidth < 480;
}


// 3. extend the theme
const theme = extendTheme({
    config,
    colors: darkTheme,
    opacities,
    sizes: {
        container: {
            xl: '1920px'
        }
    },
    components: {
        Button: buttonTheme,
        Container: defineStyleConfig({
            baseStyle: {
                paddingLeft: isMobile ? '0.5rem' : '3.75rem',
                paddingRight: isMobile ? '0.5rem' : '3.75rem',
            }
        })
    },
    fonts: {
        heading: 'var(--fort-russo-one)',
        body: 'var(--font-ubuntu)'
    },
    styles : {
        global: {
            body: {
                backgroundImage: 'radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0.2) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%)'
            }
        }
    }

})

export default theme