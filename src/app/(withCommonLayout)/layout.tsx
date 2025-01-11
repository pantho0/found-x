import { Link } from "@nextui-org/link";
import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default layout;
