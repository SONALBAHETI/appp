import { create } from "zustand";
import { TAB } from "@/interfaces/chat";

export interface ChatState {
  activeTab: TAB;
  currentChannelUrl: string | null;
  selectedChatRequestId: string | null;
  channelSearchQuery: string | undefined;
  setActiveTab: (tab: TAB) => void;
  setCurrentChannelUrl: (url: string | null) => void;
  setSelectedChatRequestId: (id: string | null) => void;
  setChannelSearchQuery: (query: string | undefined) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  activeTab: TAB.CHAT,
  currentChannelUrl: null,
  selectedChatRequestId: null,
  channelSearchQuery: "",
  setActiveTab: (tab: TAB) => set({ activeTab: tab }),
  setCurrentChannelUrl: (url: string | null) => set({ currentChannelUrl: url }),
  setSelectedChatRequestId: (id: string | null) =>
    set({ selectedChatRequestId: id }),
  setChannelSearchQuery: (query: string | undefined) =>
    set({ channelSearchQuery: query }),
}));
