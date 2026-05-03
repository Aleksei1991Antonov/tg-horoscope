import React from 'react';
import { Panel } from '@maxhub/max-ui';

interface PageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
    return (
        <Panel mode="secondary" className={`min-h-screen flex flex-col font-manrope ${className}`}>
            <main className="flex-1 overflow-y-auto px-4 py-1 pb-1">
                <div className="max-w-md mx-auto">
                    {children}
                </div>
            </main>
        </Panel>
    );
};