import { useState } from 'react';

export interface GlobalSettings {
    cols: number;
}

export const useGlobalSettings = () => {
    const [settings, setSettings] = useState<GlobalSettings>({
        cols: 12,
    });

    return settings;
};
