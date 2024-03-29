const baseUrls = {
  api: "/api/v1",
  user: "/api/v1/user",
  chat: "/api/v1/chats",
  chatRequests: "/api/v1/chats/requests",
  notes: "/api/v1/notes",
  chatbot: "api/v1/chatbot",
  auth: "/api/v1/auth",
  notifications: "/api/v1/notifications",
  onboarding: "/api/v1/onboarding",
  userMatch: "/api/v1/usermatch",
  sheerIDVerification: "/api/v1/verification/identity",
  mentorVerification: "/api/v1/verification/identity/mentor",
  studentVerification: "/api/v1/verification/identity/student",
  settings: "/api/v1/settings",
  appointments: "/api/v1/appointments",
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

const studentVerification = {
  getCurrentStep: `${baseUrls.studentVerification}/current-step`,
  submitVerificationData: `${baseUrls.studentVerification}/submit-data`,
  getOrgSearchUrl: `${baseUrls.studentVerification}/organizations/search-url`,
  getOrganizations: (orgSearchUrl?: string, searchTerm?: string) =>
    `${baseUrls.studentVerification}/organizations/search?orgSearchUrl=${
      orgSearchUrl && encodeURIComponent(orgSearchUrl)
    }&searchTerm=${searchTerm}`,
  submitData: `${baseUrls.studentVerification}/submit-data`,
};

const sheerIDVerification = {
  docUpload: `${baseUrls.sheerIDVerification}/doc-upload`,
}

const notifications = {
  base: `${baseUrls.notifications}`,
  unreadCount: `${baseUrls.notifications}/unread/count`,
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

const profileSettings = {
  getCommonlyTreatedDiagnoses: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/commonly-treated-diagnoses?q=${searchTerm}`,

  getBoardSpecialties: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/board-specialties?q=${searchTerm}`,

  submitIdentityInfoForm: `${baseUrls.settings}/profile/identity-info/`,

  uploadProfilePicture: `${baseUrls.settings}/profile/profile-picture`,

  submitEducationForm: `${baseUrls.settings}/profile/education`,

  submitExpertiseForm: `${baseUrls.settings}/profile/expertise`,

  degrees: `${baseUrls.settings}/profile/education/degrees`,

  certificates: `${baseUrls.settings}/profile/education/certificates`,

  getPersonalInterests: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/personal-interests?q=${searchTerm}`,

  getUserProfile: `${baseUrls.settings}/profile/user-profile`,

  getReligiousAffiliations: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/religious-affiliations?q=${searchTerm}`,

  getDegreeSuggestions: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/degrees?q=${searchTerm}`,

  getUniversitySuggestions: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/universities?q=${searchTerm}`,

  getResidencyProgramSuggestions: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/residency-programs?q=${searchTerm}`,

  getFellowshipProgramSuggestions: (searchTerm: string) =>
    `${baseUrls.settings}/profile/suggestions/fellowship-programs?q=${searchTerm}`,
};

const accountSettings = {
  quickReplies: `${baseUrls.settings}/account/quick-replies`,
  quickReply: (id: string) =>
    `${baseUrls.settings}/account/quick-replies/${id}`,
  notifications: `${baseUrls.settings}/account/notifications`,
  deactivateAccount: `${baseUrls.settings}/account/deactivate`,
  deleteAccount: `${baseUrls.settings}/account/delete`,
  googleCalendarSync: `${baseUrls.settings}/account/calendar-sync/google`,
  authorizeGoogleCalendarSync: `${baseUrls.settings}/account/calendar-sync/google/auth`,
  verifyGoogleCalendarSync: `${baseUrls.settings}/account/calendar-sync/google/verify`,
};

const settings = {
  profile: profileSettings,
  account: accountSettings,
};

const auth = {
  loginWithGoogle: `${baseUrls.auth}/login/google`,
  verifyEmail: `${baseUrls.auth}/verify-email`,
  sendVerificationEmail: `${baseUrls.auth}/send-verification-email`,
  sendResetPasswordEmail: `${baseUrls.auth}/send-reset-password-email`,
  sendResetPasswordEmailWithAuth: `${baseUrls.auth}/send-reset-password-email-with-auth`,
  resetPassword: `${baseUrls.auth}/reset-password`,
  signInWithEmailPassword: `${baseUrls.auth}/login/email-password`,
  signUpWithEmailPassword: `${baseUrls.auth}/register`,
};

const user = {
  achievements: `${baseUrls.user}/achievements`,
  visibility: `${baseUrls.user}/visibility`,
  availability: `${baseUrls.user}/availability`,
};

const chat = {
  getChatRequest: `${baseUrls.chatRequests}/:id`,
  getChatRequests: `${baseUrls.chatRequests}`,
  acceptChatRequest: `${baseUrls.chatRequests}/accept`,
  rejectChatRequest: `${baseUrls.chatRequests}/reject`,
  getCredentials: `${baseUrls.chat}/credentials`,
};

const appointment = {
  getAppointment: (id: string) => `${baseUrls.appointments}/${id}`,
};

export const apiRoutes = {
  chat,
  user,
  notes,
  appointment,
  chatbot,
  userMatch,
  mentorVerification,
  studentVerification,
  sheerIDVerification,
  auth,
  notifications,
  onboarding,
  settings,
  logout: `${baseUrls.api}/auth/logout`,
};
