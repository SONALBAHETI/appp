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
  USER_OCCUPATION_OPTIONS,
  USER_OBJECTIVE_OPTIONS,
  MENTOR_SPECIALISATIONS,
} from "@/constants/onboarding";
import { Button } from "../ui/button";
import {
  isHealthcareProfessional,
  isLookingForMentor,
  isLookingToMentorOthers,
} from "./utils";
import SearchAndSelect from "../ui/SearchAndSelect";

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
  const [primaryAreasSearchTerm, setPrimaryAreasSearchTerm] =
    useState<string>("");
  const [primaryAreasOfInterest, setPrimaryAreasOfInterest] = useState<
    Array<string>
  >(["Physical Therapy", "Speech Pathology", "Cardiology"]);
  const [selectedPrimaryAreasOfInterest, setSelectedPrimaryAreasOfInterest] =
    useState<string[]>([]);

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
        config: { body: JSON.stringify(payload) },
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
      <h1>Tell us about yourself.</h1>
      <p className="text-md text-faded mt-3">Help us understand you better.</p>

      {/* User occupations */}
      <div className="flex flex-col gap-2 mt-6">
        <Label className="text-md">I am a</Label>
        <ToggleOptions
          options={USER_OCCUPATION_OPTIONS}
          selectedOptions={[userOccupation]}
          onChange={handleUserOccupationChange}
        />
      </div>

      {/* User's objectives if the user is a healthcare professional */}
      {isHealthcareProfessional(userOccupation) && (
        <div className="flex flex-col gap-2 mt-6">
          <Label className="text-md">I want to</Label>
          <ToggleOptions
            options={USER_OBJECTIVE_OPTIONS}
            selectedOptions={[userObjective]}
            onChange={handleUserObjectiveChange}
          />
        </div>
      )}

      {/* User's primary areas of interest if the user wants to find a mentor */}
      {isLookingForMentor(userOccupation, userObjective) && (
        <div className="flex flex-col gap-2 mt-6">
          <Label className="text-md">Primary areas of interest</Label>
          <SearchAndSelect
            placeholder="eg. Physical Therapy, Education, Administration, Researcher"
            value={primaryAreasSearchTerm}
            suggestions={primaryAreasOfInterest}
            selectedSuggestions={selectedPrimaryAreasOfInterest}
            onSelectedSuggestionsChange={setSelectedPrimaryAreasOfInterest}
            onValueChange={setPrimaryAreasSearchTerm}
          />
        </div>
      )}

      {/* Specialisations if the user is a healthcare professional and wants to mentor others */}
      {isLookingToMentorOthers(userOccupation, userObjective) && (
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
