import { useState } from "preact/hooks";

import { Message } from "../classes/message";
import { useTwitchEvent } from "./useTwitchEvent";

const USER_ALLOWLIST = ["mr1upmachine"];

export function useMessageQueue() {
  const [queue, setQueue] = useState<readonly Message[]>([]);

  useTwitchEvent("message", (channel, tags, message, self) => {
    const { username } = tags;
    if (
      self ||
      !username ||
      !message.startsWith(Message.SPEAK_COMMAND) ||
      !USER_ALLOWLIST.includes(username)
    ) {
      return;
    }

    const newMessage = new Message(message, username);
    setQueue((curr) => [...curr, newMessage]);
  });

  return {
    lastMessage: queue.at(-1) ?? null,
    queue,
  };
}
