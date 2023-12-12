"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import ToggleOptions from "@/components/ui/toggle-options";

import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import {
  UserOccupations,
  UserObjectives,
  USER_OCCUPATION_OPTIONS,
  USER_OBJECTIVE_OPTIONS,
  MENTOR_SPECIALISATIONS,
} from "@/constants/onboarding";
import { Button } from "../ui/button";

export default function OnboardingForm() {
  const { auth } = useAuth();
  const [updateUserDetails, updateUserDetailsLoading] = useApi({
    url: `/api/v1/users/${auth.userId}/updateUserDetailsFromOnboarding`,
    method: "PATCH",
  });
  const router = useRouter();
  const [userOccupation, setUserOccupation] = useState<IToggleOption>({
    label: "",
    value: "",
  });
  const [userObjective, setUserObjective] = useState<IToggleOption>({
    label: "",
    value: "",
  });

  const [mentorSpecialisations, setMentorSpecialisations] = useState<
    IToggleOption[]
  >([]);

  const handleUserOccupationChange = (options: IToggleOption[]) => {
    setUserObjective({ label: "", value: "" });
    setMentorSpecialisations([]);
    setUserOccupation(options[0]);
  };

  const handleUserObjectiveChange = (options: IToggleOption[]) => {
    setMentorSpecialisations([]);
    setUserObjective(options[0]);
  };

  // TODO: Optimize the request code (same code is repeating everywhere)
  const handleContinue = async () => {
    try {
      const payload = {
        occupation: userOccupation.value,
        objective: userObjective.value,
        specialisations: mentorSpecialisations.map(
          (specialisation) => specialisation.value
        ),
      };
      const { response, result } = await updateUserDetails({
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        // TODO: Update user in context
        router.push("/onboarding/success");
      } else {
        toast.error(
          result?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {}
  };

  return (
    <div>
      <h2 className="text-4xl font-medium">Tell us about yourself.</h2>
      <p className="text-md text-inactive mt-3">
        Help us understand you better.
      </p>

      <div className="flex flex-col gap-2 mt-6">
        <Label className="text-md">I am a</Label>
        <ToggleOptions
          options={USER_OCCUPATION_OPTIONS}
          selectedOptions={[userOccupation]}
          onChange={handleUserOccupationChange}
        />
      </div>

      {userOccupation.value === UserOccupations.HEALTHCARE_PROFESSIONAL && (
        <div className="flex flex-col gap-2 mt-6">
          <Label className="text-md">I want to</Label>
          <ToggleOptions
            options={USER_OBJECTIVE_OPTIONS}
            selectedOptions={[userObjective]}
            onChange={handleUserObjectiveChange}
          />
        </div>
      )}

      {userOccupation.value === UserOccupations.HEALTHCARE_PROFESSIONAL &&
        userObjective.value === UserObjectives.MENTOR_OTHERS && (
          <div className="flex flex-col gap-2 mt-6">
            <Label className="text-md">I specialise in</Label>
            <ToggleOptions
              className="flex-wrap"
              options={MENTOR_SPECIALISATIONS}
              allowMultipleSelection={true}
              selectedOptions={mentorSpecialisations}
              onChange={(options) => setMentorSpecialisations(options)}
            />
          </div>
        )}
      {mentorSpecialisations && mentorSpecialisations.length > 0 && (
        <Button
          disabled={updateUserDetailsLoading}
          className="mt-12 w-full"
          onClick={handleContinue}
        >
          {updateUserDetailsLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          Continue
        </Button>
      )}
    </div>
  );
}
