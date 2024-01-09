const baseUrls = {
  api: "/api/v1",
  chatRequests: "/api/v1/chats/requests",
};

export const apiRoutes = {
  getChatRequest: `${baseUrls.chatRequests}/:id`,
  getChatRequests: `${baseUrls.chatRequests}`,
  acceptChatRequest: `${baseUrls.chatRequests}/accept`,
  rejectChatRequest: `${baseUrls.chatRequests}/reject`,
  logout: `${baseUrls.api}/auth/logout`,
  signInWithEmailPassword: `${baseUrls.api}/auth/login/email-password`,
};
