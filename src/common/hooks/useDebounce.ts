import { useState, useEffect } from 'react';

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

/* naive implementation of debounce */
export const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        // set debouncedValue to passed in value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
