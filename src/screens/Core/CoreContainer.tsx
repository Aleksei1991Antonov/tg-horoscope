import React, { useMemo, useState, useEffect } from 'react';
import { CoreView } from './CoreView';
import { TalentTreeView } from './TalentTreeView';
import { RecommendationsView } from './RecommendationsView';
import { CoreEngine } from '../../core/engines/CoreEngine';

interface CoreContainerProps {
    zodiacName?: string;
    fontScale: 'small' | 'medium' | 'large';
    onSetBackHandler?: (handler: (() => void) | null) => void;
}

export const CoreContainer: React.FC<CoreContainerProps> = ({ zodiacName = 'Скорпион', fontScale, onSetBackHandler }) => {
    const [isTalentsOpen, setIsTalentsOpen] = useState(false);
    const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

    useEffect(() => {
        if (onSetBackHandler) {
            onSetBackHandler(isTalentsOpen ? () => setIsTalentsOpen(false) : isRecommendationsOpen ? () => setIsRecommendationsOpen(false) : null);
        }
    }, [isTalentsOpen, isRecommendationsOpen, onSetBackHandler]);

    const profile = useMemo(() => {
        return CoreEngine.getProfile(zodiacName);
    }, [zodiacName]);

    if (isTalentsOpen) {
        return (
            <div className="fixed inset-0 z-[5000] bg-[var(--c-bg)] overflow-y-auto">
                <TalentTreeView
                    zodiacName={zodiacName}
                    fontScale={fontScale}
                />
            </div>
        );
    }

    if (isRecommendationsOpen) {
        return (
            <div className="fixed inset-0 z-[5000] bg-[var(--c-bg)] overflow-y-auto">
                <RecommendationsView
                    zodiacName={zodiacName}
                    fontScale={fontScale}
                />
            </div>
        );
    }

    return (
        <CoreView
            profile={profile}
            fontScale={fontScale}
            onOpenTalents={() => setIsTalentsOpen(true)}
            onOpenRecommendations={() => setIsRecommendationsOpen(true)}
        />
    );
};
