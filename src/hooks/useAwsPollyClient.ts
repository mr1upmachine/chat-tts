import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { useCallback } from "preact/hooks";

export function useAwsPollyClient() {
  const initPollyClient = useCallback(async () => {
    const polly = new PollyClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_KEY_VALUE,
      },
    });

    const command = new SynthesizeSpeechCommand({
      Text: "I like shorts, they are comfy and easy to wear!",
      OutputFormat: "mp3",
      VoiceId: "Russell",
    });

    const res = await polly.send(command as any);
    console.log("res: ", res);

    // Convert the audio stream to a blob
    const data = await (res as any).AudioStream.transformToString();
    console.log("data: ", data);
    const audioBlob = new Blob([data], {
      type: "audio/mpeg",
    });

    // Create a URL for the blob
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log("audioUrl: ", audioUrl);

    // Set the blob URL as the source of the audio element
    const audio = new Audio(audioUrl);
    audio.play();
    console.log("audio: ", audio);
  }, []);

  return {
    initPollyClient,
  };
}
