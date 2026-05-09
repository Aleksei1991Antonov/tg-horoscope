import React from 'react';
import { Panel } from '@maxhub/max-ui';

interface PageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
    return (
        <Panel
            mode="secondary"
            className={`h-full w-full bg-transparent flex flex-col font-manrope overflow-hidden ${className}`}
        >
            {/*
              min-h-0 — критически важно для flex-item, чтобы overflow-y-auto заработал.
              pb-20 — гарантирует, что контент не перекроется навигацией.
            */}
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
        </Panel>
    );
};