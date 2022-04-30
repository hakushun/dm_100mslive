import { HMSPeer, selectScreenShareByPeerID, useHMSStore, useVideo } from '@100mslive/react-sdk';
import type { VFC } from 'react';

type Props = {
  peer: HMSPeer;
};
export const Peer: VFC<Props> = ({ peer }) => {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack?.id ?? peer.videoTrack,
  });

  return (
    <div className="flex flex-col gap-2 items-center self-center justify-self-center">
      <video
        ref={videoRef}
        className="rounded"
        autoPlay
        muted
        playsInline
        style={{ transform: 'scaleX(-1)' }}
      />
      <span className="text-white">
        {peer.name} {peer.isLocal && '(You)'}
      </span>
    </div>
  );
};
