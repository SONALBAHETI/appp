import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AboutMentor() {
  return (
    <div className="w-full rounded text-justify">
      <Card>
        <CardContent>
          <CardTitle className="text-md mt-3">About Mentor</CardTitle>
          <div className="font-light mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          </div>

          <CardTitle className="text-md mt-3">Fun fact About me</CardTitle>
          <div className="font-light mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          </div>

          <CardTitle className="text-md mt-3">Specialization</CardTitle>
          <div className="flex flex-wrap mt-3">
            <Card className="mr-2 mb-2 px-4 py-2 text-sm font-bold rounded-full border-2 border-[#001F18] bg-[#F5FBFB] text-black">
              Orthopedic
            </Card>
            <Card className="mr-2 mb-2 px-4 py-2 text-sm font-bold rounded-full border-2 border-[#001F18] bg-[#F5FBFB] text-black">
              Neurological
            </Card>
            <Card className="mr-2 mb-2 px-4 py-2 text-sm font-bold rounded-full border-2 border-[#001F18] bg-[#F5FBFB] text-black">
              Pediatric
            </Card>
            <Card className="mr-2 mb-2 px-4 py-2 text-sm font-bold rounded-full border-2 border-[#001F18] bg-[#F5FBFB] text-black">
              Orthopedic
            </Card>
            <Card className="mr-2 mb-2 px-4 py-2 text-sm font-bold rounded-full border-2 border-[#001F18] bg-[#F5FBFB] text-black">
              Pediatric
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
