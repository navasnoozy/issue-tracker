import { Session } from "next-auth";
import { MessageType } from "../../../server/types/messageType";
import getFormatedTime from "../../../app/utils/getFormatTime"

export class MessageFactory {
  static create(
    session: Session,
    type: "broadcast" | "notifi" | "self",
    content: string | number
  ): MessageType {
    // Generate common message properties
    const time = Date.now();
    const formattedTime = getFormatedTime(time);

    // Base message structure
    const message: MessageType = {
      id: crypto.randomUUID(),
      time: formattedTime,
      type: type,
      content: content,
    };

    // Add user information based on message type
    switch (type) {
      case "broadcast":
      case "self":
        // Full user info for user messages
        message.user = {
          name: session.user?.name,
          avatar: session.user?.image || undefined,
        };
        break;

      case "notifi":
        // Only name for notifications (no avatar)
        message.user = {
          name: session.user?.name,
        };
        break;
    }

    return message;
  }
}
