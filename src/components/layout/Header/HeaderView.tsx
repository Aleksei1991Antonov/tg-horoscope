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
        <header className="sticky top-0 z-50 w-full px-[1rem] pt-[1rem] pb-[0.5rem] bg-[var(--c-bg-60)] backdrop-blur-2xl">
            <div className="max-w-md mx-auto flex justify-between items-center bg-[var(--c-surface)] border border-[var(--c-border)] p-[0.5rem] pl-[0.75rem] rounded-[1.5rem] gap-[0.5rem]">
                <div className="flex items-center gap-[0.75rem] min-w-0 flex-1">
                    <button
                        onClick={onZodiacClick}
                        className="relative flex-shrink-0 outline-none"
                    >
                        <div className={`relative ${iconSize} flex items-center justify-center bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-secondary)] p-[2px] rounded-[1rem] overflow-hidden active:scale-90 transition-all`}>
                            <div className="w-full h-full rounded-[calc(1rem-2px)] bg-[var(--c-bg)] flex items-center justify-center">
                                <span className={`${emojiSize}`}>{zodiacSign}</span>
                            </div>
                        </div>
                    </button>

                    <div className="flex flex-col min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-[0.4rem] w-full">
                            <span className={`font-black tracking-tight text-[var(--c-text)] uppercase truncate ${getFontSizeClass(userName)}`}>
                                {userName}
                            </span>
                            <span className="w-[0.25rem] h-[0.25rem] rounded-full bg-[var(--c-surface-elevated)] flex-shrink-0" />
                            <span className={`${zodiacLabelSize} font-bold text-[var(--c-primary)] uppercase tracking-widest flex-shrink-0`}>
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
                    className={`${iconSize} flex-shrink-0 flex items-center justify-center rounded-[1rem] bg-[var(--c-surface)] border border-[var(--c-border)] hover:bg-[var(--c-surface-elevated)] active:scale-90 transition-all text-[var(--c-text-50)] hover:text-[var(--c-text)]`}
                >
                    <Menu size={fontScale === 'large' ? "1.5rem" : "1.25rem"} strokeWidth={2.5} />
                </button>
            </div>
        </header>
    );
};