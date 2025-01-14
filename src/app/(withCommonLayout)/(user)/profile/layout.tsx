import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p>User Dashboard</p>
      {children}
    </div>
  );
};

export default layout;
