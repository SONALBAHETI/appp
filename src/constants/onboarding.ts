export const UserOccupations = {
  HEALTHCARE_PROFESSIONAL: "Healthcare professional",
  HEALTHCARE_LEARNER: "Healthcare learner",
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
    label: UserOccupations.HEALTHCARE_LEARNER,
    value: UserOccupations.HEALTHCARE_LEARNER,
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

export const MENTOR_SPECIALISATIONS: IToggleOption[] = [
  {
    label: "Orthopedic",
    value: "Orthopedic",
  },
  {
    label: "Neurological",
    value: "Neurological",
  },
  {
    label: "Cardiovascular",
    value: "Cardiovascular",
  },
  {
    label: "Geriatric",
    value: "Geriatric",
  },
  {
    label: "Pediatric",
    value: "Pediatric",
  },
  {
    label: "Sports",
    value: "Sports",
  },
  {
    label: "Women's Health",
    value: "Women's Health",
  },
  {
    label: "Vestibular",
    value: "Vestibular",
  },
  {
    label: "Oncology",
    value: "Oncology",
  },
];
