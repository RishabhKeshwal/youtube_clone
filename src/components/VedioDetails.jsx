import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Correct import

import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetails = () => {
  const [videosDetail, setVideosDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideosDetail(data?.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setRelatedVideos(data?.items)
    );
  }, [id]);

  if (!videosDetail?.snippet) return "Loading...";
  if (!relatedVideos) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videosDetail;

  const formatNumberWithCommas = (number) => {
    return parseInt(number).toLocaleString();
  };

  console.log(relatedVideos, "related videos");

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "90px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                color: "#fff",
              }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{
                      fontSize: "16px",
                      color: "green",
                      ml: "5px",
                    }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: "0.8" }}>
                  {formatNumberWithCommas(viewCount)} Views
                </Typography>

                <Typography variant="body1" sx={{ opacity: "0.8" }}>
                  {formatNumberWithCommas(likeCount)} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos
            videos={relatedVideos}
            direction={{ md: "column", xs: "column", sm: "row" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
