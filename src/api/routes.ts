const baseUrls = {
  api: "/api/v1",
  chatRequests: "/api/v1/chats/requests",
  notes: "/api/v1/notes",
  chatbot: "api/v1/chatbot",
};

const notes = {
  getNotes: baseUrls.notes,
  getNote: (id: string) => `${baseUrls.notes}/${id}`,
  createNote: baseUrls.notes,
  updateNote: (id: string) => `${baseUrls.notes}/${id}`,
  deleteNote: (id: string) => `${baseUrls.notes}/${id}`,
};

const chatbot = {
  messages: `${baseUrls.chatbot}/messages`,
  retrieveRunStatus: (runId: string) =>
    `${baseUrls.chatbot}/runstatus/${runId}`,
};

export const apiRoutes = {
  getChatRequest: `${baseUrls.chatRequests}/:id`,
  getChatRequests: `${baseUrls.chatRequests}`,
  acceptChatRequest: `${baseUrls.chatRequests}/accept`,
  rejectChatRequest: `${baseUrls.chatRequests}/reject`,
  notes,
  chatbot,
  logout: `${baseUrls.api}/auth/logout`,
  signInWithEmailPassword: `${baseUrls.api}/auth/login/email-password`,
};
