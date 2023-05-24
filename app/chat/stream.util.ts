import { PeerServer } from 'peer';
import { Peer } from 'peerjs';

export const peer = new Peer();

export const openSteam = (): Promise<MediaStream> => {
  const config = { audio: true, video: true };

  try {
    return navigator.mediaDevices.getUserMedia(config);
  } catch (err) {
    return navigator.mediaDevices.getUserMedia(config);
  }
};
export const playStream = (
  element: HTMLVideoElement | any,
  remoteStream: MediaProvider | null
) => {
  if (element) {
    element.srcObject = remoteStream;
    element.play();
  }
};
