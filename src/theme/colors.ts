import {opacify} from "@/utils/opacity";


export const colors = {

    white: '#FFFFFF',
    black: '#000000',
    gray: {
        50: '#F5F6FC',
        100: '#E8ECFB',
        150: '#D2D9EE',
        200: '#B8C0DC',
        250: '#A6AFCA',
        300: '#98A1C0',
        350: '#888FAB',
        400: '#7780A0',
        450: '#6B7594',
        500: '#5D6785',
        550: '#505A78',
        600: '#404A67',
        650: '#333D59',
        700: '#293249',
        750: '#1B2236',
        800: '#131A2A',
        850: '#0E1524',
        900: '#0D111C',
        950: '#080B11',
    },
    pink: {
        50: '#F9ECF1',
        100: '#FFD9E4',
        200: '#FBA4C0',
        300: '#FF6FA3',
        400: '#FB118E',
        500: '#C41969',
        600: '#8C0F49',
        700: '#55072A',
        800: '#350318',
        900: '#2B000B',
        'vibrant': '#F51A70',
    },
    red: {
        50: '#FAECEA',
        100: '#FED5CF',
        200: '#FEA79B',
        300: '#FD766B',
        400: '#FA2B39',
        500: '#C4292F',
        600: '#891E20',
        700: '#530F0F',
        800: '#380A03',
        900: '#240800',
        'vibrant': '#F14544',
    },
    yellow: {
        50: '#F6F2D5',
        100: '#DBBC19',
        200: '#DBBC19',
        300: '#BB9F13',
        400: '#A08116',
        500: '#866311',
        600: '#5D4204',
        700: '#3E2B04',
        800: '#231902',
        900: '#180F02',
        'vibrant': '#FAF40A',
    },
    green: {
        50: '#E3F3E6',
        100: '#BFEECA',
        200: '#76D191',
        300: '#40B66B',
        400: '#209853',
        500: '#0B783E',
        600: '#0C522A',
        700: '#053117',
        800: '#091F10',
        900: '#09130B',
        'vibrant': '#5CFE9D',
    },
    blue: {
        50: '#EDEFF8',
        100: '#DEE1FF',
        200: '#ADBCFF',
        300: '#869EFF',
        400: '#4C82FB',
        500: '#1267D6',
        600: '#1D4294',
        700: '#09265E',
        800: '#0B193F',
        900: '#040E34',
        'vibrant': '#587BFF',
    },
    magenta: {
        300: '#FD82FF',
        vibrant: '#FC72FF',
    },
    purple: {
        300: '#8440F2',
        900: '#1C0337',
        vibrant: '#6100FF',
    }
}


export const darkTheme = {

    ...colors,

    textPrimary: colors.white,
    textYellow: colors.yellow["100"],
    textSecondary: colors.gray["300"],
    textTertiary: colors.gray["500"],

    accentAction: colors.blue["400"],
    accentActive: colors.blue["400"],
    accentSuccess: colors.green["200"],
    accentWarning: '#EEB317',
    accentFailure: colors.red["300"],
    accentCritical: colors.red["300"],
    backgroundHeader: opacify(0.7, colors.white),
    background: colors.gray["800"],
    backgroundAccent: colors.blue['600'],
    backgroundBackdrop: colors.gray["950"],
    backgroundSurface: colors.gray["900"],
    backgroundModule: colors.gray["800"],
    backgroundInteractive: colors.gray["700"],
    backgroundFloating: opacify(12, colors.black),
    backgroundInteractiveFloating: opacify(56, colors.gray["500"]),
    backgroundOutline: opacify(24, colors.gray["300"]),
    sliderBackground: opacify(36, colors.gray["500"]),
    backgroundScrim: opacify(72, colors.gray["900"]),
    backgroundScrolledSurface: opacify(72, colors.gray["900"]),
    backgroundOutlinePink: opacify(24,'#9646FA'),
    backgroundOutlineBlack: opacify(60, colors.black),
    accentActionSoft: opacify(24, colors.blue["400"]),
    accentActiveSoft: opacify(24, colors.blue["400"]),
    accentSuccessSoft: opacify(24, colors.green["400"]),
    accentWarningSoft: opacify(24, '#EEB317'),
    accentFailureSoft: opacify(12, colors.red["300"]),
    accentTextDarkPrimary: opacify(80, colors.gray["900"]),
    accentTextDarkSecondary: opacify(60, colors.gray["900"]),
    accentTextDarkTertiary: opacify(24, colors.gray["900"]),

    accentTextLightPrimary: colors.gray["50"],
    accentTextLightSecondary: opacify(72, colors.gray["50"]),
    accentTextLightTertiary: opacify(12, colors.gray["50"]),


    deepShadow: '12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);',
    shallowShadow: '4px 4px 10px rgba(0, 0, 0, 0.24), 2px 2px 4px rgba(0, 0, 0, 0.12), 1px 2px 2px rgba(0, 0, 0, 0.12);',

    stateOverlayHover: opacify(8, colors.gray["300"]),
    stateOverlayPressed: opacify(24, colors.gray["200"]),

    searchBackground: `rgba(255,255,255,0.07)`,
    searchOutline: `rgba(255,255,255,0.07)`,


    brandedGradient: 'linear-gradient(139.57deg, #FF79C9 4.35%, #FFB8E2 96.44%);',
    promotionalGradient: 'radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%);',

    hoverState: opacify(24, colors.blue["200"]),
    hoverDefault: opacify(8, colors.gray["300"]),
}