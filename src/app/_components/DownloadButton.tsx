import React from "react";
import { motion } from "framer-motion";
import EventIcon from '@mui/icons-material/Event';

interface DownloadButtonProps {
    onDownload: () => void;
}

const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
  return (
    <motion.button
      onClick={onDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1976d2", // Material UI primary blue
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        margin: "20px auto",
        outline: "none",
      }}
    >
      <EventIcon style={{ marginRight: "8px", fontSize: "20px" }} />
      Export Tracked Exams to Calendar
    </motion.button>
  );
};

export default DownloadButton;
