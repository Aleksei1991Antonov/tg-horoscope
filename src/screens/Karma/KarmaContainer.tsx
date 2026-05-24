import React, { useState, useMemo, useCallback } from 'react';
import { KarmaView } from './KarmaView';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface KarmaContainerProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const KarmaContainer: React.FC<KarmaContainerProps> = ({ zodiacName, fontScale }) => {
    const userData = useMemo(() => {
        const data = window.WebApp?.initDataUnsafe?.user;
        return {
            name: data?.first_name || zodiacName,
            photoUrl: data?.photo_url || undefined,
        };
    }, [zodiacName]);

    const [inviteCount, setInviteCount] = useState(() => {
        const saved = localStorage.getItem('user_karma_invites');
        return saved ? parseInt(saved, 10) : 0;
    });

    const handleInvite = useCallback(() => {
        const shareText = '✨ Присоединяйся! Гороскоп: совместимость, ритм, карма и красота по знаку зодиака.';

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
            void navigator.clipboard.writeText(shareText)
                .then(() => {
                    onShared();
                })
                .catch(() => {});
        }
    }, [inviteCount]);

    return (
        <KarmaView
            userName={userData.name}
            userPhotoUrl={userData.photoUrl}
            inviteCount={inviteCount}
            onInvite={handleInvite}
            fontScale={fontScale}
        />
    );
};
