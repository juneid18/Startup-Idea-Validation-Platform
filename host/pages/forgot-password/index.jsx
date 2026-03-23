import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const ForgotPassword = dynamic(
  () => import("AuthRemote/ForgotPassword"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password | IdeaProof</title>
        <meta name="description" content="Reset your IdeaProof account password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  
      <ForgotPassword />
    </>
  );
}