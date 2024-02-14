const baseUrls = {
  api: "/api/v1",
  chatRequests: "/api/v1/chats/requests",
  notes: "/api/v1/notes",
  chatbot: "api/v1/chatbot",
  auth: "/api/v1/auth",
  notifications: "/api/v1/notifications",
  onboarding: "/api/v1/onboarding",
  userMatch: "/api/v1/usermatch",
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

const userMatch = {
  getUserMatch: (id: string) => `${baseUrls.userMatch}/${id}`,
}

const notifications = {
  base: `${baseUrls.notifications}`,
};

const onboarding = {
  getPrimaryInterestSuggestions: (searchTerm: string) =>
    `${baseUrls.onboarding}/suggestions/primaryinterests?q=${searchTerm}`,
  getExpertiseAreaSuggestions: (searchTerm: string) =>
    `${baseUrls.onboarding}/suggestions/expertiseareas?q=${searchTerm}`,
  getPracticeAreaSuggestions: (searchTerm: string) =>
    `${baseUrls.onboarding}/suggestions/practiceareas?q=${searchTerm}`,
  submitOnboardingForm: `${baseUrls.onboarding}/form/submit`,
};

const auth = {
  loginWithGoogle: `${baseUrls.auth}/login/google`,
};

export const apiRoutes = {
  getChatRequest: `${baseUrls.chatRequests}/:id`,
  getChatRequests: `${baseUrls.chatRequests}`,
  acceptChatRequest: `${baseUrls.chatRequests}/accept`,
  rejectChatRequest: `${baseUrls.chatRequests}/reject`,
  notes,
  chatbot,
  userMatch,
  auth,
  notifications,
  onboarding,
  logout: `${baseUrls.api}/auth/logout`,
  signInWithEmailPassword: `${baseUrls.api}/auth/login/email-password`,
};
