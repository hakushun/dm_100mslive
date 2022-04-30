import type { VFC } from 'react';
import { AudioController } from './AudioController';
import { VideoController } from './VideoController';
import { ScreenShareController } from './ScreenShareController';
import { LeaveButton } from './LeaveButton';

export const Controller: VFC = () => {
  return (
    <div className="grid grid-cols-3 px-2 py-4 bg-gray-300">
      <div className="flex justify-evenly py-2">
        <AudioController />
        <VideoController />
      </div>
      <div className="flex justify-center py-2">
        <ScreenShareController />
      </div>
      <div className="flex justify-center py-2">
        <LeaveButton />
      </div>
    </div>
  );
};
