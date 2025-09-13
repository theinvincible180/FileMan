import express, {Router} from "express";
import upload from '../middlewares/upload.middleware.js';
import { uploadFiles, downloadFile, deleteFile, updateFileStatus, getFileDetails, generateShareShortenLink, sendLinkEmail, updateFileExpiry, updateAllFileExpiry, updateFilePassword, searchFiles, showUserFiles, generateQR, getDownloadCount, downloadInfo, resolveShareLink, verifyFilePassword, getUserFiles } from "../controllers/file.controller.js";

const router = Router();

router.post('/upload', upload.array('files'), uploadFiles);
router.get('/download/:fileId', downloadFile);
router.delete("/delete/:fileId",deleteFile);
router.put("/update/:fileId",updateFileStatus);
router.get("/getFileDetails/:fileId",getFileDetails);
router.post('/generateShareShortenLink', generateShareShortenLink);
router.post('/sendLinkEmail', sendLinkEmail);

router.post('/FileExpiry', updateFileExpiry);
router.post('/updateAllFileExpiry', updateAllFileExpiry);
router.post('/updateFilePassword', updateFilePassword);
router.get('/searchFiles', searchFiles);
router.get('/showUserFiles', showUserFiles);

router.get('/generateQR/:fileId', generateQR);
router.get('/getDownloadCount/:fileId', getDownloadCount);

router.get('/f/:shortCode',downloadInfo);

router.get('/resolveShareLink/:code', resolveShareLink);
router.post('/verifyFilePassword', verifyFilePassword);

router.get('/getUserFiles/:userId', getUserFiles);

export default router;