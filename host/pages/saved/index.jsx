import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import SavedContent from '@/components/Saved/SavedContent';
import Header from '@/components/Dashboard/header';

const SavedPage = () => {
  return (
    <>
      <Head>
        <title>Saved Ideas | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <SavedContent />
        </div>
      </div>
    </>
  );
};

export default SavedPage;