import React from "react";
import ToggleSwitch from "@/components/ui/Switch/ToggleSwitch";
import SearchAndSelect from "@/components/ui/SearchAndSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  PersonalDetailsFormSchema,
  PersonalDetailsValues,
} from "../../validation";
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

export default function IdentityInfo() {
  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(PersonalDetailsFormSchema),
    mode: "onSubmit",
  });

  const [checked, setChecked] = React.useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  async function onSubmit(data: PersonalDetailsValues) {
    console.log(data);
  }
  function handleClick(checked: any) {
    setChecked(true);
  }

  return (
    <>
      <div className="relative flex-grow top-4 left-4 bottom-4 bg-white p-4 rounded-xl shadow-md border  ml-4 mr-12 mb-4 border-slate-300	">
        <h6 className="p-2 mb-4">Personal Details</h6>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
              <div className="flex-grow w-1/2">
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First nme"
                          autoCapitalize="words"
                          autoComplete="given-firstName"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-grow w-1/2">
                <FormField
                  control={form.control}
                  name="lastName"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name "
                          autoCapitalize="words"
                          autoComplete="given-lastName"
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
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            autoCapitalize="words"
                            autoComplete="given-email"
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

            {/* Degree, College/University, and Year of Completion input */}
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
                            autoCapitalize="words"
                            autoComplete="given-pronouns"
                            options={["asdas", "sadasd", "sdas"]}
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
                            autoCapitalize="words"
                            autoComplete="given-gender"
                            options={["asdas", "sadasd", "sdas"]}
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
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* First Name and Pronouns input */}
            <h6>Location</h6>
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
                          placeholder="Unites States"
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
                            autoCapitalize="words"
                            autoComplete="given-postalCode"
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
            <h6>Share your background</h6>
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
                  name="about"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>A fun fact about you (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here"
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

            {/* <TODO> Implement search and select for Area of speciality <TODO />  */}

            {/* Multi select */}
            <div className="relative">
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
            </div>

            <div className="flex items-center space-x-2">
              <ToggleSwitch Toggle={{ handleClick: handleClick }} />
              <h5 className="text-[#616467]">
                Share more details for better matches
              </h5>
            </div>

            <p className="text-[#616467] font-extrabold	">
              Understanding your background helps us connect you with the right
              people.
            </p>
            {/*  Need to make its validation  */}
            <div className="flex space-x-4">
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="firstName"
                    disabled={!checked}
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Identity</FormLabel>
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></div>
                </div>
              </div>
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="firstName"
                    defaultValue=""
                    disabled={!checked}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Etnicity</FormLabel>
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
                    disabled={!checked}
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
