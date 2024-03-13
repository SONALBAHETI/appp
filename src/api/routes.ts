const baseUrls = {
  api: "/api/v1",
  chat: "/api/v1/chats",
  chatRequests: "/api/v1/chats/requests",
  notes: "/api/v1/notes",
  chatbot: "api/v1/chatbot",
  auth: "/api/v1/auth",
  notifications: "/api/v1/notifications",
  onboarding: "/api/v1/onboarding",
  userMatch: "/api/v1/usermatch",
  mentorVerification: "/api/v1/verification/mentor",
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
  docUpload: `${baseUrls.mentorVerification}/doc-upload`,
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

const settings = {
  profile: profileSettings,
};

const auth = {
  loginWithGoogle: `${baseUrls.auth}/login/google`,
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
  notes,
  appointment,
  chatbot,
  userMatch,
  mentorVerification,
  auth,
  notifications,
  onboarding,
  settings,
  logout: `${baseUrls.api}/auth/logout`,
  signInWithEmailPassword: `${baseUrls.api}/auth/login/email-password`,
};
