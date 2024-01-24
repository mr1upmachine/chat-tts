import { useEffect } from "preact/hooks";
import { Events as TwitchEvents } from "tmi.js";

import { useTwitchClient } from "./useTwitchClient";

export function useTwitchEvent<T extends keyof TwitchEvents>(
  eventName: T,
  event: TwitchEvents[T]
) {
  const { twitchClient } = useTwitchClient();

  useEffect(() => {
    // @ts-ignore
    twitchClient.on(eventName, event);
  }, []);
}
