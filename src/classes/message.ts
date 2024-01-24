export class Message {
  public static SPEAK_COMMAND = import.meta.env.VITE_SPEAK_COMMAND;

  public readonly text: string;

  constructor(
    public readonly fullText: string,
    public readonly username: string
  ) {
    this.text = fullText.substring(Message.SPEAK_COMMAND.length);
  }
}
