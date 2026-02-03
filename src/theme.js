// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9",
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
        },
        apple: {
            gray: {
                50: "#f5f5f7",
                100: "#e8e8ed",
                200: "#d2d2d7",
                300: "#b0b0b5",
                400: "#86868b",
                500: "#6e6e73",
                600: "#515154",
                700: "#424245",
                800: "#1d1d1f",
                900: "#000000",
            }
        }
    },
    fonts: {
        heading: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        body: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        mono: "'SF Mono', 'Menlo', monospace",
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode("#ffffff", "#000000")(props),
                color: mode("#1d1d1f", "#f5f5f7")(props),
                fontSize: "17px",
                lineHeight: "1.47059",
                transition: "background-color 0.3s ease, color 0.3s ease",
            },
        }),
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "980px",
                fontWeight: "400",
                transition: "all 0.3s ease",
            },
            variants: {
                apple: {
                    bg: "#0071e3",
                    color: "white",
                    fontSize: "17px",
                    px: 6,
                    py: 3,
                    _hover: {
                        bg: "#0077ed",
                    },
                },
            },
        },
        Card: {
            baseStyle: (props) => ({
                container: {
                    bg: mode("rgba(0, 0, 0, 0.02)", "rgba(255, 255, 255, 0.03)")(props),
                    backdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid",
                    borderColor: mode("rgba(0, 0, 0, 0.08)", "rgba(255, 255, 255, 0.08)")(props),
                    borderRadius: "18px",
                    transition: "all 0.3s ease",
                },
            }),
        },
        Skeleton: {
            baseStyle: (props) => ({
                startColor: mode("rgba(0, 0, 0, 0.05)", "rgba(255, 255, 255, 0.05)")(props),
                endColor: mode("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")(props),
            }),
        },
    },
});

export default theme;
