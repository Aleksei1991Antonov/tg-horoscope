import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { storage } from '../utils/storage';

interface LockScreenProps {
    channelUrl: string;
    fontScale: 'small' | 'medium' | 'large';
    isRetrying: boolean;
    onRetry: () => void;
}

const MIN_CHECK_MS = 1500;
const RESET_AFTER_MS = 30 * 60 * 1000;

const getRetryCount = (): number => {
    try {
        const now = Date.now();
        const local = parseInt(storage.getItem('astro_retry_count') || '0', 10);
        const session = parseInt(sessionStorage.getItem('astro_retry_count') || '0', 10);
        const count = Math.max(local, session);

        const localTime = parseInt(storage.getItem('astro_retry_time') || '0', 10);
        const sessionTime = parseInt(sessionStorage.getItem('astro_retry_time') || '0', 10);
        const lastTime = Math.max(localTime, sessionTime);

        if (lastTime > 0 && now - lastTime > RESET_AFTER_MS) return 0;
        return count;
    } catch { return 0; }
};

const incrementRetryCount = () => {
    try {
        const now = Date.now();
        const local = parseInt(storage.getItem('astro_retry_count') || '0', 10);
        const session = parseInt(sessionStorage.getItem('astro_retry_count') || '0', 10);
        const localTime = parseInt(storage.getItem('astro_retry_time') || '0', 10);
        const sessionTime = parseInt(sessionStorage.getItem('astro_retry_time') || '0', 10);

        let count = Math.max(local, session);
        const lastTime = Math.max(localTime, sessionTime);

        if (lastTime > 0 && now - lastTime > RESET_AFTER_MS) count = 0;

        count = Math.min(count + 1, 10);
        const ts = now.toString();

        storage.setItem('astro_retry_count', count.toString());
        storage.setItem('astro_retry_time', ts);
        sessionStorage.setItem('astro_retry_count', count.toString());
        sessionStorage.setItem('astro_retry_time', ts);
    } catch {}
};

const getCooldown = (): number => {
    const count = getRetryCount() + 1;
    if (count <= 5) return 10;
    if (count <= 10) return 30;
    return 60;
};

const LockScreen: React.FC<LockScreenProps> = ({ channelUrl, fontScale, isRetrying, onRetry }) => {
    const handleSubscribe = () => {
        window.Telegram?.WebApp?.openLink(channelUrl);
    };

    const [cooldown, setCooldown] = useState(0);
    const [showFailFeedback, setShowFailFeedback] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showBar, setShowBar] = useState(false);
    const checkStart = useRef(0);
    const hasRetried = useRef(false);

    useEffect(() => {
        if (isRetrying) {
            hasRetried.current = true;
            setShowFailFeedback(false);
            checkStart.current = Date.now();
            setProgress(0);
            setShowBar(true);

            const frame = () => {
                const elapsed = Date.now() - checkStart.current;
                const pct = Math.min(elapsed / MIN_CHECK_MS, 0.9);
                setProgress(pct);
                if (pct < 0.9) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
        } else if (hasRetried.current) {
            const elapsed = Date.now() - checkStart.current;
            const remaining = Math.max(0, MIN_CHECK_MS - elapsed);

            const finish = () => {
                setProgress(1);
                setTimeout(() => { setShowBar(false); setShowFailFeedback(true); }, 350);
            };

            if (remaining > 0) {
                const t = setTimeout(finish, remaining);
                return () => clearTimeout(t);
            } else {
                finish();
            }
        }
    }, [isRetrying]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => setCooldown(c => c - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleRetry = () => {
        if (cooldown > 0 || isRetrying) return;
        incrementRetryCount();
        setCooldown(getCooldown());
        onRetry();
    };

    const s = fontScale === 'small' ? 1 : fontScale === 'medium' ? 1.15 : 1.3;

    return (
        <div className="fixed inset-0 z-[9999] bg-[var(--c-bg)] flex flex-col items-center justify-center px-8 overflow-hidden">

            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-[var(--c-primary-10)] blur-[7.5rem] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-[var(--c-secondary-10)] blur-[7.5rem] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-xs">

                <div
                    className="mb-6 leading-none select-none"
                    style={{ fontSize: `${3.5 * s}rem` }}
                >
                    ✨
                </div>

                <div className="w-full mb-3 flex items-center justify-center">
                    <h1
                        className="text-[var(--c-text)] font-black uppercase tracking-tighter text-center transition-opacity duration-300"
                        style={{ fontSize: `${1.75 * s}rem`, opacity: isRetrying ? 0.4 : 1 }}
                    >
                        Прогноз готов
                    </h1>
                </div>

                <div className="w-full mb-8 flex items-center justify-center">
                    <p
                        className="text-[var(--c-text-40)] font-medium text-center leading-relaxed transition-opacity duration-300"
                        style={{ fontSize: `${0.938 * s}rem`, opacity: isRetrying ? 0.4 : 1 }}
                    >
                        Подпишитесь на канал, чтобы открыть доступ к ежедневным гороскопам
                    </p>
                </div>

                <button
                    onClick={handleSubscribe}
                    className="w-full py-[1.15rem] rounded-[1.5rem] flex items-center justify-center gap-[0.75rem] font-black uppercase tracking-[0.2em] italic text-[0.875rem] text-white bg-accent-cta active:scale-95 shadow-lg transition-opacity duration-300"
                    style={{ opacity: isRetrying ? 0.4 : 1 }}
                >
                    <span>Подписаться</span>
                    <ChevronRight size="1.1rem" className="animate-bounce-x" />
                </button>

                <button
                    onClick={handleRetry}
                    disabled={cooldown > 0}
                    className="w-full mt-4 py-[0.9rem] rounded-[1.25rem] font-bold border transition-all duration-300"
                    style={{
                        fontSize: `${0.875 * s}rem`,
                        background: 'var(--c-fill)',
                        borderColor: 'var(--c-border)',
                        color: cooldown > 0 ? 'var(--c-text-30)' : 'var(--c-text-50)',
                        opacity: cooldown > 0 ? 0.6 : 1
                    }}
                >
                    {isRetrying ? (
                        'Проверка...'
                    ) : cooldown > 0 ? (
                        `Проверить подписку · ${cooldown}с`
                    ) : (
                        'Проверить подписку'
                    )}
                </button>

                <div
                    className="w-full mt-6 transition-all duration-400"
                    style={{
                        opacity: showFailFeedback && !isRetrying ? 1 : 0,
                        visibility: showFailFeedback && !isRetrying ? 'visible' : 'hidden',
                        pointerEvents: showFailFeedback && !isRetrying ? 'auto' : 'none'
                    }}
                >
                    <div
                        className="px-5 py-3 rounded-2xl bg-[var(--c-primary-10)] border border-[var(--c-primary-20)] text-center"
                        style={{ fontSize: `${0.813 * s}rem` }}
                    >
                        <p className="text-[var(--c-primary)] font-semibold leading-relaxed">
                            Вы ещё не подписаны на канал.
                            <br />
                            Пожалуйста, подпишитесь — это бесплатно!
                        </p>
                    </div>
                </div>

            </div>

            <div
                className="fixed bottom-0 left-0 right-0 h-[3px] bg-[var(--c-text-10)] overflow-hidden transition-opacity duration-300"
                style={{ opacity: showBar ? 1 : 0 }}
            >
                <div
                    className="h-full bg-[var(--c-primary)] transition-[width] duration-200 ease-out"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(0.25rem); } }
                .animate-bounce-x { animation: bounce-x 1s infinite; }
            `}} />
        </div>
    );
};

export default LockScreen;
