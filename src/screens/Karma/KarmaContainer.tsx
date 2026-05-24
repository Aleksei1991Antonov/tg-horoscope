import React, { useState, useMemo, useCallback } from 'react';
import { KarmaView } from './KarmaView';
import { triggerSuccessHaptic } from '../../utils/haptics';

const REFERRAL_URL = 'https://max.ru/id760407796785_biz';

interface KarmaContainerProps {
    zodiacName?: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const KarmaContainer: React.FC<KarmaContainerProps> = ({ fontScale }) => {
    const userData = useMemo(() => {
        const data = window.WebApp?.initDataUnsafe?.user;
        const firstName = data?.first_name || '';
        const lastName = data?.last_name || '';
        return {
            name: [firstName, lastName].filter(Boolean).join(' '),
            photoUrl: data?.photo_url || undefined,
        };
    }, []);

    const [inviteCount, setInviteCount] = useState(() => {
        const saved = localStorage.getItem('user_karma_invites');
        return saved ? parseInt(saved, 10) : 0;
    });

    const handleInvite = useCallback(() => {
        const shareText = `✨ Присоединяйся к гороскопу! ${REFERRAL_URL}`;

        const onShared = () => {
            const newCount = inviteCount + 1;
            setInviteCount(newCount);
            localStorage.setItem('user_karma_invites', newCount.toString());
            void triggerSuccessHaptic();
        };

        if (window.WebApp?.shareContent) {
            void window.WebApp.shareContent({ text: shareText })
                .then(({ status }) => { if (status === 'shared') onShared(); })
                .catch(() => {});
        } else if (navigator.share) {
            void navigator.share({ text: shareText })
                .then(() => onShared())
                .catch(() => {});
        } else {
            void navigator.clipboard.writeText(REFERRAL_URL)
                .then(() => onShared())
                .catch(() => {});
        }
    }, [inviteCount]);

    return (
        <KarmaView
            userName={userData.name}
            userPhotoUrl={userData.photoUrl}
            inviteCount={inviteCount}
            onInvite={handleInvite}
            referralUrl={REFERRAL_URL}
            fontScale={fontScale}
        />
    );
};
