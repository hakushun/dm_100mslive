import {
  selectDevices,
  selectLocalMediaSettings,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import type { VFC } from 'react';
import { Listbox, Popover, Switch } from '@headlessui/react';

export const AudioController: VFC = () => {
  const hmsActions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle();

  const handleChangeAudioInput = async (deviceId: string) => {
    await hmsActions.setAudioSettings({ deviceId });
  };
  const handleChangeAudioOutput = (deviceId: string) => {
    hmsActions.setAudioOutputDevice(deviceId);
  };

  return (
    <div className="relative flex flex-col items-center gap-1">
      <Popover className="relative">
        {({ close }) => (
          <>
            <Popover.Button>Mic</Popover.Button>
            <Popover.Panel className="absolute z-10 bottom-full left-0 py-2 w-max rounded bg-gray-100 shadow-lg">
              <span className="py-1 px-2">Microphone:</span>
              <Listbox value={selectedDevices.audioInputDeviceId} onChange={handleChangeAudioInput}>
                <Listbox.Options static>
                  {devices.audioInput.map((audioInput) => (
                    <Listbox.Option
                      key={audioInput.deviceId}
                      value={audioInput.deviceId}
                      onClick={() => close()}
                      className={`py-1 px-5 cursor-pointer  ${
                        audioInput.deviceId === selectedDevices.audioInputDeviceId
                          ? 'bg-blue-500 font-bold'
                          : 'hover:bg-gray-200'
                      }`}>
                      {audioInput.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
              <hr className="my-2 border-gray-900 " />
              <span className="py-1 px-2">Speaker:</span>
              <Listbox
                value={selectedDevices.audioOutputDeviceId}
                onChange={handleChangeAudioOutput}>
                <Listbox.Options static>
                  {devices.audioOutput.map((audioOutput) => (
                    <Listbox.Option
                      key={audioOutput.deviceId}
                      value={audioOutput.deviceId}
                      onClick={() => close()}
                      className={`py-1 px-5 cursor-pointer  ${
                        audioOutput.deviceId === selectedDevices.audioOutputDeviceId
                          ? 'bg-blue-500 font-bold'
                          : 'hover:bg-gray-200'
                      }`}>
                      {audioOutput.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <Switch
        checked={isLocalAudioEnabled}
        onChange={toggleAudio ?? (() => {})}
        className={`${
          isLocalAudioEnabled ? 'bg-blue-600' : 'bg-gray-200'
        } focus:outline-none relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
        <span
          className={`${
            isLocalAudioEnabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
