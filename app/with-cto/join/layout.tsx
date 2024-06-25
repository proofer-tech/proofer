import "./global.scss";
import WithCTOCustomerServiceWidget from "@/app/with-cto/components/WithCTOCustomerServiceWidget";
import React from "react";

export default function Layout({ children }: any) {
  return (
    <>
      <WithCTOCustomerServiceWidget withJoinBtn={false} />
      {children}
    </>
  );
}
