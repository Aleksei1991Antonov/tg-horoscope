import React, { useMemo } from 'react';
import { CoreView } from './CoreView';
import { CoreEngine } from '../../core/engines/CoreEngine';

interface CoreContainerProps {
    zodiacName?: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const CoreContainer: React.FC<CoreContainerProps> = ({ zodiacName = 'Скорпион', fontScale }) => {
    const profile = useMemo(() => {
        return CoreEngine.getProfile(zodiacName);
    }, [zodiacName]);

    return (
        <CoreView
            profile={profile}
            fontScale={fontScale}
        />
    );
};
