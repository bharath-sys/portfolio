import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

const CursorMesh = () => {
    const canvasRef = useRef(null);
    const { colorMode } = useColorMode();
    const mousePos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            mousePos.current.x = lerp(mousePos.current.x, targetPos.current.x, 0.15);
            mousePos.current.y = lerp(mousePos.current.y, targetPos.current.y, 0.15);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // More visible professional glow
            const gradient = ctx.createRadialGradient(
                mousePos.current.x,
                mousePos.current.y,
                0,
                mousePos.current.x,
                mousePos.current.y,
                200
            );

            if (colorMode === 'dark') {
                gradient.addColorStop(0, 'rgba(0, 113, 227, 0.15)');
                gradient.addColorStop(0.5, 'rgba(0, 113, 227, 0.08)');
                gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(0, 113, 227, 0.12)');
                gradient.addColorStop(0.5, 'rgba(0, 113, 227, 0.06)');
                gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add secondary layer for more visibility
            const gradient2 = ctx.createRadialGradient(
                mousePos.current.x,
                mousePos.current.y,
                0,
                mousePos.current.x,
                mousePos.current.y,
                120
            );

            if (colorMode === 'dark') {
                gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
                gradient2.addColorStop(1, 'rgba(168, 85, 247, 0)');
            } else {
                gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
                gradient2.addColorStop(1, 'rgba(168, 85, 247, 0)');
            }

            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
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
            zIndex={0}
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

export default CursorMesh;
