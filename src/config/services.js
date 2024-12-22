import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResult: 1,
    type: "video",
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  };

  const response = await axios.get(YOUTUBE_BASE_URL, {params});

  return response.data.items;
};
