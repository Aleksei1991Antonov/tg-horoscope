import React from 'react';
import { Globe, Shield, FileText } from 'lucide-react';

interface MenuViewProps {
    isOpen: boolean;
    onClose: () => void;
    currentLang: string;
    languages: string[];
    onLanguageSelect: (lang: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      currentLang,
                                                      languages,
                                                      onLanguageSelect
                                                  }) => {
    return (
        <div
            className={`fixed inset-0 z-[1000] ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
        >
            {/* Область закрытия (Backdrop) — теперь это единственный способ закрыть меню */}
            <div
                className={`absolute inset-0 bg-[#050510]/60 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Панель настроек */}
            <div
                className={`absolute top-0 right-0 w-[82%] max-w-[320px] h-full bg-[#08081a] border-l border-white/10 shadow-[-20px_0_80px_rgba(0,0,0,0.9)] 
        will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-8">

                    {/* Заголовок терминала */}
                    <div className="mb-12 pt-2">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-1 h-1 rounded-full bg-fuchsia-600 shadow-[0_0_8px_rgba(192,38,211,0.5)]" />
                            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">System Terminal</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Настройки</h2>
                    </div>

                    {/* Основной стек */}
                    <div className="flex-1 space-y-10 overflow-y-auto pr-1 scrollbar-hide">

                        {/* Секция: Локализация */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 opacity-20 px-1">
                                <Globe size={10} />
                                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Локализация</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => onLanguageSelect(lang)}
                                        className={`py-4 px-6 rounded-2xl border transition-all duration-300 ${
                                            currentLang === lang
                                                ? 'bg-white/5 border-white/20 text-white'
                                                : 'bg-transparent border-white/5 text-white/20'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                      <span className="font-bold tracking-[0.15em] text-[10px] uppercase italic">
                        {lang === 'RU' ? 'Русский' : 'English'}
                      </span>
                                            {currentLang === lang && (
                                                <div className="w-1 h-1 rounded-full bg-fuchsia-500 shadow-[0_0_10px_#ec4899]" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Секция: Правовая информация */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 opacity-20 px-1">
                                <Shield size={10} />
                                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Правовой статус</span>
                            </div>
                            <div className="space-y-2">
                                <button className="w-full py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between active:bg-white/5 transition-all group">
                                    <span className="text-[10px] font-bold tracking-tight text-white/40 uppercase italic group-active:text-white/80">Соглашение</span>
                                    <FileText size={14} className="text-white/10" />
                                </button>
                                <button className="w-full py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between active:bg-white/5 transition-all group">
                                    <span className="text-[10px] font-bold tracking-tight text-white/40 uppercase italic group-active:text-white/80">Приватность</span>
                                    <Shield size={14} className="text-white/10" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Подвал */}
                    <div className="pt-8 border-t border-white/5 flex flex-col gap-1">
                        <div className="flex justify-between items-end">
                            <span className="text-[7px] font-bold text-white/10 uppercase tracking-[0.4em]">Core v.0.1.4</span>
                            <span className="text-[9px] font-black text-fuchsia-600/30 uppercase italic">Astro Terminal</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};