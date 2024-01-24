import { useCallback, useContext } from "preact/hooks";
import { TwitchClientContext } from "../contexts/twitch-client-context";

export function useTwitchClient() {
  const twitchClient = useContext(TwitchClientContext);

  const connectTwitchClient = useCallback(() => {
    twitchClient.connect();

    twitchClient.on("connected", () => {
      console.log("Twitch client connected");
    });
    twitchClient.on("disconnected", () => {
      console.log("Twitch client disconnected");
    });
  }, []);

  return {
    connectTwitchClient,
    twitchClient,
  };
}
