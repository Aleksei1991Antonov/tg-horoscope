import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderViewProps {
    userName: string;
    zodiacSign: string;
    formattedDate: string;
    onMenuClick: () => void;
    onZodiacClick: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

// ОБЯЗАТЕЛЬНО должен быть export перед const
export const HeaderView: React.FC<HeaderViewProps> = ({
                                                          userName,
                                                          zodiacSign,
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
    const iconSize = fontScale === 'large' ? 'w-14 h-14' : 'w-12 h-12';
    const emojiSize = fontScale === 'large' ? 'text-[1.8rem]' : 'text-[1.5rem]';

    return (
        <header className="sticky top-0 z-50 w-full px-[1rem] pt-[1rem] pb-[0.5rem]"
                style={{
                    borderBottom: '1px solid var(--c-border)',
                    background: 'var(--c-bg-90)',
                    WebkitBackdropFilter: 'blur(10px)',
                    backdropFilter: 'blur(10px)'
                }}>
            <div className="max-w-md mx-auto flex items-center bg-[var(--c-surface)]/80 backdrop-blur-3xl border border-[var(--c-border)] p-[0.5rem] rounded-[2rem] gap-[0.5rem]">
                <button
                    onClick={onZodiacClick}
                    className="flex-shrink-0 outline-none"
                >
                    <span className={`${iconSize} flex items-center justify-center ${emojiSize} active:scale-90 transition-all`}>{zodiacSign}</span>
                </button>

                <div className="flex flex-col min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-[0.4rem] w-full">
                        <span className={`font-black tracking-tight text-[var(--c-text)] uppercase truncate ${getFontSizeClass(userName)}`}>
                            {userName}
                        </span>
                    </div>
                    <div className="flex items-center gap-[0.25rem] opacity-40">
                        <span className={`${dateSize} font-bold uppercase tracking-widest leading-none`}>
                            {formattedDate}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onMenuClick}
                    className="flex-shrink-0 outline-none active:scale-90 transition-all"
                >
                    <div className={`${iconSize} flex items-center justify-center`}>
                        <Menu size="1.5rem" strokeWidth={1.5} className="text-[var(--c-text-30)]" />
                    </div>
                </button>
            </div>
        </header>
    );
};