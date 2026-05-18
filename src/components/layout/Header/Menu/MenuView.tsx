import React, { useState, useRef } from 'react';
import {
    Shield, FileText, BookOpen, ChevronLeft, Building2,
    ChevronDown, Maximize2, Copy, Check, Heart, ExternalLink, Mail
} from 'lucide-react';

import { RhythmKnowledgeView } from '../../../../screens/Knowledge/RhythmKnowledgeView.tsx';
import { PrivacyPolicy } from './Legal/PrivacyPolicy';
import { TermsOfService } from './Legal/TermsOfService';
import type { LegalDocType } from './MenuContainer';

interface MenuViewProps {
    isOpen: boolean;
    onClose: () => void;
    showKnowledge: boolean;
    onToggleKnowledge: () => void;
    activeDoc: LegalDocType;
    onDocSelect: (doc: LegalDocType) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      showKnowledge,
                                                      onToggleKnowledge,
                                                      activeDoc,
                                                      onDocSelect
                                                  }) => {
    const [isLegalOpen, setIsLegalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const creatorRef = useRef<HTMLDivElement>(null);

    const supportEmail = "rabbithole.help@vk.com";
    const inn = "760407796785";
    const ogrnip = "326760000001804";
    const address = "Россия, г. Ярославль";
    const donatePageUrl = "https://yoomoney.ru/fundraise/1H8OQHE6EJA.260420";
    const photoPath = "my-photo.webp";

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(fieldId);
            setTimeout(() => setCopiedField(null), 1500);
        });
    };

    const toggleLegal = () => {
        const nextState = !isLegalOpen;
        setIsLegalOpen(nextState);
        // Возвращаем автоскролл
        if (nextState) {
            setTimeout(() => {
                creatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    };

    return (
        <div className={`fixed inset-0 z-[1000] ${isOpen ? 'visible' : 'invisible'}`}>
            <div
                className={`absolute inset-0 bg-[#050510]/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            <div className={`absolute top-0 right-0 h-full bg-[#08081a] border-l border-white/10 shadow-2xl will-change-transform transition-transform duration-400 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } ${showKnowledge ? 'w-full' : 'w-[85%] max-w-[360px]'}`}>

                <div className="flex flex-col h-full relative overflow-hidden">

                    {/* Кнопка назад — Фикс центровки текста */}
                    <div className={`absolute top-6 left-6 z-[130] transition-all duration-500 ${showKnowledge ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                        <button
                            onClick={onToggleKnowledge}
                            className="
            flex items-center justify-center gap-2
            text-white/90
            bg-white/[0.05]
            backdrop-blur-2xl
            px-5 py-3
            rounded-full
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]
            active:scale-95
            transition-all
            duration-300
            group
        "
                        >
                            <div className="flex items-center justify-center">
                                <ChevronLeft size={18} className="text-fuchsia-500 group-hover:-translate-x-0.5 transition-transform" />
                            </div>

                            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none flex items-center pt-[1px]">
            Вернуться в меню
        </span>
                        </button>
                    </div>


                    {/* Слой Базы Знаний */}
                    <div className={`absolute inset-0 z-[120] overflow-y-auto no-scrollbar bg-[#08081a] will-change-transform transition-transform duration-400 ease-in-out ${showKnowledge ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="p-6 pt-24 pb-12">
                            <RhythmKnowledgeView />
                        </div>
                    </div>

                    {/* Основное Меню */}
                    <div
                        ref={scrollContainerRef}
                        className={`flex-1 overflow-y-auto no-scrollbar scroll-smooth transition-opacity duration-300 ${!showKnowledge ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <div className="p-6 pt-12">
                            <div className="mb-10 px-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-600 shadow-[0_0_8px_rgba(192,38,211,0.8)]" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Гороскоп v1.0.0</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Меню</h2>
                            </div>

                            <div className="space-y-8">
                                {/* Информация */}
                                <div className="space-y-3">
                                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-1">Информация</h3>
                                    <button onClick={onToggleKnowledge} className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-all group">
                                        <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-400"><BookOpen size={20} /></div>
                                        <div className="text-left">
                                            <div className="text-[11px] font-black text-white uppercase italic">База знаний</div>
                                            <div className="text-[8px] text-white/30 uppercase font-bold">Алгоритмы и справка</div>
                                        </div>
                                    </button>
                                </div>

                                {/* Поддержка */}
                                <div className="space-y-3">
                                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-1">Поддержка</h3>
                                    <a href={`mailto:${supportEmail}`} className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-all group">
                                        <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-400"><Mail size={20} /></div>
                                        <div className="text-left">
                                            <div className="text-[11px] font-black text-white uppercase italic">Техподдержка</div>
                                            <div className="text-[8px] text-fuchsia-500/60 uppercase font-bold tracking-tighter">{supportEmail}</div>
                                        </div>
                                    </a>
                                </div>

                                {/* Создатель */}
                                <div className="space-y-3" ref={creatorRef}>
                                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-1">Создатель</h3>
                                    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isLegalOpen ? 'bg-white/5 border-fuchsia-500/30' : 'bg-white/[0.02] border-white/10'}`}>
                                        <button onClick={toggleLegal} className="w-full p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-fuchsia-400">
                                                <Building2 size={18} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">ИП АНТОНОВ А.О.</span>
                                            </div>
                                            <ChevronDown size={16} className={`text-white/20 transition-transform duration-300 ${isLegalOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Исправленный контейнер анимации */}
                                        <div className={`
            grid transition-all duration-300 ease-in-out will-change-[grid-template-rows,opacity]
            ${isLegalOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 invisible'}
        `}>
                                            <div className="overflow-hidden">
                                                {/* Внутренний контейнер с min-w для предотвращения скачков текста */}
                                                <div className="px-5 pb-5 space-y-4 pt-2 min-w-[280px]">
                                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                                        <div onClick={() => setIsPhotoModalOpen(true)} className="w-12 h-12 rounded-xl bg-black border border-fuchsia-500/30 overflow-hidden relative group cursor-pointer">
                                                            <img src={photoPath} alt="Founder" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                            <div className="absolute inset-0 bg-fuchsia-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                <Maximize2 size={12} className="text-fuchsia-400" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-black text-white uppercase tracking-tight">Антонов Алексей Олегович</div>
                                                            <div className="text-[8px] text-fuchsia-500/60 uppercase font-bold">Основатель</div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-white/5 text-[9px] font-mono">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-white/30 uppercase">ИНН</span>
                                                            <div className="flex items-center gap-2 text-white/70">
                                                                {inn}
                                                                <button onClick={() => handleCopy(inn, 'inn')}>
                                                                    {copiedField === 'inn' ? <Check size={10} className="text-fuchsia-400"/> : <Copy size={10}/>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-white/30 uppercase">ОГРНИП</span>
                                                            <div className="flex items-center gap-2 text-white/70">
                                                                {ogrnip}
                                                                <button onClick={() => handleCopy(ogrnip, 'ogrnip')}>
                                                                    {copiedField === 'ogrnip' ? <Check size={10} className="text-fuchsia-400"/> : <Copy size={10}/>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-between pt-1">
                                                            <span className="text-white/30 uppercase">Адрес</span>
                                                            <span className="text-white/70 text-right max-w-[140px]">{address}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-1">
                                                            <span className="text-white/30 uppercase">E-mail</span>
                                                            <a href={`mailto:${supportEmail}`} className="text-fuchsia-400/80 hover:text-fuchsia-400 transition-colors">{supportEmail}</a>
                                                        </div>
                                                        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                                            <span className="text-white/30 uppercase">Donate</span>
                                                            <a href={donatePageUrl} target="_blank" rel="noreferrer" className="text-fuchsia-400 flex items-center gap-1 font-bold italic">
                                                                <Heart size={10} fill="currentColor" className="animate-pulse"/> ЮMoney
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Правовой статус */}
                                <div className="space-y-3">
                                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-1">Правовой статус</h3>
                                    <div className="space-y-2 pb-10">
                                        <button onClick={() => onDocSelect('terms')} className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between active:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <FileText size={16} className="text-white/20 group-hover:text-fuchsia-400 transition-colors" />
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-tight">Пользовательское соглашение</span>
                                            </div>
                                            <ExternalLink size={12} className="text-white/10" />
                                        </button>
                                        <button onClick={() => onDocSelect('privacy')} className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between active:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <Shield size={16} className="text-white/20 group-hover:text-fuchsia-400 transition-colors" />
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-tight">Политика конфиденциальности</span>
                                            </div>
                                            <ExternalLink size={12} className="text-white/10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-[#08081a]">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">ИП Антонов Алексей Олегович</div>
                                <div className="text-[7px] font-bold text-fuchsia-600/30 uppercase tracking-[0.2em]">© 2026 Все права защищены</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {activeDoc === 'privacy' && <PrivacyPolicy onBack={() => onDocSelect(null)} />}
            {activeDoc === 'terms' && <TermsOfService onBack={() => onDocSelect(null)} />}

            {isPhotoModalOpen && (
                <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setIsPhotoModalOpen(false)}>
                    <div className="relative w-full max-w-xs aspect-square border border-fuchsia-500/30 p-1 bg-black shadow-[0_0_50px_rgba(236,72,153,0.15)]">
                        <img src={photoPath} alt="Founder" className="w-full h-full object-cover" />
                        <div className="absolute -bottom-16 left-0 w-full text-center">
                            <div className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-500">Алексей Антонов</div>
                            <div className="text-[9px] text-white/30 uppercase mt-1 tracking-widest font-bold">Архитектор Системы</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
