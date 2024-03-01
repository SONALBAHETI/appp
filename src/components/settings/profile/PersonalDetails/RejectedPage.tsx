import React from "react";
import Image from "next/image";
import Profile_Rejected_img from "../../../../public/images/Profile/Profile_rejected.svg";
import { Button } from "@/components/ui/button";

export default function RejectedPage() {
  return (
    <div className="text-center">
      <h2 className="mt-8 mb-4 text-2xl">Your Profile is under review!</h2>
      <div className="flex justify-center">
        <Image
          src={Profile_Rejected_img}
          alt="Profile rejected image"
          width={200}
          height={200}
        />
      </div>
      <h3 className="mt-6 mb-2 text-lg">We're excited to welcome you!</h3>
      <div className="flex flex-col items-center">
        <p className="font-light text-slate-500 w-1/2">
          Your profile currently doesn't quite meet our community guidelines.
        </p>
        <p className="font-light text-slate-500 w-1/2 mt-3">
          Don't worry! you can retry again. Consider it a stepping stone to an
          even better connection with our platform.
        </p>
        <Button className="mt-4 w-24 p-1">Retry</Button>
        <p className="font-light text-slate-500 w-1/2 mt-3 ">
          You have now 3 attempts left
        </p>
      </div>
    </div>
  );
}
