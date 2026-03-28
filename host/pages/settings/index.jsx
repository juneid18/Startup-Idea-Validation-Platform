import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import SettingsContent from '@/components/Settings/SettingsContent';
import Header from '@/components/Dashboard/Header';

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Settings | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <SettingsContent />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
