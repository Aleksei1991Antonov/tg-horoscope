import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderViewProps {
    userName: string;
    zodiacSign: string;
    zodiacName: string;
    formattedDate: string;
    onMenuClick: () => void;
    onZodiacClick: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

// ОБЯЗАТЕЛЬНО должен быть export перед const
export const HeaderView: React.FC<HeaderViewProps> = ({
                                                          userName,
                                                          zodiacSign,
                                                          zodiacName,
                                                          formattedDate,
                                                          onMenuClick,
                                                          onZodiacClick,
                                                          fontScale
                                                      }) => {

    const getFontSizeClass = (name: string) => {
        const len = name.length;
        const isLarge = fontScale === 'large';
        if (len > 20) return isLarge ? 'text-[0.75rem]' : 'text-[0.65rem]';
        if (len > 15) return isLarge ? 'text-[0.8rem]' : 'text-[0.7rem]';
        if (len > 10) return isLarge ? 'text-[0.9rem]' : 'text-[0.8rem]';
        return isLarge ? 'text-[1rem]' : 'text-[0.875rem]';
    };

    const dateSize = fontScale === 'large' ? 'text-[0.65rem]' : 'text-[0.55rem]';
    const zodiacLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.65rem]';
    const iconSize = fontScale === 'large' ? 'w-[3.25rem] h-[3.25rem]' : 'w-[2.75rem] h-[2.75rem]';
    const emojiSize = fontScale === 'large' ? 'text-[1.8rem]' : 'text-[1.5rem]';

    return (
        <header className="sticky top-0 z-50 w-full px-[1rem] pt-[1rem] pb-[0.5rem] bg-[#050510]/60 backdrop-blur-2xl">
            <div className="max-w-md mx-auto flex justify-between items-center bg-white/[0.03] border border-white/10 p-[0.5rem] pl-[0.75rem] rounded-[1.5rem] shadow-2xl gap-[0.5rem]">
                <div className="flex items-center gap-[0.75rem] min-w-0 flex-1">
                    <button
                        onClick={onZodiacClick}
                        className="relative group outline-none flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-fuchsia-500/20 blur-lg rounded-full group-hover:bg-fuchsia-500/40 transition-all" />
                        <div className={`relative ${iconSize} flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-[1rem] shadow-inner overflow-hidden active:scale-90 transition-all`}>
                            <span className={`${emojiSize} drop-shadow-md`}>{zodiacSign}</span>
                        </div>
                    </button>

                    <div className="flex flex-col min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-[0.4rem] w-full">
                            <span className={`font-black tracking-tight text-white uppercase truncate ${getFontSizeClass(userName)}`}>
                                {userName}
                            </span>
                            <span className="w-[0.25rem] h-[0.25rem] rounded-full bg-white/20 flex-shrink-0" />
                            <span className={`${zodiacLabelSize} font-bold text-fuchsia-400/90 uppercase tracking-tighter flex-shrink-0`}>
                                {zodiacName}
                            </span>
                        </div>
                        <div className="flex items-center gap-[0.25rem] opacity-40">
                            <span className={`${dateSize} font-bold uppercase tracking-widest leading-none`}>
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onMenuClick}
                    className={`${iconSize} flex-shrink-0 flex items-center justify-center rounded-[1rem] bg-white/5 border border-white/5 hover:bg-white/10 active:scale-90 transition-all text-white/70 hover:text-white`}
                >
                    <Menu size={fontScale === 'large' ? "1.5rem" : "1.25rem"} strokeWidth={2.5} />
                </button>
            </div>
        </header>
    );
};