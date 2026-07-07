import React from 'react';

interface PageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
    return (
        <div className={`h-full w-full bg-transparent flex flex-col font-manrope overflow-hidden ${className}`}>
            <main className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide overscroll-contain touch-pan-y min-h-0">
                <div className="max-w-md mx-auto h-full">
                    {children}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { 
                    display: none; 
                }
                .scrollbar-hide { 
                    -ms-overflow-style: none; 
                    scrollbar-width: none; 
                }
            `}} />
        </div>
    );
};