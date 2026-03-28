import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import NetworkContent from '@/components/Network/NetworkContent';
import Header from '@/components/Dashboard/Header';

const NetworkPage = () => {
  return (
    <>
      <Head>
        <title>Founder Network | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <NetworkContent />
        </div>
      </div>
    </>
  );
};

export default NetworkPage;
