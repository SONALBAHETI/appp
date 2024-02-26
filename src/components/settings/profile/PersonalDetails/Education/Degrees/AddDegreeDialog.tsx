"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/FormFields";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DegreeFormSchema } from "./validation";
import Icon, { IconType } from "@/components/ui/Icon";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import useDebouncedSearchTerm from "@/hooks/useDebouncedSearchTerm";
import {
  useDegreeSuggestionsQuery,
  useUniversitySuggestionsQuery,
} from "@/api/profileSettings";
import Loader from "@/components/ui/Loader";

export interface AddDegreeDialogProps {
  onAddDegree: (data: DegreeFormSchema) => void;
  className?: string;
  isLoading?: boolean;
}

export const AddDegreeDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog> & AddDegreeDialogProps
>(({ className, onAddDegree, isLoading, ...props }, ref) => {
  // degree search term
  const [degreeSearchTerm, setDegreeSearchTerm, debouncedDegreeSearchTerm] =
    useDebouncedSearchTerm();

  // university search term
  const [
    universitySearchTerm,
    setUniversitySearchTerm,
    debouncedUniversitySearchTerm,
  ] = useDebouncedSearchTerm();

  // degree suggestions
  const degreeSuggestionsQuery = useDegreeSuggestionsQuery(
    debouncedDegreeSearchTerm
  );

  // university suggestions
  const universitySuggestionsQuery = useUniversitySuggestionsQuery(
    debouncedUniversitySearchTerm
  );

  const form = useForm<DegreeFormSchema>({
    resolver: zodResolver(DegreeFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: DegreeFormSchema) {
    onAddDegree(data);
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className={className} variant="accent">
          <Icon type={IconType.PLUS} size={18} className="mr-1" /> Add degree
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a certificate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="degreeName"
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>Degree name</FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        multiple={false}
                        placeholder="Search for a degree"
                        value={degreeSearchTerm}
                        isLoading={degreeSuggestionsQuery.isPending}
                        suggestions={
                          degreeSuggestionsQuery.data?.suggestions || []
                        }
                        selectedSuggestions={value ? [value] : []}
                        onClear={() => onChange(undefined)}
                        onSelectedSuggestionsChange={(val) => {
                          val && onChange(val[0]);
                        }}
                        onValueChange={setDegreeSearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="universityName"
                defaultValue=""
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <SearchAndSelect
                        multiple={false}
                        placeholder="Search universities"
                        value={universitySearchTerm}
                        isLoading={universitySuggestionsQuery.isPending}
                        suggestions={
                          universitySuggestionsQuery.data?.suggestions || []
                        }
                        selectedSuggestions={value ? [value] : []}
                        onClear={() => onChange(undefined)}
                        onSelectedSuggestionsChange={(val) =>
                          val && onChange(val[0])
                        }
                        onValueChange={setUniversitySearchTerm}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfCompletion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Completion</FormLabel>
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

            <DialogFooter>
              <Button type="submit" className="w-full">
                {isLoading && <Loader className="mr-2" />} Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
