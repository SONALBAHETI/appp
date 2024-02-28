"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationFormSchema } from "@/validation/settingsValidations/education.validation";
import SearchAndSelect from "@/components/ui/SearchAndSelect";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { CertificateFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Certificates/validation";
import { DegreeFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Degrees/validation";
import { Label } from "@/components/ui/label";
import Degrees from "./Degrees";
import {
  useAddCertificateMutation,
  useAddDegreeMutation,
  useEducationFormMutation,
  useFellowshipProgramSuggestionsQuery,
  useResidencyProgramSuggestionsQuery,
  useUserProfileQuery,
} from "@/api/profileSettings";
import { AddDegreeDialog } from "./Degrees/AddDegreeDialog";
import { toast } from "react-toastify";
import Certificates from "./Certificates";
import { AddCertificateDialog } from "./Certificates/AddCertificateDialog";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";

interface IEducationProps {
  onSubmitting: (isSubmitting: boolean) => void;
  onComplete?: () => void;
}

export default function Education({ onSubmitting, onComplete }: IEducationProps) {
  /* component states */
  const [degreeDialogOpen, setDegreeDialogOpen] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [
    residencyProgramSearchTerm,
    setResidencyProgramSearchTerm,
    debouncedResidencyProgramSearchTerm,
  ] = useDebouncedSearchTerm();
  const [
    fellowshipProgramSearchTerm,
    setFellowshipProgramSearchTerm,
    debouncedFellowshipProgramSearchTerm,
  ] = useDebouncedSearchTerm();

  /* server states */
  const userProfileQuery = useUserProfileQuery();
  const residencyProgramSuggestionsQuery = useResidencyProgramSuggestionsQuery(
    debouncedResidencyProgramSearchTerm
  );
  const fellowshipProgramSuggestionsQuery =
    useFellowshipProgramSuggestionsQuery(debouncedFellowshipProgramSearchTerm);

  /* server mutations */
  const addDegreeMutation = useAddDegreeMutation();
  const addCertificateMutation = useAddCertificateMutation();
  const educationFormMutation = useEducationFormMutation();

  /* hooks */
  const form = useForm<EducationFormSchema>({
    resolver: zodResolver(EducationFormSchema),
    mode: "onSubmit",
  });

  const formRef = useRef<HTMLFormElement>(null);

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
      const { education } = userProfileQuery.data.profile;
      if (education) {
        form.setValue("degrees", education.degrees || []);
        form.setValue("certificates", education.certificates || []);
        form.setValue(
          "isResidencyTrained",
          education.isResidencyTrained || false
        );
        form.setValue(
          "isFellowshipTrained",
          education.isFellowshipTrained || false
        );
        form.setValue("residencyPrograms", education.residencyPrograms || []);
        form.setValue("fellowshipPrograms", education.fellowshipPrograms || []);
      }
    }
  }, [userProfileQuery.data]);

  const isFellowshipTrained = form.watch("isFellowshipTrained");
  const isResidencyTrained = form.watch("isResidencyTrained");

  async function handleAddDegree(certificateData: DegreeFormSchema) {
    try {
      setIsLoading(true);
      await addDegreeMutation.mutateAsync(certificateData);
      setIsLoading(false);
      setDegreeDialogOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  async function handleAddCertificate(certificateData: CertificateFormSchema) {
    try {
      setIsLoading(true);
      await addCertificateMutation.mutateAsync(certificateData);
      setIsLoading(false);
      setCertificateDialogOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  async function onEducationFormSubmit(data: EducationFormSchema) {
    try {
      /* removing degrees and certificates 
      as they will be already updated when added or removed. */
      const { degrees, certificates, ...formData } = data;
      onSubmitting(true);
      await educationFormMutation.mutateAsync(formData);
      toast.success("Education details successfully saved!");
      onComplete?.();
    } catch (error) {
      toast.error("Couldn't update education details.");
    } finally {
      onSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onEducationFormSubmit)}>
          <div className="flex flex-col gap-y-5 py-5 px-6 rounded-xl border">
            <h4>Your education</h4>
            {/* Degrees */}
            <div className="flex flex-col gap-y-2">
              <Label className="text-base">Degrees</Label>
              {!userProfileQuery.isError && (
                <FormField
                  control={form.control}
                  name="degrees"
                  render={({ field: { value } }) => (
                    <FormItem>
                      <Degrees
                        isLoading={userProfileQuery.isPending}
                        degrees={value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <AddDegreeDialog
                open={degreeDialogOpen}
                className="w-max mt-1"
                isLoading={isLoading}
                onOpenChange={setDegreeDialogOpen}
                onAddDegree={handleAddDegree}
              />
            </div>

            {/* Certificates */}
            <div className="flex flex-col gap-y-2">
              <Label className="text-base">Certificates</Label>
              {!userProfileQuery.isError && (
                <FormField
                  control={form.control}
                  name="certificates"
                  render={({ field: { value } }) => (
                    <FormItem>
                      <Certificates
                        isLoading={userProfileQuery.isPending}
                        certificates={value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <AddCertificateDialog
                open={certificateDialogOpen}
                className="w-max mt-1"
                isLoading={isLoading}
                onOpenChange={setCertificateDialogOpen}
                onAddCertificate={handleAddCertificate}
              />
            </div>

            {/* Residency and/or fellowship programs */}
            <div className="flex flex-col gap-y-5 mt-4">
              <div className="flex flex-col gap-y-2">
                {/* is residency trained? */}
                <FormField
                  control={form.control}
                  name="isResidencyTrained"
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem className="flex gap-x-2 items-center">
                      <FormControl>
                        <Switch
                          checked={value}
                          onCheckedChange={onChange}
                          {...props}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-bold !mt-0">
                        Are you residency trained?
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* residency programs */}
                <FormField
                  control={form.control}
                  name="residencyPrograms"
                  defaultValue={[]}
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem>
                      <FormLabel
                        className={`${
                          isResidencyTrained ? "" : "text-muted-foreground"
                        }`}
                      >
                        Residency Programs
                      </FormLabel>
                      <FormControl>
                        <SearchAndSelect
                          placeholder="eg. Mayo Clinic Neurologic Physical Therapy Residency"
                          value={residencyProgramSearchTerm}
                          isLoading={residencyProgramSuggestionsQuery.isPending}
                          suggestions={
                            residencyProgramSuggestionsQuery.data
                              ?.suggestions || []
                          }
                          selectedSuggestions={value}
                          onSelectedSuggestionsChange={onChange}
                          onValueChange={setResidencyProgramSearchTerm}
                          {...props}
                          disabled={!isResidencyTrained}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                {/* is fellowship trained? */}
                <FormField
                  control={form.control}
                  name="isFellowshipTrained"
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem className="flex gap-x-2 items-center">
                      <FormControl>
                        <Switch
                          checked={value}
                          onCheckedChange={onChange}
                          {...props}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-bold !mt-0">
                        Are you fellowship trained?
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* fellowship programs */}
                <FormField
                  control={form.control}
                  name="fellowshipPrograms"
                  defaultValue={[]}
                  render={({ field: { value, onChange, ...props } }) => (
                    <FormItem>
                      <FormLabel
                        className={`${
                          isFellowshipTrained ? "" : "text-muted-foreground"
                        }`}
                      >
                        Fellowship Programs
                      </FormLabel>
                      <FormControl>
                        <SearchAndSelect
                          placeholder="eg. Hand Therapy Fellowship at the Philadelphia Hand Center"
                          value={fellowshipProgramSearchTerm}
                          isLoading={
                            fellowshipProgramSuggestionsQuery.isPending
                          }
                          suggestions={
                            fellowshipProgramSuggestionsQuery.data
                              ?.suggestions || []
                          }
                          selectedSuggestions={value}
                          onSelectedSuggestionsChange={onChange}
                          onValueChange={setFellowshipProgramSearchTerm}
                          {...props}
                          disabled={!isFellowshipTrained}
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
    </>
  );
}
