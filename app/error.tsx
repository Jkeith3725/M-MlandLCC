'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <h2 className="text-2xl font-bold text-brown-dark mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">We apologize for the inconvenience.</p>
            <Button
                onClick={() => reset()}
                variant="primary"
            >
                Try again
            </Button>
        </div>
    );
}
