import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

const ChapterContent = ({ chapter, content }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl text-red-500">
        {chapter?.chapterName}
      </h2>
      <h2 className="text-sm text-gray-200">{chapter?.about}</h2>

      {/* video */}
      <div className="flex justify-center my-6">
        {content?.videoId === null ? (
          <div className="flex items-center justify-center w-[640px] h-[390px] bg-black text-white">
            No Video is Available
          </div>
        ) : (
          <YouTube videoId={content?.videoId} opts={opts} />
        )}
      </div>

      {/* content */}
      <div>
        {content?.content?.length > 0 ? (
          content?.content.map((item, index) => (
            <div className="mb-3 rounded-lg" key={index}>
              <h2 className="font-semibold text-lg underline text-orange-500">
                {item?.title}
              </h2>
              <ReactMarkdown className={"text-white text-sm"}>
                {item?.explanation}
              </ReactMarkdown>
              {item?.codeExample && (
                <div className="p-4 bg-black text-white mt-2 text-sm rounded-md">
                  <pre>
                    <code>{item.codeExample}</code>
                  </pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            No content available for this chapter.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
