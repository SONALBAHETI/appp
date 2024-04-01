export enum Permission {
  // Quick Replies
  CreateQuickReplies = "createQuickReplies",
  ReadQuickReplies = "readQuickReplies",
  UpdateQuickReplies = "updateQuickReplies",
  DeleteQuickReplies = "deleteQuickReplies",

  // Account Settings
  DeactivateAccount = "deactivateAccount",
  DeleteAccount = "deleteAccount",
  SyncGoogleCalendar = "syncGoogleCalendar",

  // Notifications
  ReadNotificationSettings = "readNotificationSettings",
  UpdateNotificationSettings = "updateNotificationSettings",
  ReadNotifications = "readNotifications",

  // Appointment
  CreateAppointments = "createAppointments",
  ReadAppointments = "readAppointments",
  UpdateAppointments = "updateAppointments",
  DeleteAppointments = "deleteAppointments",

  // Chat
  ReadSendbirdCredentials = "readSendbirdCredentials",
  ReadChatRequests = "readChatRequests",
  CreateChatRequests = "createChatRequests",
  UpdateChatRequests = "updateChatRequests",
  DeleteChatRequests = "deleteChatRequests",

  // Chatbot
  ReadChatbotMessages = "readChatbotMessages",
  CreateChatbotMessages = "createChatbotMessages",

  // Matchmaking
  ReadUserMatches = "readUserMatches",

  // Identity Verification
  LicenseVerification = "licenseVerification",
  SubmitSheerIDDocuments = "submitSheerIDDocuments",
  StudentVerification = "studentVerification",

  // Notes
  CreateNotes = "createNotes",
  ReadNotes = "readNotes",
  UpdateNotes = "updateNotes",
  DeleteNotes = "deleteNotes",

  // Combo box suggestions
  ReadSuggestions = "readSuggestions",

  // User Profile
  ReadUserProfile = "readUserProfile",
  UpdateUserProfile = "updateUserProfile",
  SubmitIdentityInformation = "submitIdentityInformation",
  SubmitEducationInformation = "submitEducationInformation",
  SubmitExpertiseInformation = "submitExpertiseInformation",
  ReadAchievements = "readAchievements",
  ReadVisibility = "readVisibility",
  UpdateVisibility = "updateVisibility",
  ReadAvailability = "readAvailability",
  UpdateAvailability = "updateAvailability",
}

export enum Role {
  USER = "user",
  MENTEE = "mentee",
  UNVERIFIED_MENTOR = "unverifiedMentor",
  MENTOR = "mentor",
  ADMIN = "admin",
}
