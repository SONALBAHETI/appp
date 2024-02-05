import { UserObjectives, UserOccupations } from "@/constants/onboarding";

/**
 * Check if the user is a healthcare professional
 * @param userOccupation - the user's occupation
 * @returns true if the user is a healthcare professional, false otherwise
 */
export const isHealthcareProfessional = (userOccupation: string) => {
  return userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL;
};

/**
 * Check if the user is looking for a mentor
 * @param userOccupation - the user's occupation
 * @param userObjective - the user's objective
 * @returns true if the user is looking for a mentor, false otherwise
 */
export const isLookingForMentor = (
  userOccupation: string,
  userObjective?: string
) => {
  return (
    userOccupation === UserOccupations.HEALTHCARE_STUDENT ||
    (userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL &&
      userObjective === UserObjectives.FIND_A_MENTOR)
  );
};

/**
 * Check if the user is looking to mentor others
 * @param userOccupation - the user's occupation
 * @param userObjective - the user's objective
 * @returns true if the user is looking to mentor others, false otherwise
 */
export const isLookingToMentorOthers = (
  userOccupation: string,
  userObjective: string
) => {
  return (
    userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL &&
    userObjective === UserObjectives.MENTOR_OTHERS
  );
};