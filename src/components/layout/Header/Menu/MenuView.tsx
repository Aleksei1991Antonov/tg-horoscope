import React, { useState, useRef, useEffect } from 'react';
import {
    Shield, FileText, BookOpen, Building2,
    ChevronDown, Copy, Check, Mail, Type, Heart, ChevronRight, ExternalLink
} from 'lucide-react';

import { triggerSuccessHaptic } from '../../../../utils/haptics';

interface MenuViewProps {
    isOpen: boolean;
    onClose: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    fontScale: 'small' | 'medium' | 'large';
    onOpenTextSettings: () => void;
    onOpenKnowledge: () => void;
    onOpenLegalDoc: (doc: 'privacy' | 'terms') => void;
    onSetBackHandler: (handler: (() => void) | null) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
                                                      isOpen, onClose,
                                                      onTouchStart, onTouchMove, onTouchEnd,
                                                      fontScale, onOpenTextSettings,
                                                      onOpenKnowledge, onOpenLegalDoc,
                                                      onSetBackHandler
                                                  }) => {
    const [isLegalOpen, setIsLegalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const creatorRef = useRef<HTMLDivElement>(null);

    const supportEmail = "rabbithole.help@vk.com";
    const inn = "760407796785";
    const ogrnip = "326760000001804";
    const address = "Россия, г. Ярославль";
    const donatePageUrl = "https://yoomoney.ru/fundraise/1H8OQHE6EJA.260420";
    const photoPath = "my-photo.webp?v5";

    const menuTitleSize = fontScale === 'large' ? 'text-[2.2rem]' : 'text-[1.8rem]';
    const itemTitleSize = fontScale === 'large' ? 'text-[0.85rem]' : 'text-[0.7rem]';
    const itemSubtextSize = fontScale === 'large' ? 'text-[0.6rem]' : 'text-[0.5rem]';
    const footerTextSize = fontScale === 'small' ? 'text-[0.45rem]' : fontScale === 'medium' ? 'text-[0.5rem]' : 'text-[0.65rem]';

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text).then(() => {
            void triggerSuccessHaptic();
            setCopiedField(fieldId);
            setTimeout(() => setCopiedField(null), 1500);
        });
    };

    const toggleLegal = () => {
        void triggerSuccessHaptic();
        const nextState = !isLegalOpen;
        setIsLegalOpen(nextState);
        if (nextState) {
            requestAnimationFrame(() => {
                creatorRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
            });
        }
    };

    useEffect(() => {
        if (!isOpen) {
            onSetBackHandler(null);
        } else if (isPhotoModalOpen) {
            onSetBackHandler(() => () => setIsPhotoModalOpen(false));
        } else {
            onSetBackHandler(() => () => onClose());
        }
    }, [isOpen, isPhotoModalOpen, onSetBackHandler, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
            <div className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-sm" onClick={onClose} />

            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="relative h-full w-[85%] max-w-[22.5rem] bg-[var(--c-surface-elevated)] border-l border-[var(--c-border)] shadow-2xl transition-transform duration-300"
            >
                <div className="flex flex-col h-full relative overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
                        <div className="p-[1.5rem] pt-[3rem] flex-1">
                            <div className="mb-[2.5rem] px-[0.5rem]">
                                <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
                                    <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-[var(--c-primary)]" />
                                    <span className="text-[0.5rem] font-black uppercase tracking-[0.4em] text-[var(--c-text-30)]">Гороскоп v1.0.0</span>
                                </div>
                                <h2 className={`${menuTitleSize} font-black text-[var(--c-text)] uppercase leading-none`}>Меню</h2>
                            </div>

                            <div className="space-y-[2rem]">
                                <div className="space-y-[0.75rem]">
                                    <h3 className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--c-text-20)] ml-[0.25rem]">Интерфейс</h3>
                                    <button
                                        onClick={() => { void triggerSuccessHaptic(); onOpenTextSettings(); }}
                                        className="w-full p-[1.25rem] rounded-[1.2rem] bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center justify-between active:scale-[0.98] transition-all"
                                    >
                                        <div className="flex items-center gap-[1rem]">
                                            <div className="p-[0.6rem] rounded-[0.8rem] bg-[var(--c-primary-10)] text-[var(--c-primary)]">
                                                <Type size="1.25rem" />
                                            </div>
                                            <div className="text-left">
                                                <div className={`${itemTitleSize} font-black text-[var(--c-text)] uppercase`}>Оформление</div>
                                                <div className={`${itemSubtextSize} text-[var(--c-text-30)] uppercase font-bold tracking-tight`}>
                                                    Шрифт и тема
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-[var(--c-text-10)]" />
                                    </button>
                                </div>

                                <div className="space-y-[0.75rem]">
                                    <h3 className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--c-text-20)] ml-[0.25rem]">Информация</h3>
                                    <button onClick={() => { void triggerSuccessHaptic(); onOpenKnowledge(); }} className="w-full p-[1.25rem] rounded-[1.2rem] bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center gap-[1rem] active:scale-[0.98]">
                                        <div className="p-[0.6rem] rounded-[0.8rem] bg-[var(--c-primary-10)] text-[var(--c-primary)]">
                                            <BookOpen size="1.25rem" />
                                        </div>
                                        <div className="text-left">
                                            <div className={`${itemTitleSize} font-black text-[var(--c-text)] uppercase`}>База знаний</div>
                                            <div className={`${itemSubtextSize} text-[var(--c-text-30)] uppercase font-bold tracking-tight`}>Алгоритмы и справка</div>
                                        </div>
                                    </button>
                                </div>

                                <div className="space-y-[0.75rem]">
                                    <h3 className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--c-text-20)] ml-[0.25rem]">Поддержка</h3>
                                    <button onClick={() => { void triggerSuccessHaptic(); window.WebApp?.openLink(`mailto:${supportEmail}`); }} className="w-full p-[1.25rem] rounded-[1.2rem] bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center gap-[1rem] active:scale-[0.98]">
                                        <div className="p-[0.6rem] rounded-[0.8rem] bg-[var(--c-primary-10)] text-[var(--c-primary)]">
                                            <Mail size="1.25rem" />
                                        </div>
                                        <div className="text-left">
                                            <div className={`${itemTitleSize} font-black text-[var(--c-text)] uppercase`}>Техподдержка</div>
                                            <div className={`${itemSubtextSize} text-[var(--c-primary-60)] uppercase font-bold tracking-tighter`}>{supportEmail}</div>
                                        </div>
                                    </button>
                                </div>

                                <div className="space-y-[0.75rem]" ref={creatorRef}>
                                    <h3 className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--c-text-20)] ml-[0.25rem]">Автор проекта</h3>
                                    <div className={`border rounded-[1.2rem] overflow-hidden ${isLegalOpen ? 'bg-[var(--c-surface)] border-[var(--c-primary-20)]' : 'bg-[var(--c-surface)] border-[var(--c-border)]'}`}>
                                        <button onClick={toggleLegal} className="w-full p-[1.25rem] flex items-center justify-between">
                                            <div className="flex items-center gap-[0.75rem] text-[var(--c-primary)]">
                                                <Building2 size="1.1rem" />
                                                <span className="text-[0.65rem] font-black uppercase tracking-widest">ИП АНТОНОВ А.О.</span>
                                            </div>
                                            <ChevronDown size="1rem" className={`text-[var(--c-text-20)] transition-transform ${isLegalOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isLegalOpen && (
                                            <div className="px-[1.25rem] pb-[1.25rem] space-y-[1rem] pt-[0.5rem] border-t border-[var(--c-border)]">
                                                <div className="flex items-center gap-[1rem] pt-[1rem]">
                                                    <div onClick={() => { void triggerSuccessHaptic(); setIsPhotoModalOpen(true); }} className="w-[3rem] h-[3rem] rounded-[0.75rem] bg-[var(--c-surface-elevated)] border border-[var(--c-primary-20)] overflow-hidden relative cursor-pointer">
                                                        <img src={photoPath} alt="Founder" className="w-full h-full object-cover opacity-80" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[0.65rem] font-black text-[var(--c-text)] uppercase tracking-tight italic">Антонов Алексей Олегович</div>
                                                        <div className="text-[0.5rem] text-[var(--c-primary-60)] uppercase font-bold">Автор</div>
                                                    </div>
                                                </div>
                                                <div className="space-y-[0.5rem] bg-black/[0.03] p-[0.75rem] rounded-[0.8rem] border border-[var(--c-border)] text-[0.55rem] font-mono">
                                                    <div className="flex justify-between items-center text-[var(--c-text-70)]">
                                                        <span className="text-[var(--c-text-30)] uppercase tracking-tighter">ИНН</span>
                                                        <div className="flex items-center gap-[0.5rem]">
                                                            {inn}
                                                            <button onClick={() => handleCopy(inn, 'inn')}>
                                                                {copiedField === 'inn' ? <Check size="0.6rem" className="text-[var(--c-primary)]"/> : <Copy size="0.6rem"/>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[var(--c-text-70)]">
                                                        <span className="text-[var(--c-text-30)] uppercase tracking-tighter">ОГРНИП</span>
                                                        <div className="flex items-center gap-[0.5rem]">
                                                            {ogrnip}
                                                            <button onClick={() => handleCopy(ogrnip, 'ogrnip')}>
                                                                {copiedField === 'ogrnip' ? <Check size="0.6rem" className="text-[var(--c-primary)]"/> : <Copy size="0.6rem"/>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start justify-between pt-[0.25rem] text-[var(--c-text-70)]">
                                                        <span className="text-[var(--c-text-30)] uppercase tracking-tighter">Адрес</span>
                                                        <div className="flex items-center gap-[0.5rem]">
                                                            <span className="text-right max-w-[8.75rem]">{address}</span>
                                                            <button onClick={() => handleCopy(address, 'address')}>
                                                                {copiedField === 'address' ? <Check size="0.6rem" className="text-[var(--c-primary)]"/> : <Copy size="0.6rem"/>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[0.5rem] border-t border-[var(--c-border)] flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <Heart size={10} className="text-[var(--c-primary)]" />
                                                            <span className="text-[var(--c-text-30)] uppercase tracking-tighter">Поддержать</span>
                                                        </div>
                                                        <button onClick={() => { void triggerSuccessHaptic(); window.WebApp?.openLink(donatePageUrl); }} className="text-[var(--c-primary)] font-bold">ЮMoney</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-[0.75rem]">
                                    <h3 className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--c-text-20)] ml-[0.25rem]">Правовой статус</h3>
                                    <div className="space-y-[0.5rem] pb-[2.5rem]">
                                        <button onClick={() => { void triggerSuccessHaptic(); onOpenLegalDoc('terms'); }} className="w-full p-[1rem] rounded-[0.8rem] bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center justify-between active:bg-[var(--c-surface)]">
                                            <div className="flex items-center gap-[0.75rem]">
                                                <FileText size="1rem" className="text-[var(--c-text-20)]" />
                                                <span className={`${itemSubtextSize} font-bold text-[var(--c-text-40)] uppercase tracking-tight`}>Пользовательское соглашение</span>
                                            </div>
                                            <ExternalLink size="0.75rem" className="text-[var(--c-text-10)]" />
                                        </button>
                                        <button onClick={() => { void triggerSuccessHaptic(); onOpenLegalDoc('privacy'); }} className="w-full p-[1rem] rounded-[0.8rem] bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center justify-between active:bg-[var(--c-surface)]">
                                            <div className="flex items-center gap-[0.75rem]">
                                                <Shield size="1rem" className="text-[var(--c-text-20)]" />
                                                <span className={`${itemSubtextSize} font-bold text-[var(--c-text-40)] uppercase tracking-tight`}>Политика конфиденциальности</span>
                                            </div>
                                            <ExternalLink size="0.75rem" className="text-[var(--c-text-10)]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-[2rem] border-t border-[var(--c-border)] mt-auto">
                            <div className="flex flex-col items-center text-center gap-[0.5rem]">
                                <div className={`${footerTextSize} font-black text-[var(--c-text-10)] uppercase tracking-[0.5em]`}>ИП Антонов Алексей Олегович</div>
                                <div className={`${footerTextSize} font-bold text-[var(--c-primary-60)] opacity-30 uppercase tracking-[0.2em]`}>© 2026 Все права защищены</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isPhotoModalOpen && (
                <div className="fixed inset-0 z-[2000] bg-[var(--c-bg-90)] flex items-center justify-center p-[1.5rem]" onClick={() => setIsPhotoModalOpen(false)}>
                    <div className="relative w-full max-w-[20rem] aspect-square border border-[var(--c-primary-20)] p-[0.25rem] bg-[var(--c-surface-elevated)]">
                        <img src={photoPath} alt="Founder" className="w-full h-full object-cover" />
                        <div className="absolute -bottom-[4rem] left-0 w-full text-center">
                            <div className="text-[0.875rem] font-black uppercase tracking-[0.3em] text-[var(--c-primary)] italic">Алексей Антонов</div>
                            <div className="text-[0.55rem] text-[var(--c-text-30)] uppercase mt-[0.25rem] tracking-widest font-bold">Автор</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
