import React from 'react'
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaTwitter,
  FaFacebookF,
  FaLink,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ShareModal = ({file, onClose}) => {

  const handleShare = (shortUrl) => {
    const frontendBaseUrl = window.location.origin;
    const fullUrl = `${frontendBaseUrl}${shortUrl}`;
  }





  return (<div>ShareModal</div>)
}

export default ShareModal