import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";

const DownloadPage = () => {
  const { shortCode } = useParams();

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchFile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/files/f/${shortCode}`
        );

        if (cancelled) return;
        const data = res.data;
        setFile(data);
        setIsProtected(data.isPasswordProtected);
        setLoading(false);

        if(data.isPasswordProtected) {
          toast.info("🔒 This file is password protected");
        }
      } catch (error) {
        if(!cancelled) {
          setError(error.response?.data?.message || "❌ File not found")
        }
      }
    };

    fetchFile();
    return () => {
      cancelled = true;
    };
  }, [shortCode]);

  const handleDownload = () => {
    if(!file) return;
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const verifyFile = async () => {
    if(!password.trim()) {
      toast.warn("⚠️ Please enter the password");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/api/files/verifyFilePassword`, {
        shortCode,
        password,
      });
      
      if(res.data.success) {
        toast.success("✅ Access granted");
        setIsVerified(true);
      }
      else {
        toast.error("❌ Incorrect password");
      }
    } catch (error) {
      toast.error("❌ Something went wrong");
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  if(loading || !file){
    return(
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Getting file info...
      </div>
    )
  }

  return(
    <>
    <div className="w-full min-w-screen-lg ">
      <Header/>


    </div>
    </>
  );
};

export default DownloadPage;
