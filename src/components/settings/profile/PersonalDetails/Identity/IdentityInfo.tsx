import React, { useContext } from "react";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  PersonalDetailsFormSchema,
  PersonalDetailsValues,
} from "@/validation/settingsValidations/IdentityInfo.validation";
import {
  Input,
  SelectDropdown,
  Textarea,
  NumberInput,
  DatePicker,
} from "@/components/ui/FormFields";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ResumeContext } from "@/context/ResumeContext";

const genders = [
  "Male",
  "Female",
  "Non-binary",
  "Agender",
  "Bigender",
  "Genderqueer",
  "Genderfluid",
  "Gender nonconforming",
  "Two-spirit",
  "Transgender",
  "Cisgender",
];

const pronouns: string[] = ["he/him", "she/her", "they/them"];

export default function IdentityInfo() {
  const { resume } = useContext(ResumeContext);

  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(PersonalDetailsFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: resume?.profile?.email || "",
    },
  });

  const [isShareMoreDetailsEnabled, setShareMoreDetailsEnabled] =
    React.useState<boolean>(false);

  async function onIdentityInfoFormSubmit(data: PersonalDetailsValues) {}
  function handleClick(checked: boolean) {
    setShareMoreDetailsEnabled(checked);
  }

  return (
    <>
      <div className="py-5 px-6 rounded-xl border">
        <h6 className="p-2 mb-4">Personal Details</h6>
        <Form {...form}>
          <form
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

            <div className="flex space-x-4">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="firstName"
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
                  defaultValue=""
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
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pronouns</FormLabel>
                        <FormControl>
                          <SelectDropdown
                            placeholder="Select an option"
                            options={pronouns}
                            field={field}
                          ></SelectDropdown>
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
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <SelectDropdown
                            placeholder="Select an option"
                            options={genders}
                            field={field}
                          ></SelectDropdown>
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
                    name="year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Date</FormLabel>
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
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="009039"
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

            {/* About Yourself input */}
            <h6 className="pt-4">Share your background</h6>
            <div className="flex space-x-4">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="about"
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
              name="speciality"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Add your personal interests</FormLabel>
                  <FormControl>
                    <SearchAndSelect
                      placeholder="eg. Physical Therapy, Education, Administration, Researcher"
                      // value={boardSpecialtiesSearchTerm}
                      // onClear={() => setBoardSpecialtiesSearchTerm("")}
                      // selectedSuggestions={value}
                      // onSelectedSuggestionsChange={onChange}
                      // onValueChange={setBoardSpecialtiesSearchTerm}
                      // {...props}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Identity , Ethnicity  , ReligiousAffiliation*/}
            <div className="pt-4">
              <div className="flex items-center space-x-2">
                <Switch onCheckedChange={handleClick} />
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
                    name="Identity"
                    disabled={!isShareMoreDetailsEnabled}
                    defaultValue="v"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Identity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Identity"
                            autoCapitalize="words"
                            autoComplete="given-Identity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></div>
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="Ethnicity"
                    defaultValue=""
                    disabled={!isShareMoreDetailsEnabled}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Ethnicity</FormLabel>
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
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    disabled={!isShareMoreDetailsEnabled}
                    name="firstName"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Religious Affiliation(s)</FormLabel>
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
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
