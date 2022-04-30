import {
  selectDevices,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import type { VFC } from 'react';
import { Listbox, Popover, Switch } from '@headlessui/react';

export const VideoController: VFC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const { isLocalVideoEnabled, toggleVideo } = useAVToggle();

  const handleChangeVideo = async (deviceId: string) => {
    await hmsActions.setVideoSettings({ deviceId });
  };

  return (
    <div className="relative flex flex-col items-center gap-1">
      <Popover className="relative">
        {({ close }) => (
          <>
            <Popover.Button>Video</Popover.Button>
            <Popover.Panel className="absolute z-10 bottom-full left-0 py-2 w-max rounded bg-gray-100 shadow-lg">
              <span className="py-1 px-2">Camera:</span>
              <Listbox value={selectedDevices.videoInputDeviceId} onChange={handleChangeVideo}>
                <Listbox.Options static>
                  {devices.videoInput.map((videoInput) => (
                    <Listbox.Option
                      key={videoInput.deviceId}
                      value={videoInput.deviceId}
                      onClick={() => close()}
                      className={`py-1 px-5 cursor-pointer  ${
                        videoInput.deviceId === selectedDevices.videoInputDeviceId
                          ? 'bg-blue-500 font-bold'
                          : 'hover:bg-gray-200'
                      }`}>
                      {videoInput.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <Switch
        checked={isLocalVideoEnabled}
        onChange={toggleVideo ?? (() => {})}
        className={`${
          isLocalVideoEnabled ? 'bg-blue-600' : 'bg-gray-200'
        } focus:outline-none relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
        <span
          className={`${
            isLocalVideoEnabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
