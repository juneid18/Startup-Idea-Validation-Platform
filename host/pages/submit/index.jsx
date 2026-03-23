import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import Header from '@/components/Dashboard/Header';
import SubmitContent from '@/components/Submit/SubmiteContent';

const SubmitPage = () => {
  return (
    <>
      <Head>
        <title>Submit Startup Idea | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans">
        <SideBar />
        <SubmitContent />
      </div>
    </>
  );
};

export default SubmitPage;
