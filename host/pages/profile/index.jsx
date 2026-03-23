import Head from 'next/head';
import SideBar from '@/components/Dashboard/SideBar';
import ProfileContent from '@/components/Profile/ProfileContent';
import Header from '@/components/Dashboard/header';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Account Profile | IdeaProof</title>
      </Head>
      <Header />
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-10">
          <ProfileContent />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
