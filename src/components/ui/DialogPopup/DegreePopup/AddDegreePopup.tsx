import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, SelectDropdown } from "../../FormFields";
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
import { DegreeSchemaObj, DegreeFormSchema } from "./validate";

type onAddDegree = (data: DegreeFormSchema) => void;

export function AddDegreeDialogBox({
  handelAddDegree,
}: {
  handelAddDegree: onAddDegree;
}) {
  //TODO : Change dropdown options
  const dropDownOptions: string[] = ["he/him", "she/her", "they/them"];

  const form = useForm<DegreeFormSchema>({
    resolver: zodResolver(DegreeSchemaObj),
    mode: "onSubmit",
  });

  async function onSubmit(data: DegreeFormSchema) {
    console.log(data);
    handelAddDegree(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#349997] p-1 text-sm text-white mt-3 ml-2 w-1/6"
        >
          + Add degrees
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        field={field}
                        options={dropDownOptions}
                        placeholder={"Select a option"}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        field={field}
                        options={dropDownOptions}
                        placeholder={"Select a option"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfCompletion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Completion</FormLabel>
                    <FormControl>
                      <DatePicker
                        selectedDate={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
