import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const { colorMode } = useColorMode();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Gradient colors based on theme
        const getGradientColors = () => {
            if (colorMode === 'dark') {
                return [
                    { r: 15, g: 23, b: 42 },    // Deep blue
                    { r: 88, g: 28, b: 135 },   // Purple
                    { r: 0, g: 113, b: 227 },   // Apple blue
                ];
            } else {
                return [
                    { r: 219, g: 234, b: 254 }, // Light blue
                    { r: 233, g: 213, b: 255 }, // Light purple
                    { r: 254, g: 226, b: 226 }, // Light pink
                ];
            }
        };

        const animate = () => {
            time += 0.003;

            const colors = getGradientColors();
            const width = canvas.width;
            const height = canvas.height;

            // Create gradient mesh
            const gradient = ctx.createRadialGradient(
                width / 2 + Math.sin(time) * 200,
                height / 2 + Math.cos(time) * 200,
                0,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.8
            );

            // Animate gradient colors
            const color1 = colors[0];
            const color2 = colors[1];
            const color3 = colors[2];

            const alpha = colorMode === 'dark' ? 0.4 : 0.3;

            gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(${color3.r}, ${color3.g}, ${color3.b}, ${alpha * 0.3})`);

            // Clear and draw
            ctx.fillStyle = colorMode === 'dark' ? '#000000' : '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Add secondary gradient for depth
            const gradient2 = ctx.createRadialGradient(
                width / 2 - Math.sin(time * 0.7) * 300,
                height / 2 - Math.cos(time * 0.7) * 300,
                0,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.6
            );

            gradient2.addColorStop(0, `rgba(${color3.r}, ${color3.g}, ${color3.b}, ${alpha * 0.5})`);
            gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colorMode]);

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            zIndex={-1}
            pointerEvents="none"
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            />
        </Box>
    );
};

export default AnimatedBackground;
