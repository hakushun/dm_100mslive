import { ChangeEvent, FormEvent, useCallback, useState, VFC } from 'react';
import { useHMSActions } from '@100mslive/react-sdk';
import { TOKEN } from '../../libs/constans';

export const JoinForm: VFC = () => {
  const hmsActions = useHMSActions();
  const [userName, setUserName] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (TOKEN == null) {
        throw new Error();
      }
      hmsActions.join({
        userName,
        authToken: TOKEN,
      });
    },
    [hmsActions, userName],
  );

  return (
    <div className="grid place-items-center h-screen bg-gray-50">
      <form
        className="flex flex-col gap-4 w-96 p-8 bg-gray-300 rounded shadow-xl"
        onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Join Room</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="user_name">User Name:</label>
          <input
            type="text"
            id="user_name"
            name="name"
            required
            value={userName}
            onChange={handleChange}
            className="px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="self-center px-4 py-2 text-white bg-gray-700 rounded shadow-lg">
          Join
        </button>
      </form>
    </div>
  );
};
