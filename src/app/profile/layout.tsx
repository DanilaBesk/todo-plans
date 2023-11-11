import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>Profile Layout</h1>
      <div>{children}</div>
    </>
  );
};

export default layout;
