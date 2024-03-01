import React, { useContext, useEffect, useRef } from "react";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { IdentityInfoFormSchema } from "@/validation/settingsValidations/identityInfo.validation";

import { Input, Textarea, DatePicker } from "@/components/ui/FormFields";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Combobox from "@/components/ui/combobox";

import { Switch } from "@/components/ui/switch";
import { ResumeContext } from "@/context/ResumeContext";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import {
  useIdentityInfoFormMutation,
  usePersonalInterestSuggestionsQuery,
  useReligiousAffiliationsSuggestionsQuery,
  useUserProfileQuery,
} from "@/api/profileSettings";
import { toast } from "react-toastify";
import ResumeAutoFill from "../ResumeAutoFill/ResumeAutoFill";
import { genders, pronouns } from "@/constants/profile";

interface IIdentityInfoProps {
  onSubmitting: (isSubmitting: boolean) => void;
  onComplete?: () => void;
}

export default function IdentityInfo({
  onSubmitting,
  onComplete,
}: IIdentityInfoProps) {
  const { resume } = useContext(ResumeContext);

  const [
    personalInterestsSearchTerm,
    setPersonalInterestsSearchTerm,
    debouncedPersonalInterestsSearchTerm,
  ] = useDebouncedSearchTerm();

  const [
    religiousAffiliationsSearchTerm,
    setReligiousAffiliationsSearchTerm,
    debouncedReligiousAffiliationsSearchTerm,
  ] = useDebouncedSearchTerm();

  const personalInterestSuggestionsQuery = usePersonalInterestSuggestionsQuery(
    debouncedPersonalInterestsSearchTerm
  );
  const religiousAffiliationsSuggestionsQuery =
    useReligiousAffiliationsSuggestionsQuery(
      debouncedReligiousAffiliationsSearchTerm
    );

  const userProfileQuery = useUserProfileQuery();

  const identityInfoFormMutation = useIdentityInfoFormMutation();

  const form = useForm<IdentityInfoFormSchema>({
    resolver: zodResolver(IdentityInfoFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: resume?.profile?.email || "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const [isShareMoreDetailsEnabled, setShareMoreDetailsEnabled] =
    React.useState<boolean>(false);

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
      form.setValue("email", userProfileQuery.data.email);
      // set form values from profile data
      Object.keys(userProfileQuery.data.profile).forEach((key) => {
        if (
          key === "dateOfBirth" &&
          userProfileQuery.data.profile.dateOfBirth
        ) {
          // convert string to date
          form.setValue(
            "dateOfBirth",
            new Date(userProfileQuery.data.profile.dateOfBirth)
          );
        } else {
          form.setValue(
            key as keyof IdentityInfoFormSchema,
            (userProfileQuery.data.profile as { [key: string]: any })[key]
          );
        }
      });
    }
  }, [userProfileQuery.data]);

  async function onIdentityInfoFormSubmit(data: IdentityInfoFormSchema) {
    try {
      onSubmitting(true);
      await identityInfoFormMutation.mutateAsync(data);
      toast.success("Identity details successfully updated!");
      onComplete?.();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't update identity details.");
    } finally {
      onSubmitting(false);
    }
  }
  function handleShareMoreDetailsToggle(checked: boolean) {
    setShareMoreDetailsEnabled(checked);
  }

  return (
    <>
      <div className="py-5 px-6 rounded-xl border">
        <h4 className="mb-4">Personal details</h4>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onIdentityInfoFormSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="flex">
              <div className="ml-6 pr-10 flex">
                <div className="rounded-full w-12 overflow-hidden">
                  <Avatar className="w-24 h-24 flex-shrink-0 mr-4">
                    <AvatarImage
                      src={"/assets/svg/user.svg"}
                      alt="User Profile Picture"
                    />
                  </Avatar>
                </div>
                <label className="relative cursor-pointer mt-3">
                  <input type="file" className="hidden" accept="image/*" />
                  <span className="px-2 py-1 text-black text-sm border-2 rounded-md ">
                    Upload Photo
                  </span>
                </label>
              </div>
            </div>

            <ResumeAutoFill />

            <div className="flex space-x-4">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          autoCapitalize="words"
                          autoComplete="given-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="lastName"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name "
                          autoCapitalize="words"
                          autoComplete="family-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pronouns, Gender Date */}
            <div className="flex space-x-4">
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="pronouns"
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pronouns</FormLabel>
                        <FormControl>
                          <Combobox
                            value={value}
                            onChange={onChange}
                            className="w-full"
                            options={pronouns}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="gender"
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Combobox
                            value={value}
                            onChange={onChange}
                            className="w-full"
                            options={genders}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* state and postal code  */}
            <h6 className="pt-4">Location</h6>
            <div className="flex space-x-4">
              <div className="flex-grow w-1/2">
                <FormField
                  control={form.control}
                  name="state"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Florida"
                          autoComplete="address-level1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-grow w-2/4 relative">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="98101"
                            autoComplete="postal-code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* bio input */}
            <h6 className="pt-4">Share your background</h6>
            <div className="flex space-x-4">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="bio"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Write your bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here"
                          autoCapitalize="words"
                          autoComplete="given-about"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="funFact"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>A fun fact about you (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* <TODO> Implement search and select for Area of speciality <TODO />  */}

            {/* Multi select */}
            <FormField
              control={form.control}
              name="personalInterests"
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <FormItem className="flex-1">
                  <FormLabel>Add your personal interests</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Reading, Cooking, Traveling, Photography, Hiking"
                      value={personalInterestsSearchTerm}
                      isLoading={personalInterestSuggestionsQuery.isPending}
                      suggestions={
                        personalInterestSuggestionsQuery.data?.suggestions || []
                      }
                      selectedSuggestions={value}
                      onSelectedSuggestionsChange={onChange}
                      onValueChange={setPersonalInterestsSearchTerm}
                      {...props}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Identity, Ethnicity, ReligiousAffiliation */}
            <div className="pt-4">
              <div className="flex items-center space-x-2">
                <Switch onCheckedChange={handleShareMoreDetailsToggle} />
                <h6>Share more details for better matches</h6>
              </div>
              <p className="text-muted-foreground mt-1">
                Understanding your background helps us connect you with the
                right people.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="identity"
                    disabled={!isShareMoreDetailsEnabled}
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Identity</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your identity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="ethnicity"
                    defaultValue=""
                    disabled={!isShareMoreDetailsEnabled}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Ethnicity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your ethnicity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    disabled={!isShareMoreDetailsEnabled}
                    name="religiousAffiliations"
                    defaultValue={[]}
                    render={({ field: { value, onChange, ...props } }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Religious Affiliation(s)</FormLabel>
                        <FormControl>
                          <SearchAndSelect
                            placeholder="eg. Christianity, Hinduism, Buddhism"
                            disabled={!isShareMoreDetailsEnabled}
                            value={religiousAffiliationsSearchTerm}
                            isLoading={
                              religiousAffiliationsSuggestionsQuery.isPending
                            }
                            suggestions={
                              religiousAffiliationsSuggestionsQuery.data
                                ?.suggestions || []
                            }
                            selectedSuggestions={value}
                            onSelectedSuggestionsChange={onChange}
                            onValueChange={setReligiousAffiliationsSearchTerm}
                            {...props}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
