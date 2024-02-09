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
import { Card } from "@/components/ui/card";

export default function Expertise() {
  const form = useForm<ExpertiseSchema>({
    resolver: zodResolver(expertiseFormSchemaObj),
    mode: "onSubmit",
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

  const experienceRange: string[] = ["0-1", "2-5", "6-10", "11-19", "20+"];

  return (
    <>
      <div className="py-5 px-6 rounded-xl border">
        <Form {...form}>
          <form action="">
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
