export const apiRoutes = {
  getChatRequest: "/api/v1/chats/requests/:id",
  getChatRequests: "/api/v1/chats/requests",
  acceptChatRequest: "/api/v1/chats/requests/accept",
  logout: "/api/v1/auth/logout",
  signInWithEmailPassword: "/api/v1/auth/login/email-password",
  NOTES: "/api/v1/notes",
  NOTE: (id: string) => `/api/v1/notes/${id}`,
  updateNote: (id: string) => `/api/v1/notes/${id}`, 
  deleteNote: (id: string) => `/api/v1/notes/${id}`,
};
