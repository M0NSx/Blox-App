"use client";

import { ImageIcon } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const ComboVideo = ({ comboVideo }: any) => {
  return (
    <div className="mb-1">
      {comboVideo ? (
        <div suppressHydrationWarning>
          <h2 className="font-bold mb-2">Combo Video:</h2>
          <ReactPlayer
            url={comboVideo}
            width="100%"
            height="200px"
            controls
          />
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default ComboVideo;