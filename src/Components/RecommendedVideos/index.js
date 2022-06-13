import React, { useEffect, useState } from "react";
import "./Recommendedvideos.css";
import { VideoCard } from "../../Utils/VideoCard/index";
import dayjs from "dayjs";

const humanize = () => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(
    Math.floor(Math.random() * (10000000 - 10000) + 10000)
  );
};

const dateHumanize = () => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(
    Math.floor(Math.random() * (10 - 1) + 1)
  );
};

function RecommendedVideos() {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    fetchRecommendedVideos();
  }, []);

  const fetchRecommendedVideos = async () => {
    try {
      // aqui va la peticion al backend

      const response = await fetch(
        process.env.REACT_APP_API +
          `/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&maxResults=50`
      );
      const videos = await response.json();
      setRecommendedVideos(videos.items);
    } catch (error) {
      // aqui va el error
    }
  };

  return (
    <div className="recommendedvideos">
      <h2>Recommended Videos </h2>
      <div className="recommendedVideos__videos">
        {recommendedVideos.map((recommendedVideo) => {
          console.log(recommendedVideo);
          return (
            <VideoCard
              key={recommendedVideo.id.videoId}
              channelImage="https://avatars2.githubusercontent.com/u/24712956?s=400&u=b71527e605ae1b748fc2d4127a842e57e427ad44&v=4"
              title={recommendedVideo.snippet.title}
              views={humanize()}
              timestamp={dateHumanize() + "days a ago"}
              channel={recommendedVideo.snippet.channel}
              image={recommendedVideo.snippet.thumbnails.medium.url}
            />
          );
        })}
      </div>
    </div>
  );
}

export { RecommendedVideos };
