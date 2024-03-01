"use client";

import ToggleOptions from "@/components/ui/toggle-options";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  USER_OCCUPATION_OPTIONS,
  USER_OBJECTIVE_OPTIONS,
} from "@/constants/onboarding";

import {
  isHealthcareProfessional,
  isLookingForMentor,
  isLookingToMentorOthers,
} from "./utils";

import { useRouter } from "next/navigation";
import {
  useExpertiseAreaSuggestionsQuery,
  usePracticeAreaSuggestionsQuery,
  usePrimaryInterestSuggestionsQuery,
  useSubmitOnboardingFormMutation,
} from "@/api/onboarding";

import { useForm } from "react-hook-form";

import {
  OnboardingFormSchema,
  TOnboardingForm,
} from "@/validation/onboardingForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";
import { ISubmitOnboardingFormResponse } from "@/interfaces/onboarding";

export default function OnboardingForm() {
  const router = useRouter();
  const [
    primaryInterestsSearchTerm,
    setPrimaryInterestsSearchTerm,
    debouncedPrimaryInterestsSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    expertiseAreasSearchTerm,
    setExpertiseAreasSearchTerm,
    debouncedExpertiseAreasSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    practiceAreasSearchTerm,
    setPracticeAreasSearchTerm,
    debouncedPracticeAreasSearchTerm,
  ] = useDebouncedSearchTerm();

  const { data: primaryInterestData, isPending: isPrimaryInterestDataPending } =
    usePrimaryInterestSuggestionsQuery(debouncedPrimaryInterestsSearchTerm);

  const { data: expertiseAreasData, isPending: isExpertiseAreasDataPending } =
    useExpertiseAreaSuggestionsQuery(debouncedExpertiseAreasSearchTerm);

  const { data: practiceAreasData, isPending: isPracticeAreasDataPending } =
    usePracticeAreaSuggestionsQuery(debouncedPracticeAreasSearchTerm);

  const mutationSubmitForm = useSubmitOnboardingFormMutation();

  const form = useForm<TOnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema),
    mode: "onSubmit",
  });

  const userOccupation = form.watch("userOccupation");
  const userObjective = form.watch("userObjective");

  async function onSubmit(data: TOnboardingForm) {
    try {
      await mutationSubmitForm.mutateAsync(data);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <h1>Tell us about yourself.</h1>
            <p className="text-md text-faded mt-3">
              Help us understand you better.
            </p>
          </div>

          {/* User occupations */}
          <FormField
            control={form.control}
            name="userOccupation"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel className="text-md">I am a</FormLabel>
                <FormControl>
                  <ToggleOptions
                    options={USER_OCCUPATION_OPTIONS}
                    selectedOptions={[{ label: value, value }]}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions[0].value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* User's objectives if the user is a healthcare professional */}
          {userOccupation && isHealthcareProfessional(userOccupation) && (
            <FormField
              control={form.control}
              name="userObjective"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel className="text-md">I want to</FormLabel>
                  <FormControl>
                    <ToggleOptions
                      options={USER_OBJECTIVE_OPTIONS}
                      selectedOptions={[{ label: value, value }]}
                      onChange={(selectedOptions) =>
                        onChange(selectedOptions[0].value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* User's primary area(s) of interest if the user wants to find a mentor */}
          {userOccupation &&
            isLookingForMentor(userOccupation, userObjective) && (
              <FormField
                control={form.control}
                name="primaryAreasOfInterest"
                defaultValue={[]}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Primary area(s) of interest
                    </FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                        value={primaryInterestsSearchTerm}
                        isLoading={isPrimaryInterestDataPending}
                        suggestions={primaryInterestData?.suggestions || []}
                        selectedSuggestions={value}
                        onSelectedSuggestionsChange={onChange}
                        onValueChange={setPrimaryInterestsSearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

          {/* Areas of practice and areas of expertise if the user is a healthcare professional and wants to mentor others */}
          {/* TODO: fetch areas of practice and expertise from the server and use those here instead */}
          {userOccupation &&
            userObjective &&
            isLookingToMentorOthers(userOccupation, userObjective) && (
              <>
                <FormField
                  control={form.control}
                  name="primaryAreasOfPractice"
                  defaultValue={[]}
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Primary area(s) of practice
                      </FormLabel>
                      <FormControl>
                        <SearchAndSelect
                          placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                          value={practiceAreasSearchTerm}
                          isLoading={isPracticeAreasDataPending}
                          suggestions={practiceAreasData?.suggestions || []}
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

                <FormField
                  control={form.control}
                  name="areasOfExpertise"
                  defaultValue={[]}
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Area(s) of expertise
                      </FormLabel>
                      <FormControl>
                        <SearchAndSelect
                          placeholder="eg. Cardiovascular system, pulmonary system, geriatrics, aging"
                          value={expertiseAreasSearchTerm}
                          isLoading={isExpertiseAreasDataPending}
                          suggestions={expertiseAreasData?.suggestions || []}
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
              </>
            )}

          <Button className="w-full" type="submit">
            {mutationSubmitForm.isPending && <Loader />}
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
