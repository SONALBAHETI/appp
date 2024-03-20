"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LicenseFormSchema } from "./validation";
import { Input, DatePicker } from "@/components/ui/FormFields";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Combobox from "@/components/ui/combobox";
import { HEALTHCARE_PROFESSIONAL_STATUSES } from "@/constants/sheerID";
import {
  useOrgSearchUrlQuery,
  useOrganizationsQuery,
  useSubmitMentorVerificationDataMutation,
} from "@/api/mentorVerification";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

interface ILicenseDetailFormProps {
  onSubmitting: (isSubmitting: boolean) => void;
  onComplete?: () => void;
}

export default function LicenseDetailForm({
  onSubmitting,
}: ILicenseDetailFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<LicenseFormSchema>({
    resolver: zodResolver(LicenseFormSchema),
    mode: "onSubmit",
  });
  const [orgSearchTerm, setOrgSearchTerm, debouncedOrgSearchTerm] =
    useDebouncedSearchTerm();

  const orgSearchUrlQuery = useOrgSearchUrlQuery();
  const organizationsQuery = useOrganizationsQuery(
    orgSearchUrlQuery.data?.orgSearchUrl,
    debouncedOrgSearchTerm
  );
  const submitMentorVerificationDataMutation =
    useSubmitMentorVerificationDataMutation();

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

  const onSubmit = async (data: LicenseFormSchema) => {
    try {
      onSubmitting(true);
      await submitMentorVerificationDataMutation.mutateAsync({
        ...data,
      });
    } catch (error: any) {
      toast.error(
        error.message || "Couldn't submit license details"
      );
    } finally {
      onSubmitting(false);
    }
  };

  return (
    <div className="py-5 px-6 rounded-xl border">
      <h3 className="mb-7 mt-3">License Details</h3>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-x-3 gap-y-4 grid-cols-2"
        >
          <FormField
            control={form.control}
            name="firstName"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    autoCapitalize="words"
                    autoComplete="given-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    autoCapitalize="words"
                    autoComplete="family-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email address (associated with license)</FormLabel>
                <FormControl>
                  <Input placeholder="Email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex-1">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DatePicker selected={value} onSelect={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="009039"
                    autoComplete="postal-code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div>
                    <Combobox
                      value={value}
                      onChange={onChange}
                      className="w-full"
                      options={HEALTHCARE_PROFESSIONAL_STATUSES}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organization"
            render={({ field: { value, onChange, ...props } }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <SearchAndSelect
                    placeholder="eg. North Carolina Board of Nursing"
                    value={orgSearchTerm}
                    isLoading={organizationsQuery.isPending}
                    suggestions={
                      organizationsQuery.data?.organizations.map(
                        (org) => org.name
                      ) || []
                    }
                    onClear={() => onChange(undefined)}
                    selectedSuggestions={value ? [value.name] : []}
                    onSelectedSuggestionsChange={(val) =>
                      onChange(
                        organizationsQuery.data?.organizations.find(
                          (org) => org.name === val[0]
                        ) || undefined
                      )
                    }
                    onValueChange={setOrgSearchTerm}
                    multiple={false}
                    {...props}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
