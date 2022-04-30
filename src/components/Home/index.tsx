import { useHMSStore, selectIsConnectedToRoom, useHMSActions } from '@100mslive/react-sdk';
import { useEffect, VFC } from 'react';
import { VideoChat } from '../VideoChat';
import { JoinForm } from '../JoinForm';

export const Home: VFC = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return <>{isConnected ? <VideoChat /> : <JoinForm />}</>;
};
