import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Login = dynamic(
  () =>
    new Promise((resolve, reject) => {
      const attempt = () =>
        import("AuthRemote/Login").then(resolve).catch((err) => {
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

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | IdeaProof</title>
        <meta name="description" content="Login to your IdeaProof account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
