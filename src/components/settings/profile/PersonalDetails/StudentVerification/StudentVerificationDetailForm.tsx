"use client";

import {
  useOrgSearchUrlQuery,
  useOrganizationsQuery,
  useSubmitStudentVerificationDataMutation,
} from "@/api/studentVerification";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import { StudentVerificationFormSchema } from "@/validation/studentVerificationForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/FormFields";
import SearchAndSelect from "@/components/ui/SearchAndSelect";

interface IStudentVerificationDetailFormProps {
  onSubmitting?: (isSubmitting: boolean) => void;
}

export default function StudentVerificationDetailForm({ onSubmitting }: IStudentVerificationDetailFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<StudentVerificationFormSchema>({
    resolver: zodResolver(StudentVerificationFormSchema),
    mode: "onSubmit",
  });

  const [orgSearchTerm, setOrgSearchTerm, debouncedOrgSearchTerm] =
    useDebouncedSearchTerm();

  const orgSearchUrlQuery = useOrgSearchUrlQuery();

  const organizationsQuery = useOrganizationsQuery(
    orgSearchUrlQuery.data?.orgSearchUrl,
    debouncedOrgSearchTerm
  );

  const submitStudentVerificationDataMutation =
    useSubmitStudentVerificationDataMutation();

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

  const onSubmit = async (data: StudentVerificationFormSchema) => {
    try {
      onSubmitting?.(true);
      await submitStudentVerificationDataMutation.mutateAsync(data);
    } catch (error) {
      let errMessage = "Couldn't submit student verification details";
      if (error instanceof AxiosError) {
        errMessage = error.message;
      }
      toast.error(errMessage);
    } finally {
      onSubmitting?.(false);
    }
  };

  return (
    <div className="py-5 px-6 rounded-xl border">
      <h3 className="mb-7 mt-3">Verify your student identity</h3>
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
                <FormLabel>Student Email address</FormLabel>
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
            name="organization"
            render={({ field: { value, onChange, ...props } }) => (
              <FormItem>
                <FormLabel>School/University</FormLabel>
                <FormControl>
                  <SearchAndSelect
                    placeholder="eg. University of North Carolina at Chapel Hill"
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
