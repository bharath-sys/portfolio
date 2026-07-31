// theme.js — BK design system (neo-brutalist / terminal-dev)
import { extendTheme } from "@chakra-ui/react";

/**
 * Colour is driven by CSS custom properties defined in index.css so that both
 * Chakra components and raw CSS stay in sync across color modes.
 * Use `var(--fg)`, `var(--line)`, `var(--acid)` etc. directly in sx/props.
 */

export const ACID = "var(--acid)";
export const ACID_INK = "var(--acid-ink)";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  fonts: {
    heading: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },

  colors: {
    acid: {
      50: "#fbffe6",
      100: "#f4ffb8",
      200: "#eaff85",
      300: "#ddff4d",
      400: "#ccff00",
      500: "#b8e600",
      600: "#93b800",
      700: "#6e8a00",
      800: "#4a5c00",
      900: "#252e00",
    },
    violet: {
      400: "#9d85ff",
      500: "#7c5cff",
      600: "#5f3fe0",
    },
    ink: {
      900: "#08080a",
      800: "#0d0d10",
      700: "#141418",
    },
  },

  radii: {
    none: "0px",
    sm: "2px",
    base: "3px",
    md: "4px",
    lg: "6px",
    xl: "8px",
    "2xl": "10px",
    full: "9999px",
  },

  shadows: {
    hard: "var(--shadow-hard)",
    acid: "0 0 0 1px var(--acid), 0 0 32px var(--glow)",
    lift: "0 24px 60px -24px rgba(0,0,0,0.65)",
  },

  styles: {
    global: {
      "html, body": {
        bg: "var(--bg)",
        color: "var(--fg)",
      },
      "#root": {
        position: "relative",
        minHeight: "100vh",
      },
    },
  },

  textStyles: {
    // Small uppercase mono label — the workhorse of this design language
    label: {
      fontFamily: "var(--font-mono)",
      fontSize: { base: "10px", md: "11px" },
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-mute)",
    },
    display: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      lineHeight: 0.92,
      letterSpacing: "-0.045em",
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: "-0.035em",
      textTransform: "uppercase",
    },
    body: {
      fontFamily: "var(--font-body)",
      fontSize: { base: "15px", md: "16px" },
      lineHeight: 1.65,
      color: "var(--fg-dim)",
    },
    mono: {
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      letterSpacing: "-0.01em",
    },
  },

  layerStyles: {
    panel: {
      bg: "var(--surface)",
      border: "1px solid",
      borderColor: "var(--line)",
      borderRadius: "3px",
      transition: "all .4s var(--ease-out)",
    },
    panelHover: {
      bg: "var(--surface)",
      border: "1px solid",
      borderColor: "var(--line)",
      borderRadius: "3px",
      transition: "all .4s var(--ease-out)",
      _hover: {
        borderColor: "var(--line-strong)",
        bg: "var(--surface-2)",
        transform: "translateY(-3px)",
      },
    },
    inverted: {
      bg: "var(--acid)",
      color: "var(--acid-ink)",
    },
  },

  components: {
    Button: {
      baseStyle: {
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: "2px",
        transition: "all .3s var(--ease-out)",
        _focusVisible: { boxShadow: "none", outline: "2px solid var(--acid)" },
      },
      sizes: {
        sm: { fontSize: "11px", h: "36px", px: 4 },
        md: { fontSize: "12px", h: "44px", px: 6 },
        lg: { fontSize: "13px", h: "54px", px: 8 },
      },
      variants: {
        acid: {
          bg: "var(--acid)",
          color: "var(--acid-ink)",
          border: "1px solid var(--acid)",
          _hover: {
            bg: "transparent",
            color: "var(--accent-text)",
            transform: "translate(-2px,-2px)",
            boxShadow: "4px 4px 0 0 var(--acid)",
          },
          _active: { transform: "translate(0,0)", boxShadow: "none" },
        },
        outline: {
          bg: "transparent",
          color: "var(--fg)",
          border: "1px solid",
          borderColor: "var(--line-2)",
          _hover: {
            bg: "var(--acid)",
            color: "var(--acid-ink)",
            borderColor: "var(--acid)",
          },
          _active: { transform: "scale(.98)" },
        },
        ghost: {
          color: "var(--fg-dim)",
          _hover: { bg: "var(--surface-2)", color: "var(--fg)" },
        },
      },
      defaultProps: { variant: "outline", size: "md" },
    },

    Modal: {
      baseStyle: {
        dialog: {
          bg: "var(--bg-alt)",
          color: "var(--fg)",
          border: "1px solid",
          borderColor: "var(--line-2)",
          borderRadius: "4px",
          boxShadow: "0 40px 120px -30px rgba(0,0,0,.8)",
        },
        overlay: {
          bg: "rgba(0,0,0,.72)",
          backdropFilter: "blur(10px) saturate(140%)",
        },
        header: {
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        },
        closeButton: {
          borderRadius: "2px",
          _hover: { bg: "var(--acid)", color: "var(--acid-ink)" },
        },
      },
    },

    Input: {
      variants: {
        brutal: {
          field: {
            bg: "var(--surface)",
            border: "1px solid",
            borderColor: "var(--line)",
            borderRadius: "2px",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--fg)",
            _placeholder: { color: "var(--fg-mute)" },
            _hover: { borderColor: "var(--line-2)" },
            _focus: {
              borderColor: "var(--acid)",
              boxShadow: "0 0 0 1px var(--acid)",
            },
          },
        },
      },
      defaultProps: { variant: "brutal" },
    },

    Textarea: {
      variants: {
        brutal: {
          bg: "var(--surface)",
          border: "1px solid",
          borderColor: "var(--line)",
          borderRadius: "2px",
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          color: "var(--fg)",
          _placeholder: { color: "var(--fg-mute)" },
          _hover: { borderColor: "var(--line-2)" },
          _focus: {
            borderColor: "var(--acid)",
            boxShadow: "0 0 0 1px var(--acid)",
          },
        },
      },
      defaultProps: { variant: "brutal" },
    },

    Skeleton: {
      baseStyle: { borderRadius: "2px" },
    },

    Tooltip: {
      baseStyle: {
        bg: "var(--fg)",
        color: "var(--bg)",
        borderRadius: "2px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        px: 3,
        py: 1.5,
      },
    },
  },
});

export default theme;
