import { render } from "preact";

import "./style.css";
import { useMessageQueue } from "./hooks/useMessageQueue";
import { useCallback } from "preact/hooks";
import { useAwsPollyClient } from "./hooks/useAwsPollyClient";
import { useTwitchClient } from "./hooks/useTwitchClient";

export function App() {
  const { connectTwitchClient } = useTwitchClient();
  const { initPollyClient } = useAwsPollyClient();
  const { lastMessage } = useMessageQueue();

  const init = useCallback(async () => {
    await initPollyClient();
    connectTwitchClient();
  }, []);

  return (
    <div>
      <button onClick={init}>Connect</button>
      {lastMessage?.text ?? null}
    </div>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
