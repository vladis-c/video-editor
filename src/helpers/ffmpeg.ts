import {FFmpegKit, FFmpegKitConfig, Level} from 'ffmpeg-kit-react-native';
import {generateFileName} from './files';
import {wait} from './utils';

const checkFfmpegResult = async (ffmpegCommand: string) => {
  FFmpegKitConfig.setLogLevel(Level.AV_LOG_QUIET);
  try {
    const session = await FFmpegKit.executeAsync(ffmpegCommand);
    let count = 1;
    const checkStatus = async () => {
      while ((await session.getReturnCode()).isValueError()) {
        await wait(1000);
        count++;
        console.log('Ffmpeg is not ready, count seconds:', count);
      }
      count++;
      await wait(1000);
      console.log(
        'Ffmpeg value success is:',
        (await session.getReturnCode()).isValueSuccess(),
        'count seconds:',
        count,
      );
      return true;
    };
    return await checkStatus();
  } catch (error) {
    console.log('checkFfmpegResult error', error);
    return false;
  }
};

export const ffmpegCompressVideo = async (path: string) => {
  try {
    // Remove "file://" prefix
    const trimmedPath = path.replace('file://', '');
    // Generate a unique file name for the edited video
    const editedVideoPath = `file:///storage/emulated/0/DCIM/${generateFileName()}_c.mp4`;
    const ffmpegCommand = `-f mp4 -y -i ${trimmedPath} -b:v 3000k -b:a 128k -preset veryfast ${editedVideoPath}`;
    const executeFinished = await checkFfmpegResult(ffmpegCommand);
    return executeFinished;
  } catch (error) {
    console.log('ffmpegCompressVideo error', error);
    return false;
  }
};
