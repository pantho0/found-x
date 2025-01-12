import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default layout;
