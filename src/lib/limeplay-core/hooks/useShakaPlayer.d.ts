import * as React from 'react';
import shaka from 'shaka-player';

declare function useShakaPlayer(): {
    playerRef: React.MutableRefObject<shaka.Player>;
    playbackRef: React.MutableRefObject<HTMLMediaElement>;
    error: shaka.util.Error;
    isLoaded: boolean;
};

export { useShakaPlayer };
