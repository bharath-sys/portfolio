import React from "react";
import { Box } from "@chakra-ui/react";

/**
 * Terminal backdrop — three static painted layers, no JavaScript.
 *
 * Deliberately contains no canvas, no requestAnimationFrame, no blur filters
 * and no animation. Because nothing here ever changes, the browser paints it
 * once and the compositor reuses that layer for every scroll frame, which is
 * what keeps scrolling smooth on lower-powered machines.
 */
const TerminalBackdrop = () => (
  <>
    <Box aria-hidden className="bk-backdrop" />
    <Box aria-hidden className="bk-glowtop" />
    <Box aria-hidden className="bk-scanlines" />
  </>
);

export default React.memo(TerminalBackdrop);
