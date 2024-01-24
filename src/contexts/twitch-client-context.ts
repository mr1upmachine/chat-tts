import { createContext } from "preact";
import { Client as TwitchClient, Options as TwitchClientOptions } from "tmi.js";

const twitchConfig: TwitchClientOptions = {
  identity: {
    username: "mr1upmachine",
    password: import.meta.env.VITE_PASSWORD, // Get this from https://twitchapps.com/tmi/
  },
  channels: ["mr1upmachine"],
  options: {
    skipUpdatingEmotesets: true,
  },
};

const twitchClient = new TwitchClient(twitchConfig);

export const TwitchClientContext = createContext(twitchClient);
