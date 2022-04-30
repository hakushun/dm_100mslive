import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import type { VFC } from 'react';
import { Controller } from './Controller';
import { Peer } from './Peer';

export const VideoChat: VFC = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="grid grid-flow-col flex-1 gap-4 p-8">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
      <Controller />
    </div>
  );
};
