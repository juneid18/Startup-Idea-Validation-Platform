import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import RecentActivityContent from '@/components/RecentActivity/RecentActivityContent';
import Header from '@/components/Dashboard/header';

const RecentActivityPage = () => {
  return (
    <>
      <Head>
        <title>Recent Activity | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <RecentActivityContent />
        </div>
      </div>
    </>
  );
};

export default RecentActivityPage;
