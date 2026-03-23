import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Signup = dynamic(
  new Promise((resolve, reject) => {
    const attempt = () =>
      import("AuthRemote/Signup").then(resolve).catch((err) => {
        console.warn("Remote not ready, retrying...", err);
        setTimeout(attempt, 1000);
      });
    attempt();
  }),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
          color: "#9a9a94",
        }}
      >
        Loading...
      </div>
    ),
  },
);

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSuccess = ({ token, user }) => {
    login(token, user);
    router.push("/explore");
  };

  return (
    <>
      <Head>
        <title>Sign Up | IdeaProof</title>
        <meta
          name="description"
          content="Create an account on IdeaProof to submit your startup ideas and get AI-powered feedback"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup onSuccess={handleSuccess} />
    </>
  );
}
