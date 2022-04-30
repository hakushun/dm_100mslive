import { useHMSActions } from '@100mslive/react-sdk';
import type { VFC } from 'react';

export const LeaveButton: VFC = () => {
  const hmsActions = useHMSActions();

  const handleClick = () => {
    hmsActions.leave();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="self-center px-4 py-2 text-white bg-red-600 rounded shadow-lg">
      Leave
    </button>
  );
};
