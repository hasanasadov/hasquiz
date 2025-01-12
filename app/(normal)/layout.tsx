import { Navbar } from "@/components/shared/Navbar";
import React, { PropsWithChildren } from "react";

const BusinessLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-black" >
      <Navbar />
      {children}
    </div>
  );
};

export default BusinessLayout;
