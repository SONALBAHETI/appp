import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker, Textarea } from "../../FormFields";
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
import { CertificateFormSchema, CertificateSchemaObj } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type onAddCertificate = (data: CertificateFormSchema) => void;

export function AddCertificateDialogBox({
  handleAddCertificate,
}: {
  handleAddCertificate: onAddCertificate;
}) {
  const form = useForm<CertificateFormSchema>({
    resolver: zodResolver(CertificateSchemaObj),
    mode: "onSubmit",
  });

  async function onSubmit(data: CertificateFormSchema) {
    console.log(data);
    handleAddCertificate(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#349997] p-2 text-sm text-white mt-3 ml-2 w-1/6"
        >
          + Add certificate
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
                name="certificateName"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the certificate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        autoCapitalize="words"
                        autoComplete="given-certificateName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue date</FormLabel>
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

              <FormField
                control={form.control}
                name="description"
                defaultValue=""
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here"
                        autoCapitalize="words"
                        autoComplete="given-description"
                        {...field}
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
