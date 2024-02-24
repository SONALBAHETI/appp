import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import React from "react";

export default function Education() {
  return (
    <>
      <Card className="p-10">
        <h4 className="mb-6 text-center lg:text-left">Education</h4>
        <div className="rounded ">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-shrink-0 lg:mr-2 lg:flex-grow">
              <Card className="bg-[#F8F8F8]">
                <div className="flex">
                  <div className="flex-shrink-0 ml-4 mt-7">
                    <GraduationCap />
                  </div>
                  <div>
                    <CardHeader>
                      <CardTitle className="text-md -mb-5">
                        About Mentor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="-mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </CardContent>
                    <CardFooter>2018-2022</CardFooter>
                  </div>
                </div>
              </Card>
            </div>

            {/* Second Card */}
            <div className="flex-shrink-0 lg:ml-2 lg:flex-grow mt-4 lg:mt-0">
              <Card className="bg-[#F8F8F8]">
                <div className="flex">
                  <div className="flex-shrink-0 ml-4 mt-7">
                    <GraduationCap />
                  </div>
                  <div>
                    <CardHeader>
                      <CardTitle className="text-md -mb-5">
                        About Mentor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="-mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </CardContent>
                    <CardFooter>2018-2022</CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="mb-6 text-center lg:text-left">
            Awards & Achievements
          </h4>
          <Card className="bg-[#F8F8F8] ">
            <div className="flex">
              <div className="flex-shrink-0 ml-4 mt-7">
                <GraduationCap />
              </div>
              <div>
                <CardHeader>
                  <CardTitle className="text-md -mb-5">About Mentor</CardTitle>
                </CardHeader>
                <CardContent className="-mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </CardContent>
                <CardFooter>2018-2022</CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </>
  );
}
