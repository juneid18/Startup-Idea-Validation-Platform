import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import StatsStrip from "../components/landing/Statsstrip";
import TrendingIdeas from "../components/landing/Trendingideas";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/Ctasection";
import Footer from "../components/landing/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <title>IdeaProof - Validate Your Startup Ideas with AI</title>
      <meta name="description" content="IdeaProof is an AI-powered platform that helps entrepreneurs validate their startup ideas through market analysis, competitor insights, and user feedback." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <TrendingIdeas />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
