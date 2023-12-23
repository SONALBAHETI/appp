import { create } from "zustand";
import { TAB } from "@/interfaces/chat";

export interface ChatState {
  activeTab: TAB;
  currentChannelUrl: string | null;
  selectedChatRequestId: string | null;
  setActiveTab: (tab: TAB) => void;
  setCurrentChannelUrl: (url: string | null) => void;
  setSelectedChatRequestId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  activeTab: TAB.CHAT,
  currentChannelUrl: null,
  selectedChatRequestId: null,
  setActiveTab: (tab: TAB) => set({ activeTab: tab }),
  setCurrentChannelUrl: (url: string | null) => set({ currentChannelUrl: url }),
  setSelectedChatRequestId: (id: string | null) =>
    set({ selectedChatRequestId: id }),
}));
