//Message type
export interface MessageType {
    id: string;
    time: string;
    type: "broadcast" | "notifi" | "self";
    content: string | number;
    user?: {
      name?: string | null;
      avatar?: string;
    };
  }