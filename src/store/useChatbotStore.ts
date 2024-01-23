import { create } from "zustand";

export interface ChatbotState {
  thinking: boolean;
  setThinking: (thinking: boolean) => void;
}

export const useChatbotStore = create<ChatbotState>()((set) => ({
  thinking: false,
  setThinking: (thinking: boolean) => set({ thinking }),
}));
