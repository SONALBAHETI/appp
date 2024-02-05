import React from "react";
import Image from "next/image";
import Profile_under_review_img from "../../../../public/images/Profile/Profile_under_review.svg";

export default function SuccessPage() {
  return (
    <div className="text-center">
      <h2 className="mt-8 mb-4 text-2xl">Your Profile is under review!</h2>
      <div className="flex justify-center">
        <Image
          src={Profile_under_review_img}
          alt="Profile under review image"
          width={200}
          height={200}
        />
      </div>
      <h3 className="mt-6 mb-2 text-lg">We admire your enthusiasm!</h3>
      <div className="flex flex-col items-center">
        <p className="font-light text-slate-500 w-1/2">
          Your profile is currently being reviewed to ensure it meets our
          community standards. We'll keep you <br />
          updated on the progress.
          <br />
        </p>
        <p className="font-light text-slate-500 w-1/2 mt-3">
          In the meantime, get ready to connect with amazing opportunities.
        </p>
      </div>
    </div>
  );
}
