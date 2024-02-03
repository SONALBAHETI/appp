import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ExpertiseSchema, expertiseFormSchemaObj } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { useDebounce } from "usehooks-ts";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useExpertiseSuggestionsQuery } from "@/api/expertise";

interface FormState {
  experience: string;
  areasOfExpertise: string[];
  commonlyTreatedDiagnoses: string[];
}

export default function Expertise() {
  const form = useForm<ExpertiseSchema>({
    resolver: zodResolver(expertiseFormSchemaObj),
    mode: "onSubmit",
  });

  const [formState, setFormState] = useState<FormState>({
    experience: "20+",
    areasOfExpertise: ["Orthopedic", "Administration", "Education", "Research"],
    commonlyTreatedDiagnoses: [
      "Orthopedic",
      "Administration",
      "Education",
      "Research",
    ],
  });
 //TODO: Create debouncing for all the input fields 
  const [primaryExpertise, setPrimaryExpertise] = useState<string>("");
  const [diagnosesSearchTerm, setDiagnosesSearchTerm] = useState<string>("");
  const [practiceAreasSearchTerm, setPracticeAreasSearchTerm] =
    useState<string>("");
  const [boardSpecialtiesSearchTerm, setBoardSpecialtiesSearchTerm] =
    useState<string>("");

  const debouncedExpertiseAreasSearchTerm = useDebounce<string>(
    primaryExpertise || "",
    500
  );
  const { data: primaryInterestData, isPending: isPrimaryInterestDataPending } =
    useExpertiseSuggestionsQuery(debouncedExpertiseAreasSearchTerm);

  const handleExperienceChange = (value: string) => {
    setFormState({ ...formState, experience: value });
  };

  return (
    <>
      <div className="relative flex-grow top-4 left-4 bottom-4 bg-white p-4 rounded-xl shadow-md border  ml-4 mr-12 border-slate-300 mb-4">
        <Form {...form}>
          <form action="">
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  How many years of clinical experience do you have?
                </label>
                <div className="mt-2">
                  {["0-1", "2-5", "6-10", "11-19", "20+"].map((range) => (
                    <button
                      key={range}
                      className={`mr-2 px-4 py-2 text-sm font-medium rounded-full border-2 ${
                        formState.experience === range
                          ? " border-[#349997] bg-[#349997] text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleExperienceChange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <FormField
                control={form.control}
                name="aresOfExpertise"
                defaultValue={[]}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Areas of Expertise
                    </FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                        value={primaryExpertise}
                        isLoading={isPrimaryInterestDataPending}
                        suggestions={
                          primaryInterestData?.docs.map((doc) => doc.title) ||
                          []
                        }
                        onClear={() => setPrimaryExpertise("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setPrimaryExpertise}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <FormField
                control={form.control}
                name="commonlyTreatedDiagnoses"
                defaultValue={[]}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Commonly treated diagnoses
                    </FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                        value={diagnosesSearchTerm}
                        onClear={() => setDiagnosesSearchTerm("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setDiagnosesSearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <FormField
                control={form.control}
                name="areasOfPractice"
                defaultValue={[]}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Primary area(s) of practice
                    </FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                        value={practiceAreasSearchTerm}
                        onClear={() => setPracticeAreasSearchTerm("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setPracticeAreasSearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <FormField
                control={form.control}
                name="boardSpecialties"
                defaultValue={[]}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Board specialties
                    </FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                        value={boardSpecialtiesSearchTerm}
                        onClear={() => setBoardSpecialtiesSearchTerm("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setBoardSpecialtiesSearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
