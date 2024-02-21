import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ExpertiseSchema, expertiseFormSchemaObj } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import {
  useExpertiseAreaSuggestionsQuery,
  usePracticeAreaSuggestionsQuery,
} from "@/api/onboarding";
import {
  useBoardSpecialtiesQuery,
  useCommonlyTreatedQuery,
} from "@/api/expertise";

export default function Expertise() {
  const form = useForm<ExpertiseSchema>({
    resolver: zodResolver(expertiseFormSchemaObj),
    mode: "onSubmit",
  });

  const [
    practiceAreasSearchTerm,
    setPracticeAreasSearchTerm,
    debouncedPracticeAreasSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    boardSpecialtiesTerm,
    setBoardSpecialtiesTerm,
    debouncedBoardSpecialtiesTerm,
  ] = useDebouncedSearchTerm();

  const [
    expertiseAreasSearchTerm,
    setExpertiseAreasSearchTerm,
    debouncedExpertiseAreasSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    commonlyTreatedDiagnosesSearchTerm,
    setCommonlyTreatedDiagnosesSearchTerm,
    debouncedCommonlyTreatedDiagnosesSearchTerm,
  ] = useDebouncedSearchTerm();

  const { data: expertiseAreasData, isPending: isExpertiseAreasDataPending } =
    useExpertiseAreaSuggestionsQuery(debouncedExpertiseAreasSearchTerm);

  const { data: practiceAreasData, isPending: isPracticeAreasDataPending } =
    usePracticeAreaSuggestionsQuery(debouncedPracticeAreasSearchTerm);

  const {
    data: boardSpecialtiesData,
    isPending: isBoardSpecialtiesDatPending,
  } = useBoardSpecialtiesQuery(debouncedBoardSpecialtiesTerm);

  const {
    data: commonlyTreatedDiagnosesData,
    isPending: isCommonlyTreatedDiagnosesData,
  } = useCommonlyTreatedQuery(debouncedBoardSpecialtiesTerm);

  const experienceRange: string[] = ["0-1", "2-5", "6-10", "11-19", "20+"];

  async function onExpertiseFormSubmit(data: ExpertiseSchema):Promise<void>{
    
  }

  return (
    <>
      <div className="py-5 px-6 rounded-xl border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onExpertiseFormSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  defaultValue={experienceRange[0]}
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold">
                        How many years of clinical experience do you have?
                      </FormLabel>
                      <FormControl>
                        <div className="w-1/2 flex hover:cursor-pointer">
                          {experienceRange.map((range) => (
                            <Card
                              key={range}
                              className={`mr-2 px-4 py-2 text-sm  font-medium rounded-full border-2 ${
                                value === range
                                  ? "border-[#349997] bg-[#349997] text-white"
                                  : ""
                              }`}
                              onClick={() => onChange(range)}
                            >
                              {range}
                            </Card>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        placeholder="eg. Cardiovascular system, pulmonary system, geriatrics, aging"
                        value={expertiseAreasSearchTerm}
                        isLoading={isExpertiseAreasDataPending}
                        suggestions={expertiseAreasData?.suggestions || []}
                        onClear={() => setExpertiseAreasSearchTerm("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setExpertiseAreasSearchTerm}
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
                        value={commonlyTreatedDiagnosesSearchTerm}
                        isLoading={isCommonlyTreatedDiagnosesData}
                        suggestions={
                          commonlyTreatedDiagnosesData?.suggestions || []
                        }
                        onClear={() =>
                          setCommonlyTreatedDiagnosesSearchTerm("")
                        }
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setCommonlyTreatedDiagnosesSearchTerm}
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
                        isLoading={isPracticeAreasDataPending}
                        suggestions={practiceAreasData?.suggestions || []}
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
                        value={boardSpecialtiesTerm}
                        isLoading={isBoardSpecialtiesDatPending}
                        suggestions={boardSpecialtiesData?.suggestions || []}
                        onClear={() => setBoardSpecialtiesTerm("")}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setBoardSpecialtiesTerm}
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
