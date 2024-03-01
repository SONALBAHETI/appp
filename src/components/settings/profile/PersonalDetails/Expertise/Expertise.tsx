"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ExpertiseFormSchema } from "@/validation/settingsValidations/expertise.validation";
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
import {
  useExpertiseAreaSuggestionsQuery,
  usePracticeAreaSuggestionsQuery,
} from "@/api/onboarding";
import {
  useBoardSpecialtiesQuery,
  useCommonlyTreatedDiagnosesQuery,
  useExpertiseFormMutation,
  useUserProfileQuery,
} from "@/api/profileSettings";
import { Input } from "@/components/ui/FormFields";
import { toast } from "react-toastify";

interface IExpertiseProps {
  onSubmitting: (isSubmitting: boolean) => void;
  onComplete?: () => void;
}

export default function Expertise({
  onSubmitting,
  onComplete,
}: IExpertiseProps) {
  const formRef = useRef<HTMLFormElement>(null);

  /* Debounced search terms */
  const [
    practiceAreasSearchTerm,
    setPracticeAreasSearchTerm,
    debouncedPracticeAreasSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    boardSpecialtiesSearchTerm,
    setBoardSpecialtiesSearchTerm,
    debouncedBoardSpecialtiesSearchTerm,
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

  /* server states */
  const userProfileQuery = useUserProfileQuery();
  const expertiseAreaSuggestionsQuery = useExpertiseAreaSuggestionsQuery(
    debouncedExpertiseAreasSearchTerm
  );
  const practiceAreaSuggestionsQuery = usePracticeAreaSuggestionsQuery(
    debouncedPracticeAreasSearchTerm
  );
  const boardSpecialtiesSuggestionsQuery = useBoardSpecialtiesQuery(
    debouncedBoardSpecialtiesSearchTerm
  );
  const commonlyTreatedDiagnosesSuggestionsQuery =
    useCommonlyTreatedDiagnosesQuery(
      debouncedCommonlyTreatedDiagnosesSearchTerm
    );

  /* server mutations */
  const expertiseFormMutation = useExpertiseFormMutation();

  /* hooks */
  const form = useForm<ExpertiseFormSchema>({
    resolver: zodResolver(ExpertiseFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const handleSaveAndNextEvent = () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    };
    document.addEventListener("saveAndNextEvent", handleSaveAndNextEvent);
    return () => {
      document.removeEventListener("saveAndNextEvent", handleSaveAndNextEvent);
    };
  }, []);

  useEffect(() => {
    if (userProfileQuery.data) {
      const { expertise } = userProfileQuery.data.profile;
      if (expertise) {
        form.setValue(
          "yearsInClinicalPractice",
          expertise.yearsInClinicalPractice || 0
        );
        form.setValue("expertiseAreas", expertise.expertiseAreas || []);
        form.setValue("boardSpecialties", expertise.boardSpecialties || []);
        form.setValue(
          "commonlyTreatedDiagnoses",
          expertise.commonlyTreatedDiagnoses || []
        );
        form.setValue("practiceAreas", expertise.practiceAreas || []);
      }
    }
  }, [userProfileQuery.data]);

  async function onExpertiseFormSubmit(data: ExpertiseFormSchema) {
    try {
      onSubmitting(true);
      await expertiseFormMutation.mutateAsync(data);
      toast.success("Expertise details successfully saved!");
      onComplete?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      onSubmitting(false);
    }
  }

  return (
    <div className="py-5 px-6 rounded-xl border">
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onExpertiseFormSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="mt-2">
              <FormField
                control={form.control}
                name="yearsInClinicalPractice"
                defaultValue={0}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>
                      How many years of clinical experience do you have?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="max-w-max"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...props}
                      />
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
              name="expertiseAreas"
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>Areas of Expertise</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Cardiovascular system, pulmonary system, geriatrics, aging"
                      value={expertiseAreasSearchTerm}
                      isLoading={expertiseAreaSuggestionsQuery.isPending}
                      suggestions={
                        expertiseAreaSuggestionsQuery.data?.suggestions || []
                      }
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
                  <FormLabel>Commonly treated diagnoses</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                      value={commonlyTreatedDiagnosesSearchTerm}
                      isLoading={
                        commonlyTreatedDiagnosesSuggestionsQuery.isPending
                      }
                      suggestions={
                        commonlyTreatedDiagnosesSuggestionsQuery.data
                          ?.suggestions || []
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
              name="practiceAreas"
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>Primary area(s) of practice</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                      value={practiceAreasSearchTerm}
                      isLoading={practiceAreaSuggestionsQuery.isPending}
                      suggestions={
                        practiceAreaSuggestionsQuery.data?.suggestions || []
                      }
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
                  <FormLabel>Board specialties</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                      value={boardSpecialtiesSearchTerm}
                      isLoading={boardSpecialtiesSuggestionsQuery.isPending}
                      suggestions={
                        boardSpecialtiesSuggestionsQuery.data?.suggestions || []
                      }
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
  );
}
