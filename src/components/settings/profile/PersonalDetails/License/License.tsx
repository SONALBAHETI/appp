"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LicenseSchema, licenseSchemaObj } from "./validation";
import { Input, NumberInput, DatePicker } from "@/components/ui/FormFields";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function License() {
  const form = useForm<LicenseSchema>({
    resolver: zodResolver(licenseSchemaObj),
    mode: "onSubmit",
  });

  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="py-5 px-6 rounded-xl border">
      <h3 className="mb-7 mt-3">License Details</h3>
      <Form {...form}>
        <form>
          <div className="flex space-x-4 mb-6">
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
                  name="lastName"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="last name"
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
            </div>
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="flex-grow w-1/2">
              <FormField
                control={form.control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Email address (associated with license)
                    </FormLabel>
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
                  name="dataOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Date of Birth</FormLabel>
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
          <div className="flex space-x-4 w-1/2">
            <div className="flex-grow w-1/2">
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
        </form>
      </Form>
    </div>
  );
}
