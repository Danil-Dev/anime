import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { darken } from "polished";
import { getColor, mode } from "@chakra-ui/theme-tools";
const baseStyle = defineStyle({
    boxSizing: 'border-box',
    fontWeight: 500,
    borderRadius: '12px',
    border: '1px solid transparent',
    outline: 'none',
    color: 'textPrimary',
    display: 'flex',
    textDecoration: 'none',
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
    maxW: '100%',
    _disabled: {
        opacity: "50%",
        cursor: "auto",
        pointerEvents: "none"
    },
});
const sizes = {
    sm: defineStyle({
        w: '120px',
        fontSize: '12px',
        p: '6px 12px',
        borderRadius: '8px',
    }),
    md: defineStyle({
        h: 'auto ',
        p: '12px 16px',
        fontSize: '14px',
        borderRadius: '10px',
    }),
    xl: defineStyle({
        p: '15px 16px',
        borderRadius: '12px'
    }),
    fullW: defineStyle({
        w: '100%',
    })
};
const primaryVariant = defineStyle((props) => {
    const { colorScheme: c, theme } = props;
    const color = getColor(theme, 'accentAction');
    const borderColor = darken(0.05, color);
    const activeBorderColor = darken(1, color);
    if (c === 'gray') {
        const bg = mode('accentTextLightPrimary', 'background')(props);
        const backgroundInteractive = getColor(theme, 'backgroundInteractive');
        const hoverColor = darken(0.05, backgroundInteractive);
        const activeColor = darken(0.1, backgroundInteractive);
        return {
            bg,
            color: 'textSecondary',
            _hover: {
                backgroundColor: hoverColor
            },
            _active: {
                backgroundColor: activeColor
            }
        };
    }
    return {
        backgroundColor: 'accentAction',
        fontSize: '20px',
        fontWeight: 600,
        padding: '8px 16px',
        color: 'accentTextLightPrimary',
        _focusVisible: {
            boxShadow: `0 0 0 1pt ${borderColor}`,
            backgroundColor: `${borderColor}`,
        },
        _hover: {
            backgroundColor: `${borderColor}`,
        },
        _active: {
            boxShadow: `0 0 0 1pt ${activeBorderColor}`,
            backgroundColor: `activeColor`,
        },
        _disabled: {
            backgroundColor: 'backgroundInteractive',
            color: 'textSecondary',
            cursor: 'auto',
            boxShadow: 'none',
            border: '1px solid transparent',
            outline: 'none',
        }
    };
});
const secondaryVariant = defineStyle((props) => {
    const { colorScheme: c } = props;
    return {
        border: '1px solid #376bad70',
        backgroundColor: 'transparent',
        fontSize: '16px',
        padding: '6px 10px',
        color: 'accentAction',
        borderRadius: '12px',
        _focusVisible: {
            boxShadow: '0 0 0 1pt #376bad70',
            border: '1px solid #869EFF',
        },
        _hover: {
            border: '1px solid #869EFF',
        },
        _active: {
            boxShadow: '0 0 0 1pt #376bad70',
            border: '1px solid #869EFF',
        },
        _disabled: {
            opacity: 'disabled',
            cursor: 'pointer',
        }
    };
});
const lightVariant = defineStyle((props) => {
    const { colorScheme: c } = props;
    return {
        backgroundColor: 'accentActionSoft',
        fontSize: '20px',
        fontWeight: 600,
        padding: '16px',
        color: 'accentAction',
        _focusVisible: {
            boxShadow: '0 0 0 1pt accentActionSoft',
            backgroundColor: 'accentActionSoft',
        },
        _hover: {
            backgroundColor: 'accentActionSoft',
        },
        _active: {
            boxShadow: '0 0 0 1pt accentActionSoft',
            backgroundColor: 'accentActionSoft',
        },
        _disabled: {
            opacity: 'disabled',
            _hover: {
                cursor: "auto",
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "1px solid transparent",
                outline: "none"
            }
        }
    };
});
const outlinedVariant = defineStyle((props) => {
    const { colorScheme: c } = props;
    if (c === 'gray') {
        return {
            borderRadius: '12',
            transition: '250',
            alignItems: 'center',
            color: 'textSecondary',
            _focusVisible: {
                backgroundColor: '#99A1BD14',
            },
            _active: {
                backgroundColor: '#99A1BD14',
            },
            _hover: {
                backgroundColor: '#99A1BD14',
            },
            _disabled: {
                opacity: 'disabled',
                cursor: 'auto'
            }
        };
    }
    if (c === 'purple-gradient') {
        return {
            color: 'accentTextLightSecondary',
            backgroundImage: 'radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%);',
            _focusVisible: {
                backgroundColor: '#99A1BD14',
            },
            _hover: {},
            _disabled: {
                opacity: 'disabled',
                cursor: 'auto'
            }
        };
    }
    if (c === 'search') {
        return {
            borderRadius: '12px',
            backgroundColor: 'searchBackground',
            borderColor: 'searchOutline',
            _before: {
                opacity: 0,
                transition: 'opacity .25s ease-out',
                bg: 'backgroundOutlinePink',
                border: '1px solid transparent',
                content: '" "',
                position: 'absolute',
                inset: '-1px',
                ['-webkit-mask']: 'linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                w: '100%',
                h: '100%',
                borderRadius: 'inherit'
            },
            _hover: {
                _before: {
                    opacity: 1
                }
            }
        };
    }
    return {
        border: '1px solid backgroundOutline',
        backgroundColor: 'transparent',
        color: 'textPrimary',
        _focusVisible: {
            boxShadow: '0 0 0 1pt textTertiary',
        },
        _hover: {
            backgroundColor: 'textTertiary',
        },
        _active: {
            boxShadow: '0 0 0 1pt textTertiary',
        },
        _disabled: {
            opacity: 'disabled',
            cursor: 'auto'
        }
    };
});
const emptyVariant = defineStyle((props) => {
    const { colorScheme: c } = props;
    return {
        backgroundColor: 'transparent',
        color: 'accentAction',
        display: 'flex',
        justify: 'center',
        alignItems: "center",
        _focusVisible: {
            textDecoration: 'underline'
        },
        _hover: {
            textDecoration: 'none'
        },
        _active: {
            textDecoration: 'none'
        },
        _disabled: {
            opacity: 'disabled',
            cursor: 'auto'
        }
    };
});
export const buttonTheme = defineStyleConfig({
    baseStyle,
    sizes,
    variants: {
        primary: primaryVariant,
        light: lightVariant,
        outlined: outlinedVariant,
        empty: emptyVariant,
        secondary: secondaryVariant
    }
});
