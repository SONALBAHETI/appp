const baseUrls = {
  api: "/api/v1",
  chatRequests: "/api/v1/chats/requests",
  notes: "/api/v1/notes",
  chatbot: "api/v1/chatbot",
  auth: "/api/v1/auth",
  notifications: "/api/v1/notifications",
  onboarding: "/api/v1/onboarding",
  userMatch: "/api/v1/usermatch",
  mentorVerification: "/api/v1/verification/mentor",
  profileSetting: "/api/v1/settings/profile"
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
};

const mentorVerification = {
  getCurrentStep: `${baseUrls.mentorVerification}/current-step`,
  submitVerificationData: `${baseUrls.mentorVerification}/submit-data`,
  getOrgSearchUrl: `${baseUrls.mentorVerification}/organizations/search-url`,
  getOrganizations: (orgSearchUrl?: string, searchTerm?: string) =>
    `${baseUrls.mentorVerification}/organizations/search?orgSearchUrl=${
      orgSearchUrl && encodeURIComponent(orgSearchUrl)
    }&searchTerm=${searchTerm}`,
  submitData: `${baseUrls.mentorVerification}/submit-data`,
};

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

const profile = {
  getCommonlyDiagnoses: (searchTerm: string) => `${baseUrls.profileSetting}/suggestions/commonlydiagnoses?q=${searchTerm}`,

  getBoardSpecialties: (searchTerm: string) => `${baseUrls.profileSetting}/suggestions/boardSpecialties?q=${searchTerm}`

}

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
  mentorVerification,
  auth,
  notifications,
  onboarding,
  profile,
  logout: `${baseUrls.api}/auth/logout`,
  signInWithEmailPassword: `${baseUrls.api}/auth/login/email-password`,
};
