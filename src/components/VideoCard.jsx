import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoVideoUrl,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  vedio: {
    id: { videoId },
    snippet,
  },
}) => {
  return (
    <Card
      sx={{
        width: "280px",
        boxShadow: "none",
        borderRadius: 0,
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={
            snippet?.thumbnails?.high?.url
              ? snippet?.thumbnails?.high?.url
              : demoThumbnailUrl
          }
          alt={snippet?.title}
          sx={{
            width: "280px",
            height: "180px",
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "110px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="gray"
            alignItems="center"
            flexWrap="wrap"
          >
            {snippet?.channelTitle.slice(0, 60) ||
              demoChannelTitle.slice(0, 60)}
            <CheckCircle
              sx={{
                fontSize: 16,
                color: "gray",
                ml: "10px",
              }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
