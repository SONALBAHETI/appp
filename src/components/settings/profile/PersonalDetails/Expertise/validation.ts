import { z } from "zod";


const aresOfExpertise = z.array(z.string()).min(1);

const targetedDiagnoses = z.array(z.string()).min(1);

const aresOfPractice = z.array(z.string()).min(1);

const boardSpecialties = z.array(z.string()).min(1);

export const expertiseFormSchemaObj = z.object({
    aresOfExpertise: aresOfExpertise,
    commonlyTreatedDiagnoses: targetedDiagnoses,
    areasOfPractice: aresOfPractice,
    boardSpecialties: boardSpecialties

})


export type ExpertiseSchema = z.infer<typeof expertiseFormSchemaObj>;
