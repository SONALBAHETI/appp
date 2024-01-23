"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Input,
  Select,
  Textarea,
  NumberInput,
} from "@/components/ui/FormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PersonalDetailsFormSchema, PersonalDetailsValues } from "./validation";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function PersonalDetailsForm() {
  // Create a form instance using react-hook-form and zodResolver

  const [count, setcount] = useState<number>(1);

  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(PersonalDetailsFormSchema),
    mode: "onSubmit",
  });

  // Handle form submission
  async function onSubmit(data: PersonalDetailsValues) {
    console.log(data);
  }

  return (
    <>
      <div className="relative flex-grow top-4 left-4 bottom-4 bg-white p-4 rounded-xl shadow-md border w-64 ml-4 sm:ml-8 md:ml-64 lg:ml-64 xl:ml-64">
        <Link href="/profile/settings/personal-details">
          <div className="font-bold mt-5 text-black">
            <p>{"Profile Settings > Personal Details"}</p>
          </div>
        </Link>
        <div className="mb-4 flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/assets/svg/user.svg"
              width={90}
              height={13}
              alt="profile photo"
            />
          </div>
          <button className="ml-2  text-black py-1 px-2  border-2 rounded-md">
            Upload Photo
          </button>
        </div>
        {/* Form component with onSubmit handler */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            {/* View Profile link and Save Changes button */}
            <div className="absolute top-0 right-0 mt-4 mr-4 flex space-x-4">
              <div className="text-blue-500 mt-4 ">
                <Link href="/">
                  <p
                    className="underline underline-offset-4"
                    style={{ color: "black" }}
                  >
                    View Profile
                  </p>
                </Link>
              </div>
              <Button type="submit">Save Changes</Button>
            </div>

            {/* First Name and Pronouns input */}
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

              <div className="flex-grow w-2/4 relative">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="pronouns"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pronouns</FormLabel>
                        <FormControl>
                          <Select
                            placeholder="Select"
                            autoCapitalize="words"
                            autoComplete="given-name"
                            options={["asdas", "sadasd", "sdas"]}
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

            {/* Gender and Year of Experience input */}
            <div className="flex space-x-4">
              <div className="flex-grow w-2/4 relative">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="gender"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            placeholder="Select an option"
                            autoCapitalize="words"
                            autoComplete="given-name"
                            options={["asdas", "sadasd", "sdas"]}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex-grow w-2/4">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Year of experience</FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="Select an option"
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

            {/* Phone number and Email input */}
            <div className="flex space-x-4">
              <div className="flex-grow w-1/2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <NumberInput
                          placeholder="Phone Number"
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

              <div className="flex-grow w-1/2">
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

            {/* About Yourself input */}
            <FormField
              control={form.control}
              name="about"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tell us about yourself</FormLabel>
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

            {/* Multi select */}
            <div className="relative">
              <FormField
                control={form.control}
                name="speciality"
                defaultValue=""
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Speciality areas</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Select an option"
                        autoCapitalize="words"
                        autoComplete="given-name"
                        options={["asdas", "sadasd", "sdas"]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country, State, Postal Code input field */}
            <div className="flex space-x-4">
              <div className="flex-grow w-1/3">
                <FormField
                  control={form.control}
                  name="country"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="United States"
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

              <div className="flex-grow w-1/3">
                <FormField
                  control={form.control}
                  name="state"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="California"
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

              <div className="flex-grow w-1/3">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="12345"
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

            {/* Degree, Collage, Year of Completion input field */}
            <label htmlFor="education">Education:</label>
            <div className="flex space-x-4">
              <div className="flex-grow w-1/3">
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="degree"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Select
                            placeholder="Select an option"
                            autoCapitalize="words"
                            autoComplete="given-name"
                            options={["asdas", "sadasd", "sdas"]}
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
                    name="collage"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Collage/University</FormLabel>
                        <FormControl>
                          <Select
                            placeholder="Select an option"
                            autoCapitalize="words"
                            autoComplete="given-name"
                            options={["asdas", "sadasd", "sdas"]}
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
                    name="yearOfComplition"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Year of Completion</FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="Select an option"
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
        <button
          onClick={(e) => setcount((prev) => prev + 1)}
          className="mr-10 mt-3 bg-[#5FA09F] p-2 text-white rounded-md "
        >
          + Add another degree
        </button>
      </div>
    </>
  );
}
