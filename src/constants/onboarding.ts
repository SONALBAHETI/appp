export const UserOccupations = {
  HEALTHCARE_PROFESSIONAL: "Healthcare professional",
  HEALTHCARE_STUDENT: "Healthcare student",
};

export const UserObjectives = {
  FIND_A_MENTOR: "Find a mentor",
  MENTOR_OTHERS: "Mentor others",
};

export const USER_OCCUPATION_OPTIONS: IToggleOption[] = [
  {
    label: UserOccupations.HEALTHCARE_PROFESSIONAL,
    value: UserOccupations.HEALTHCARE_PROFESSIONAL,
  },
  {
    label: UserOccupations.HEALTHCARE_STUDENT,
    value: UserOccupations.HEALTHCARE_STUDENT,
  },
];

export const USER_OBJECTIVE_OPTIONS: IToggleOption[] = [
  {
    label: UserObjectives.FIND_A_MENTOR,
    value: UserObjectives.FIND_A_MENTOR,
  },
  {
    label: UserObjectives.MENTOR_OTHERS,
    value: UserObjectives.MENTOR_OTHERS,
  },
];