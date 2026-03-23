import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import RecommendationsContent from '@/components/Recommendations/RecommendationsContent';
import Header from '@/components/Dashboard/header';

const RecommendationsPage = () => {
  return (
    <>
      <Head>
        <title>AI Recommendations | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <RecommendationsContent />
        </div>
      </div>
    </>
  );
};

export default RecommendationsPage;
