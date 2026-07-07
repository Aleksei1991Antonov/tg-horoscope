import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react';
import { Star, Heart, Calendar, Sun, Moon, Ticket, Phone, BarChart3 } from 'lucide-react';
import { triggerSuccessHaptic } from '../../../../utils/haptics';
import { storage, secureStorage } from '../../../../utils/storage';
import type { LucideIcon } from 'lucide-react';

const API_GATEWAY = 'https://d5drr9ephmsu2j124ugg.nkhmighe.apigw.yandexcloud.net';

interface YooWidgetInstance {
    on: (event: string, cb: () => void) => void;
    destroy: () => void;
    render: () => Promise<void>;
}

interface YooWidgetConfig {
    confirmation_token: string;
    return_url: string;
    error_callback: (error: unknown) => void;
    customization?: {
        modal?: boolean;
        colors?: {
            control_primary?: string;
            background?: string;
        };
    };
}

interface NOVAPremiumViewProps {
    fontScale: 'small' | 'medium' | 'large';
    resolvedTheme: string;
    onActivatePremium: () => void;
}

interface RowProps {
    icon: LucideIcon;
    label: string;
    desc: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    labelStyle: string;
    disabled?: boolean;
}

const Row = ({ icon: Icon, label, desc, checked, onChange, labelStyle, disabled }: RowProps) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)]`}>
        <div className="flex items-center gap-3">
            <Icon size={18} className="text-[var(--c-primary)] shrink-0" />
            <div>
                <div className={`${labelStyle} font-black text-[var(--c-text)] uppercase`}>{label}</div>
                <div className="text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider">{desc}</div>
            </div>
        </div>
        <button
            onClick={() => { if (!disabled) { onChange(!checked); } }}
            className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[var(--c-primary)]' : 'bg-[var(--c-border)]'}`}
        >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm ring-1 ring-black/10 transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
        </button>
    </div>
);

const ls = (key: string) => storage.getItem(key) === 'true';
const lss = (key: string, v: boolean) => secureStorage.setItem(key, String(v));

export const NOVAPremiumView: React.FC<NOVAPremiumViewProps> = ({ fontScale, resolvedTheme, onActivatePremium }) => {
    const [loveH, setLoveH] = useState(() => ls('nova_love_horoscope'));
    const [badge, setBadge] = useState(() => ls('nova_badge'));
    const [promo, setPromo] = useState('');
    const [discountPrice, setDiscountPrice] = useState<number | null>(null);
    const [promoMsg, setPromoMsg] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [payMsg, setPayMsg] = useState('');
    const saveContact = (c: { phone?: string; email?: string }) => storage.setItem('nova_receipt_contact', JSON.stringify(c));
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [emailDraft, setEmailDraft] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successDone, setSuccessDone] = useState(false);
    const [premium, setPremium] = useState(false);
    const [until, setUntil] = useState('—');

    const promoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const premiumRef = useRef(premium);
    const checkoutRef = useRef<YooWidgetInstance | null>(null);
    const contactRef = useRef<{ phone?: string; email?: string } | null>(null);
    const [widgetError, setWidgetError] = useState(false);

    const paymentIdRef = useRef<string | null>(null);
    useEffect(() => { premiumRef.current = premium; }, [premium]);
    useEffect(() => { paymentIdRef.current = paymentId; }, [paymentId]);

    useEffect(() => () => {
        if (checkoutRef.current) {
            checkoutRef.current.destroy();
            checkoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!widgetError) return;
        setTimeout(() => setWidgetError(false), 0);
        const contact = contactRef.current;
        if (!contact) return;
        (async () => {
            try {
                const res = await fetch(`${API_GATEWAY}/create-payment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: 199,
                        description: 'Premium NOVA 30 дней',
                        receipt: contact,
                        return_url: window.location.href,
                        confirmation_type: 'redirect',
                    }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setPayMsg(`HTTP ${res.status}: ${data.error || data.message || 'ошибка'}`);
                } else if (data.confirmation_url) {
                    setPaymentId(data.payment_id);
                    storage.setItem('nova_pending_payment', data.payment_id);
                    if (window.Telegram?.WebApp?.openLink) { window.Telegram.WebApp.openLink(data.confirmation_url); } else { window.open(data.confirmation_url, '_blank'); }
                } else {
                    setPayMsg(data.error || 'Ошибка создания платежа');
                }
            } catch (e: unknown) {
                setPayMsg('Ошибка: ' + ((e instanceof Error ? e.message : null) || 'неизвестная'));
            }
        })();
    }, [widgetError]);

    const scrollToPromo = () => {
        setTimeout(() => promoRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' }), 350);
    };

    const clearPremiumFlags = useCallback(() => {
        secureStorage.setItem('nova_love_horoscope', 'false');
        secureStorage.setItem('nova_badge', 'false');
        setLoveH(false);
        setBadge(false);
        window.dispatchEvent(new CustomEvent('nova-toggle'));
    }, []);

    const updatePremiumStatus = useCallback(() => {
        const raw = secureStorage.getItem('nova_premium_until');
        if (!raw) {
            if (premiumRef.current) {
                setPremium(false);
                setUntil('—');
                clearPremiumFlags();
            }
            return;
        }
        const t = parseInt(raw, 10);
        const active = t > Date.now();
        if (!active) {
            secureStorage.removeItem('nova_premium_until');
            if (premiumRef.current) {
                setPremium(false);
                setUntil('—');
                clearPremiumFlags();
            }
            return;
        }
        if (!premiumRef.current) setPremium(true);
        const d = new Date(t);
        setUntil(`${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`);
    }, [clearPremiumFlags]);

    const activatePremium = useCallback((expiresAt: number) => {
        const existing = secureStorage.getItem('nova_premium_until');
        const existingTime = existing ? parseInt(existing, 10) : 0;
        const duration = expiresAt - Date.now();
        const newExpiry = Math.max(existingTime, Date.now()) + duration;
        secureStorage.setItem('nova_premium_until', String(newExpiry));
        secureStorage.setItem('nova_love_horoscope', 'true');
        secureStorage.setItem('nova_badge', 'true');
        setLoveH(true);
        setBadge(true);
        const d = new Date(newExpiry);
        setUntil(`${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`);
        setPremium(true);
        setPaymentId(null);
        storage.removeItem('nova_pending_payment');
        forceUpdate();
        window.dispatchEvent(new CustomEvent('nova-toggle'));
        onActivatePremium();
        void triggerSuccessHaptic();
    }, [onActivatePremium]);

    const createPayment = async (confirmationType: string, receipt: { phone?: string; email?: string }) => {
        const amount = discountPrice || 199;
        const res = await fetch(`${API_GATEWAY}/create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, description: 'Premium NOVA 30 дней', receipt, return_url: window.location.href, confirmation_type: confirmationType }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || `HTTP ${res.status}`);
        return data as { payment_id: string; confirmation_token?: string; confirmation_url?: string };
    };

    const startPayment = async (receipt: { phone?: string; email?: string }) => {
        setPaymentLoading(true);
        setPayMsg('');
        try {
            contactRef.current = receipt;

            const data = await createPayment('embedded', receipt);
            const YooWidget = (window as unknown as { YooMoneyCheckoutWidget?: new (config: YooWidgetConfig) => YooWidgetInstance }).YooMoneyCheckoutWidget;

            if (data.confirmation_token && YooWidget) {
                setPaymentId(data.payment_id);
                storage.setItem('nova_pending_payment', data.payment_id);
                const checkout = new YooWidget({
                    confirmation_token: data.confirmation_token,
                    return_url: window.location.href,
                    error_callback: () => { setWidgetError(true); },
                    customization: {
                        modal: true,
                        colors: { control_primary: '#FF1CAA', background: '#FFFFFF' },
                    },
                });
                checkout.on('complete', () => {});
                    checkout.on('modal_close', () => {
                        if (checkoutRef.current) {
                            checkoutRef.current.destroy();
                            checkoutRef.current = null;
                        }
                        setPaymentId(null);
                        setPayMsg('Платёж отменён');
                        storage.removeItem('nova_pending_payment');
                    });
                checkoutRef.current = checkout;
                await checkout.render();
            } else {
                const d = await createPayment('redirect', receipt);
                if (d.confirmation_url) {
                    setPaymentId(d.payment_id);
                    storage.setItem('nova_pending_payment', d.payment_id);
                    if (window.Telegram?.WebApp?.openLink) { window.Telegram.WebApp.openLink(d.confirmation_url); } else { window.open(d.confirmation_url, '_blank'); }
                } else {
                    setPayMsg('Ошибка создания платежа');
                }
            }
        } catch (e: unknown) {
            setPayMsg('Ошибка: ' + ((e instanceof Error ? e.message : null) || 'неизвестная'));
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleSharePhone = async () => {
        emailRef.current?.blur();
        const tg = window.Telegram?.WebApp as { requestContact?: () => Promise<{ status: string }> } | undefined;
        if (tg?.requestContact) {
            try {
                const result = await tg.requestContact();
                if (result?.status === 'sent') {
                    setShowEmailInput(false);
                    setPayMsg('Контакт отправлен боту. Для оплаты укажите email ниже.');
                    return;
                }
            } catch {
                // user declined — stay on screen
            }
        }
    };

    const handleSubmitEmail = async () => {
        const v = emailDraft.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
            setEmailError('Введите корректный email');
            return;
        }
        setEmailError('');
        const contact = { email: v };
        saveContact(contact);
        setShowEmailInput(false);
        await startPayment(contact);
    };

    useEffect(() => {
        const timer = setTimeout(updatePremiumStatus, 0);
        const i = setInterval(updatePremiumStatus, 10000);
        return () => { clearTimeout(timer); clearInterval(i); };
    }, [updatePremiumStatus]);

    useEffect(() => {
        if (!paymentId) return;
        let attempts = 0;
        const MAX_ATTEMPTS = 60;
        let interval: ReturnType<typeof setInterval>;
        const scheduleCheck = () => {
            const delay = 5000 + Math.random() * 3000;
            interval = setTimeout(() => {
                attempts++;
                if (attempts > MAX_ATTEMPTS) {
                    setPaymentId(null);
                    storage.removeItem('nova_pending_payment');
                    setPayMsg('Время ожидания истекло');
                    return;
                }
                fetch(`${API_GATEWAY}/check-payment?payment_id=${paymentId}`)
                    .then(r => r.json().catch(() => ({ status: r.status })))
                    .then(d => {
                        if (d.status === 'succeeded') {
                            clearTimeout(interval);
                            if (checkoutRef.current) { checkoutRef.current.destroy(); checkoutRef.current = null; }
                            activatePremium(Date.now() + 30 * 24 * 60 * 60 * 1000);
                            setShowSuccess(true);
                            setSuccessDone(true);
                            setPayMsg('Премиум активирован!');
                        } else if (d.status === 'canceled') {
                            clearTimeout(interval);
                            setPaymentId(null);
                            storage.removeItem('nova_pending_payment');
                            setPayMsg('Платёж отменён');
                        } else {
                            scheduleCheck();
                        }
                    })
                    .catch(() => scheduleCheck());
            }, delay);
        };
        scheduleCheck();
        return () => clearTimeout(interval);
    }, [paymentId, activatePremium]);

    const handleCancelPayment = useCallback(async () => {
        const pid = paymentIdRef.current;
        if (!pid) return;
        try {
            const res = await fetch(`${API_GATEWAY}/check-payment?payment_id=${pid}`);
            const d = await res.json().catch(() => ({ status: res.status }));
            if (d.status === 'succeeded') {
                activatePremium(Date.now() + 30 * 24 * 60 * 60 * 1000);
                setShowSuccess(true);
                setSuccessDone(true);
                setPayMsg('Премиум активирован!');
                return;
            }
        } catch { /* check failed — treat as cancelled */ }
        if (checkoutRef.current) { checkoutRef.current.destroy(); checkoutRef.current = null; }
        setPaymentId(null);
        setPayMsg('');
        storage.removeItem('nova_pending_payment');
    }, [activatePremium]);

    const playPromoSound = () => { new Audio('./promo-success.mp3').play().catch(() => null); };

    const trackPromo = (code: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).ym?.(109130248, 'reachGoal', 'promo_applied', { code });
    };

    const handleApplyPromo = () => {
        if (promo === 'NOVATEST') {
            if (secureStorage.getItem('nova_promo_NOVATEST_used') === 'true') { setPromoMsg('Промокод уже активирован'); return; }
            const t = Date.now() + 60 * 1000;
            activatePremium(t);
            secureStorage.setItem('nova_promo_NOVATEST_used', 'true');
            setPromoMsg('Премиум активирован на 1 минуту!');
            playPromoSound();
            trackPromo(promo);
            return;
        }
        if (promo === 'NOVA55') {
            setDiscountPrice(149);
            setPromoMsg('Промокод применён — цена 149 ₽ за 30 дней');
            playPromoSound();
            return;
        }
        if (promo === 'NOVALOVE35W') {
            if (secureStorage.getItem('nova_promo_NOVALOVE35W_used') === 'true') { setPromoMsg('Промокод уже активирован'); return; }
            const t = Date.now() + 35 * 24 * 60 * 60 * 1000;
            activatePremium(t);
            secureStorage.setItem('nova_promo_NOVALOVE35W_used', 'true');
            setPromoMsg('Премиум активирован на 35 дней!');
            playPromoSound();
            trackPromo(promo);
            return;
        }
        if (promo === 'MAGIC') {
            if (secureStorage.getItem('nova_promo_MAGIC_used') === 'true') { setPromoMsg('Промокод уже активирован'); return; }
            const t = Date.now() + 3 * 24 * 60 * 60 * 1000;
            activatePremium(t);
            secureStorage.setItem('nova_promo_MAGIC_used', 'true');
            setPromoMsg('Премиум активирован на 3 дня!');
            playPromoSound();
            trackPromo(promo);
            return;
        }
        setPromoMsg('Неверный промокод');
    };

    const toggle = (setter: (v: boolean) => void, key: string) => (v: boolean) => {
        setter(v);
        lss(key, v);
        void triggerSuccessHaptic();
        window.dispatchEvent(new CustomEvent('nova-toggle'));
    };

    const ls_ = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const ts = fontScale === 'large' ? 'text-[1.5rem]' : 'text-[1.2rem]';
    const inputSize = fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]';
    const isDesktop = window.Telegram?.WebApp?.platform === 'desktop' || window.Telegram?.WebApp?.platform === 'web';

    const isDark = resolvedTheme === 'max-dark' || resolvedTheme === 'night-ether' || resolvedTheme === 'nova-night';
    const NOVA_CSS = {
        '--c-primary': '#FF1CAA',
        '--c-primary-40': 'rgba(255, 28, 170, 0.4)',
        '--c-secondary': isDark ? '#FF4DB8' : '#FF8DCC',
    } as React.CSSProperties;

    return (
        <div ref={containerRef} className="relative w-full min-h-full flex flex-col px-1" style={NOVA_CSS}>
            <svg aria-hidden="true" style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FF1CAA" />
                        <stop offset="100%" stopColor="#FF8DCC" />
                    </linearGradient>
                </defs>
            </svg>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#FF1CAA' }} />
                    <span className={`${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} font-black uppercase tracking-[0.2em]`} style={{ color: '#FF1CAA' }}>Premium NOVA</span>
                </div>
            </header>

            <div className="space-y-6 pb-32" onClick={e => e.stopPropagation()}>
                <div className="space-y-2">
                    <Row icon={Heart} label="Любовный гороскоп" desc="Твой гороскоп становится любовным" checked={loveH} onChange={toggle(setLoveH, 'nova_love_horoscope')} labelStyle={ls_} disabled={!premium} />
                    <Row icon={Star} label="Бэйдж Premium NOVA" desc="Твой премиум-статус" checked={badge} onChange={toggle(setBadge, 'nova_badge')} labelStyle={ls_} disabled={!premium} />
                </div>

                <div className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[var(--c-primary)]" />
                        <span className={`${ls_} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Статус подписки</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className={`${ls_} font-bold text-[var(--c-text-40)] uppercase tracking-wider`}>Премиум активен до</span>
                        <span className={`${ls_} font-black text-[var(--c-primary)]`}>{until}</span>
                    </div>
                </div>

                <div className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl p-5 space-y-3">
                    <div className="flex items-start gap-3">
                        <Sun size={18} className="text-[var(--c-primary)] shrink-0 mt-0.5" />
                        <div>
                            <div className={`${ls_} font-black text-[var(--c-text)] uppercase`}>NOVA День</div>
                            <div className="text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider">Светлая романтичная тема</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Moon size={18} className="text-[var(--c-primary)] shrink-0 mt-0.5" />
                        <div>
                            <div className={`${ls_} font-black text-[var(--c-text)] uppercase`}>NOVA Ночь</div>
                            <div className="text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider">Тёмная премиальная тема</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <BarChart3 size={18} className="text-[var(--c-primary)] shrink-0 mt-0.5" />
                        <div>
                            <div className={`${ls_} font-black text-[var(--c-text)] uppercase`}>Прогноз совместимости</div>
                            <div className="text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider">На годы вперед</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1 mb-2">
                        <Ticket size={12} className="text-[var(--c-primary)]" />
                        <span className={`text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Промокод</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input ref={promoRef} onFocus={scrollToPromo} value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder="Введи промокод" className={`flex-1 px-4 py-3 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text)] ${inputSize} font-bold uppercase tracking-widest placeholder:text-[var(--c-text-20)] outline-none focus:border-[var(--c-primary-40)] transition-colors`} />
                        <button onClick={handleApplyPromo} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-secondary)] text-white font-black text-[0.625rem] uppercase tracking-widest active:scale-[0.98] transition-all">Применить</button>
                    </div>
                    {promoMsg && <div className={`text-[0.5rem] font-bold text-center ${promoMsg.includes('Неверный') || promoMsg.includes('уже') ? 'text-red-400' : 'text-green-500'}`}>{promoMsg}</div>}
                </div>

                <div className="space-y-2 min-h-[5.5rem]">
                    {isDesktop ? (
                        <button disabled={true} className="w-full py-4 rounded-2xl bg-[var(--c-border)] text-[var(--c-text-40)] font-black text-[0.75rem] uppercase tracking-widest shadow-lg cursor-not-allowed">
                            Доступно для смартфона
                        </button>
                    ) : (
                        <button disabled className="w-full py-4 rounded-2xl bg-[var(--c-fill)] border border-[var(--c-border)] text-[var(--c-text-30)] font-black text-[0.75rem] uppercase tracking-widest cursor-not-allowed">
                            Скоро в продаже
                        </button>
                    )}
                    <div className="text-[0.4rem] text-center text-[var(--c-text)] opacity-40 leading-relaxed font-normal">Единоразовый платёж без автопродления<br/>По цене чашечки кофе</div>
                    {payMsg && <div className={`text-[0.5rem] font-bold text-center ${payMsg.includes('Премиум') || payMsg.includes('активирован') ? 'text-green-500' : 'text-red-400'}`}>{payMsg}</div>}
                    {paymentId && !paymentLoading && (
                        <button onClick={() => { void handleCancelPayment(); }} className="w-full text-[0.5rem] font-bold text-[var(--c-primary)] underline underline-offset-4 opacity-60 active:opacity-100 transition-opacity text-center">Отменить ожидание</button>
                    )}
                </div>

                <div className="text-center pb-4">
                    <a href="https://t.me/antonovka38" target="_blank" rel="noopener noreferrer" className={`${ls_} font-medium text-[var(--c-primary)] opacity-50 hover:opacity-100 transition-opacity`}>Помощь и поддержка</a>
                </div>
            </div>

            {paymentId && !paymentLoading && (
                <div className="fixed inset-0 z-[7500] bg-white" />
            )}

            {showEmailInput && (
                <div className="fixed inset-0 z-[8000] bg-[var(--c-bg)] flex flex-col" onClick={() => { setShowEmailInput(false); setEmailDraft(''); setEmailError(''); }}>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--c-border)]">
                        <div className={`${ls_} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Контакт для чека</div>
                        <button onClick={() => { setShowEmailInput(false); setEmailDraft(''); setEmailError(''); }} className={`${ls_} font-bold text-[var(--c-primary)] uppercase tracking-wider active:opacity-60`}>Закрыть</button>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-6" onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <Star size={40} fill="url(#starGrad)" stroke="none" className="mx-auto mb-4" />
                            <div className={`${ts} font-black text-[var(--c-text)] uppercase tracking-tight`}>Контакт для чека</div>
                            <div className={`${ls_} font-bold text-[var(--c-text-30)] uppercase tracking-wider mt-1`}>Поделитесь номером телефона или введите email</div>
                        </div>

                        <button onClick={handleSharePhone} className="w-full py-4 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text)] font-black text-[0.75rem] uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <Phone size={16} className="text-[var(--c-primary)]" />
                            Поделиться номером
                        </button>

                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-[var(--c-border)]" />
                            <span className={`${ls_} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>или</span>
                            <div className="flex-1 h-px bg-[var(--c-border)]" />
                        </div>

                        <input ref={emailRef} value={emailDraft} onChange={e => { setEmailDraft(e.target.value); setEmailError(''); }} type="email" placeholder="example@mail.ru" className={`w-full px-4 py-3 rounded-2xl bg-[var(--c-surface)] border ${emailError ? 'border-red-400' : 'border-[var(--c-border)]'} text-[var(--c-text)] ${inputSize} font-bold outline-none focus:border-[var(--c-primary-40)] transition-colors`} />
                        {emailError && <div className="text-[0.5rem] font-bold text-red-400 mt-1 px-1">{emailError}</div>}

                        <button onClick={handleSubmitEmail} disabled={!emailDraft.trim()} className="w-full mt-4 py-4 rounded-2xl bg-[var(--c-primary)] text-white font-black text-[0.75rem] uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-50">Продолжить</button>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed inset-0 z-[9000] bg-[var(--c-bg)] flex flex-col items-center justify-center px-6" onClick={() => { if (successDone) { setShowSuccess(false); } }}>
                    <div className="text-center" onClick={e => e.stopPropagation()}>
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mx-auto mb-6">
                            <circle cx="36" cy="36" r="35" stroke={successDone ? 'var(--c-primary)' : 'var(--c-text-20)'} strokeWidth="2" />
                            {successDone ? (
                                <path d="M24 37l8 8 16-16" stroke="var(--c-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <>
                                    <circle cx="36" cy="28" r="6" fill="var(--c-text-30)" />
                                    <path d="M22 52c0-8 6-14 14-14s14 6 14 14" stroke="var(--c-text-30)" strokeWidth="3" strokeLinecap="round" />
                                </>
                            )}
                        </svg>
                        <div className={`${fontScale === 'large' ? 'text-[1.5rem]' : 'text-[1.2rem]'} font-black text-[var(--c-text)] uppercase tracking-tight`}>{successDone ? 'Премиум активирован' : 'Платёж принят'}</div>
                        {successDone && <button onClick={() => setShowSuccess(false)} className="mt-8 px-8 py-3 rounded-2xl bg-[var(--c-primary)] text-white font-black text-[0.75rem] uppercase tracking-widest active:scale-[0.98] transition-all">Готово</button>}
                    </div>
                </div>
            )}
        </div>
    );
};