import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import UploadPage from './UploadPage.jsx';
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';  
import Home from './Home.jsx'
import FilePage from './FilePage.jsx';
import PurchasePage from './PurchasePage.jsx';
import ProfilePage from './ProfilePage.jsx';
import { LoaderIcon } from 'lucide-react';



// const [] = useState(0);
const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upload");
  const {user} = useSelector((state) => state.auth);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [])

  if(loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <LoaderIcon className='animate-spin' size={50}/>
      </div>
    );
  }
  return (
    <>
      <div className='min-h-screen dark:bg-gray-50 flex pb-20 bg-gray-100'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        {sidebarOpen &&  (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden' onClick={() => setSidebarOpen(false)}/>
        )}

        <div className='flex flex-col flex-1'>
          <Header setActiveTab={setActiveTab}/>
          <main className='flex-1 p-6 mt-20'>
            {activeTab === "upload" && <UploadPage setActiveTab={setActiveTab}/>}
            {activeTab === "profile" && <ProfilePage setActiveTab={setActiveTab}/>}
            {activeTab === "files" && <FilePage />}
            {activeTab === "plans" && <PurchasePage/>}
            {activeTab === "home" && <Home/>}
          </main>

        </div>

        <Footer setActiveTab={setActiveTab}/>

      </div>
    </>
  )
}

export default UserDashboard;