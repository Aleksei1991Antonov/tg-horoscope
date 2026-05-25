import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface HeartFireworkRef {
    explode: (x: number, y: number) => void;
    dissolve: (rect: DOMRect) => void;
}

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    alpha: number;
    life: number;
    decay: number;
    color: string;
    delay: number;
    twinkle: number;
}

const StardustEffect = forwardRef<HeartFireworkRef>((_, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);

    const createParticle = (x: number, y: number, delay = 0): Particle => {
        const colors = ['#FFB5C5', '#FFD4A8', '#E8C4FF', '#B5D8FF', '#FFFFFF'];

        return {
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            size: Math.random() * 2.5 + 0.8,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: Math.random() * -1.8 - 0.5,
            alpha: 0,
            life: 1,
            decay: Math.random() * 0.015 + 0.008,
            delay,
            color: colors[Math.floor(Math.random() * colors.length)],
            twinkle: Math.random() * 0.1 + 0.02,
        };
    };

    const animate = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];

            if (p.delay > 0) {
                p.delay -= 16;
                continue;
            }

            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= p.decay;
            p.alpha = Math.max(0, p.life * (0.6 + Math.sin(Date.now() * p.twinkle) * 0.4));

            if (p.life <= 0) {
                particles.current.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (particles.current.length > 0) {
            animationFrameId.current = requestAnimationFrame(animate);
        } else {
            animationFrameId.current = null;
        }
    };

    useImperativeHandle(ref, () => ({
        explode(x, y) {
            for (let i = 0; i < 25; i++) particles.current.push(createParticle(x, y, Math.random() * 100));
            if (!animationFrameId.current) requestAnimationFrame(animate);
        },
        dissolve(rect) {
            for (let i = 0; i < 80; i++) {
                const randomX = rect.left + Math.random() * rect.width;
                const randomY = rect.top + Math.random() * rect.height;
                const delay = Math.random() * 500;
                particles.current.push(createParticle(randomX, randomY, delay));
            }
            if (!animationFrameId.current) requestAnimationFrame(animate);
        }
    }));

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();
        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[200]" />;
});

StardustEffect.displayName = 'StardustEffect';
export default StardustEffect;