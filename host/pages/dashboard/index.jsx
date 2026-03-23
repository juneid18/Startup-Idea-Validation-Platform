import Head from 'next/head';
import Analytics from '@/components/Dashboard/Analytics';
import SideBar from '@/components/Dashboard/SideBar';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | IdeaProof</title>
      </Head>
      <div className="min-h-screen bg-stone-50/50 flex flex-col md:flex-row font-sans">
        <SideBar />
        <Analytics />
      </div>
    </>
  );
}