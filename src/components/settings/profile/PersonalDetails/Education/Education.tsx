//TODO: Need to create validation for fields
//TODO: Need to make popup box to add value in field

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationFormSchema, EducationFormSchemaObj } from "./validation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { AddCertificateDialogBox } from "@/components/ui/DialogePopup/CertificatePopup/AddCertificatePopup";
import { CertificateFormSchema } from "@/components/ui/DialogePopup/CertificatePopup/validation";
import { AddDegreeDialogBox } from "@/components/ui/DialogePopup/DegreePopup/AddDegreePopup";
import { DegreeFormSchema } from "@/components/ui/DialogePopup/DegreePopup/validate";
export default function Education() {
  const form = useForm<EducationFormSchema>({
    resolver: zodResolver(EducationFormSchemaObj),
    mode: "onSubmit",
  });

  const [primaryAreasSearchTerm, setPrimaryAreasSearchTerm] =
    useState<string>("");
  function handleClick(checked: any) {}

  function handleAddCertificate(certificateData: CertificateFormSchema): void {
    console.log(certificateData);
  }

  function handelAddDegree(certificateData: DegreeFormSchema): void {
    console.log(certificateData);
  }

  return (
    <>
      <div className="py-5 px-6 rounded-xl border">
        <h6 className="p-2 mb-4">Your Education</h6>
        <Form {...form}>
          <p className="font-semibold ml-2 mb-1">Add degrees</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            <Card className="bg-[#F8F8F8] w-44">
              <CardHeader className="">
                <CardTitle className="text-md">Title</CardTitle>
              </CardHeader>
              <CardContent
                className="text-card-foreground/60 text-sm"
                style={{ overflowY: "hidden" }}
              >
                This is container
              </CardContent>
              <CardFooter className="text-sm">Year of Completion</CardFooter>
            </Card>

            <Card className="bg-[#F8F8F8] w-44">
              <CardHeader className="">
                <CardTitle className="text-md">Title</CardTitle>
              </CardHeader>
              <CardContent
                className="text-card-foreground/60 text-sm"
                style={{ overflowY: "hidden" }}
              >
                This is container
              </CardContent>
              <CardFooter className="text-sm">Year of Completion</CardFooter>
            </Card>

            <Card className="bg-[#F8F8F8] w-44">
              <CardHeader className="">
                <CardTitle className="text-md">Title</CardTitle>
              </CardHeader>
              <CardContent
                className="text-card-foreground/60 text-sm"
                style={{ overflowY: "hidden" }}
              >
                This is container
              </CardContent>
              <CardFooter className="text-sm">Year of Completion</CardFooter>
            </Card>
          </div>

          <AddCertificateDialogBox
            handleAddCertificate={handleAddCertificate}
          />

          <p className="font-semibold ml-2 mb-1 mt-10">Add degrees</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            <Card className="bg-[#F8F8F8] w-44">
              <CardHeader className="">
                <CardTitle className="text-md">Title</CardTitle>
              </CardHeader>
              <CardContent
                className="text-card-foreground/60 text-sm"
                style={{ overflowY: "hidden" }}
              >
                This is container
              </CardContent>
              <CardFooter className="text-sm">Year of Completion</CardFooter>
            </Card>

            <Card className="bg-[#F8F8F8] w-44">
              <CardHeader className="">
                <CardTitle className="text-md">Title</CardTitle>
              </CardHeader>
              <CardContent
                className="text-card-foreground/60 text-sm"
                style={{ overflowY: "hidden" }}
              >
                This is container
              </CardContent>
              <CardFooter className="text-sm">Year of Completion</CardFooter>
            </Card>
          </div>

          <AddDegreeDialogBox handelAddDegree={handelAddDegree} />

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
                    onClear={() => setPrimaryAreasSearchTerm("")}
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
        </Form>
      </div>
    </>
  );
}
