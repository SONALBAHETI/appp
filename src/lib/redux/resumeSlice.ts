import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import type {
    FeaturedSkill,
    Resume,
    ResumeEducation,
    ResumeProfile,
    ResumeProject,
    ResumeSkills,
    ResumeWorkExperience,
} from "@/lib/parse-resume-from-pdf/types";

export const initialProfile: ResumeProfile = {
    name: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
    url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
    company: "",
    jobTitle: "",
    date: "",
    descriptions: [],
};

export const initialEducation: ResumeEducation = {
    school: "",
    degree: "",
    gpa: "",
    date: "",
    descriptions: [],
};

export const initialProject: ResumeProject = {
    project: "",
    date: "",
    descriptions: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
    ...initialFeaturedSkill,
});
export const initialSkills: ResumeSkills = {
    featuredSkills: initialFeaturedSkills,
    descriptions: [],
};

export const initialCustom = {
    descriptions: [],
};

export const initialResumeState: Resume = {
    profile: initialProfile,
    workExperiences: [initialWorkExperience],
    educations: [initialEducation],
    projects: [initialProject],
    skills: initialSkills,
    custom: initialCustom,
};

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
export type CreateChangeActionWithDescriptions<T> = {
    idx: number;
} & (
        | {
            field: Exclude<keyof T, "descriptions">;
            value: string;
        }
        | { field: "descriptions"; value: string[] }
    );

export const resumeSlice = createSlice({
    name: "resume",
    initialState: initialResumeState,
    reducers: {

        setResume: (draft, action: PayloadAction<Resume>) => {
            return action.payload;
        },
    },
});

export const {
    setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;

export default resumeSlice.reducer;
