import React, { useState, useMemo, useCallback } from 'react';
import { CoreView } from './CoreView';
import { CoreEngine } from '../../core/engines/CoreEngine';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface CoreContainerProps {
    zodiacName?: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const CoreContainer: React.FC<CoreContainerProps> = ({ zodiacName = 'Скорпион', fontScale }) => {
    const userData = useMemo(() => {
        const data = window.WebApp?.initDataUnsafe?.user;
        const firstName = data?.first_name || '';
        const lastName = data?.last_name || '';
        return {
            name: [firstName, lastName].filter(Boolean).join(' '),
            photoUrl: data?.photo_url || undefined,
        };
    }, []);

    const profile = useMemo(() => {
        return CoreEngine.getProfile(zodiacName);
    }, [zodiacName]);

    const [isPremium, setIsPremium] = useState(() => {
        return localStorage.getItem('core_premium') === 'true';
    });

    const handleTogglePremium = useCallback(() => {
        void triggerSuccessHaptic();
        const next = !isPremium;
        setIsPremium(next);
        localStorage.setItem('core_premium', next.toString());
    }, [isPremium]);

    return (
        <CoreView
            userName={userData.name}
            userPhotoUrl={userData.photoUrl}
            profile={profile}
            fontScale={fontScale}
            isPremium={isPremium}
            onTogglePremium={handleTogglePremium}
        />
    );
};
