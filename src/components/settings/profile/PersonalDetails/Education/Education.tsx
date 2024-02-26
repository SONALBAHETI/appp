//TODO: Need to create validation for fields

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
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { CertificateFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Certificates/validation";
import { DegreeFormSchema } from "@/components/settings/profile/PersonalDetails/Education/Degrees/validation";
import { ResumeContext } from "@/context/ResumeContext";
import { Label } from "@/components/ui/label";
import Degrees from "./Degrees";
import {
  useAddCertificateMutation,
  useAddDegreeMutation,
  useUserProfileQuery,
} from "@/api/profileSettings";
import { AddDegreeDialog } from "./Degrees/AddDegreeDialog";
import { toast } from "react-toastify";
import Certificates from "./Certificates";
import { AddCertificateDialog } from "./Certificates/AddCertificateDialog";

export default function Education() {
  /* component states */
  const [degreeDialogOpen, setDegreeDialogOpen] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* server states */
  const userProfileQuery = useUserProfileQuery();
  const addDegreeMutation = useAddDegreeMutation();
  const addCertificateMutation = useAddCertificateMutation();

  const form = useForm<EducationFormSchema>({
    resolver: zodResolver(EducationFormSchema),
    mode: "onSubmit",
  });

  const [primaryAreasSearchTerm, setPrimaryAreasSearchTerm] =
    useState<string>("");
  function handleClick(checked: any) {}

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

  async function onEducationFormSubmit(
    data: EducationFormSchema
  ): Promise<void> {}

  return (
    <>
      <div className="flex flex-col gap-y-5 py-5 px-6 rounded-xl border">
        <h4>Your education</h4>
        {/* Degrees */}
        <div className="flex flex-col gap-y-2">
          <Label className="text-base">Degrees</Label>
          {!userProfileQuery.isError && !userProfileQuery.isPending && (
            <Degrees
              isLoading={userProfileQuery.isPending}
              degrees={userProfileQuery.data?.profile?.education?.degrees}
            />
          )}
          <AddDegreeDialog
            open={degreeDialogOpen}
            className="w-max"
            isLoading={isLoading}
            onOpenChange={setDegreeDialogOpen}
            onAddDegree={handleAddDegree}
          />
        </div>

        {/* Certificates */}
        <div className="flex flex-col gap-y-2">
          <Label className="text-base">Certificates</Label>
          {!userProfileQuery.isError && !userProfileQuery.isPending && (
            <Certificates
              isLoading={userProfileQuery.isPending}
              certificates={
                userProfileQuery.data?.profile?.education?.certificates
              }
            />
          )}
          <AddCertificateDialog
            open={certificateDialogOpen}
            className="w-max"
            isLoading={isLoading}
            onOpenChange={setCertificateDialogOpen}
            onAddCertificate={handleAddCertificate}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onEducationFormSubmit)}
            className="flex flex-col space-y-4"
          >
            <h6 className="p-2 mt-4">Residency and/or fellowship trained?</h6>

            <div className="flex items-center mt-2 mb-3">
              <Switch onCheckedChange={handleClick} />
              <p className="ml-2 font-bold text-sm ">Residency</p>
            </div>

            <FormField
              control={form.control}
              name="degree"
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal">
                    Primary area(s) of interest
                  </FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                      value={primaryAreasSearchTerm}
                      // isLoading={isPrimaryInterestDataPending}
                      // suggestions={primaryInterestData?.docs.map((doc) => doc.title) || []}
                      selectedSuggestions={value}
                      onSelectedSuggestionsChange={onChange}
                      onValueChange={setPrimaryAreasSearchTerm}
                      {...props}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center mt-2 mb-3">
              <Switch onCheckedChange={handleClick} />
              <p className="ml-2 font-bold text-sm ">Fellowship</p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
