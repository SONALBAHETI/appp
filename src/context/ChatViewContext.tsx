import { createContext, useContext, useReducer } from "react";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { TAB } from "@/components/chat/tab";
import { IChatRequest } from "@/types/chat";

export enum ChatViewActionType {
  CHANGED_CHANNEL = "CHANGED_CHANNEL",
  SELECTED_CHAT_REQUEST = "SELECTED_CHAT_REQUEST",
  CHANGED_TAB = "CHANGED_TAB",
}

interface ChatViewState {
  currentChannel: GroupChannel | null;
  activeTab: TAB;
  selectedChatRequest: IChatRequest | null;
}

interface ChangedChannelAction {
  type: ChatViewActionType.CHANGED_CHANNEL;
  channel: GroupChannel | null;
}

interface SelectedChatRequestAction {
  type: ChatViewActionType.SELECTED_CHAT_REQUEST;
  chatRequest: IChatRequest | null;
}

interface ChangedTabAction {
  type: ChatViewActionType.CHANGED_TAB;
  tab: TAB;
}

type ChatViewAction =
  | ChangedChannelAction
  | SelectedChatRequestAction
  | ChangedTabAction;

type ChatViewDispatch = (action: ChatViewAction) => void;

const ChatViewContext = createContext<ChatViewState | null>(null);

const ChatViewDispatchContext = createContext<ChatViewDispatch | null>(null);

function chatViewReducer(
  chatView: ChatViewState,
  action: ChatViewAction
): ChatViewState {
  switch (action.type) {
    case ChatViewActionType.CHANGED_CHANNEL: {
      return {
        ...chatView,
        currentChannel: action.channel,
      };
    }
    case ChatViewActionType.SELECTED_CHAT_REQUEST: {
      return {
        ...chatView,
        selectedChatRequest: action.chatRequest,
      };
    }
    case ChatViewActionType.CHANGED_TAB: {
      return {
        ...chatView,
        activeTab: action.tab,
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}

const initialChatView: ChatViewState = {
  currentChannel: null,
  activeTab: TAB.CHAT,
  selectedChatRequest: null,
};

export function ChatViewProvider({ children }: { children?: React.ReactNode }) {
  const [chatView, dispatch] = useReducer(chatViewReducer, initialChatView);

  return (
    <ChatViewContext.Provider value={chatView}>
      <ChatViewDispatchContext.Provider value={dispatch}>
        {children}
      </ChatViewDispatchContext.Provider>
    </ChatViewContext.Provider>
  );
}

export function useChatView(): ChatViewState {
  const chatView = useContext(ChatViewContext);

  if (chatView === null) {
    throw new Error("useChatView must be used within a ChatViewProvider");
  }

  return chatView;
}

export function useChatViewDispatch(): ChatViewDispatch {
  const dispatch = useContext(ChatViewDispatchContext);

  if (dispatch === null) {
    throw new Error(
      "useChatViewDispatch must be used within a ChatViewProvider"
    );
  }

  return dispatch;
}
