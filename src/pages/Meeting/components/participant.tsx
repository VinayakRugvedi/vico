import { useState, useEffect } from "react";
import { Loader2, Video, VideoOff } from "lucide-react";

import { Button } from "components";
import { type ParticipantAspectRatio, type ParticipantData } from "../meeting";

interface PropTypes {
  height: number;
  aspectRatio: ParticipantAspectRatio;
  participant: ParticipantData;
  showAllVideos: boolean;
  maxVisibleParticipants: number;
  participantsCount: number;
}

function Participant({
  height,
  aspectRatio,
  participant,
  showAllVideos,
  maxVisibleParticipants,
  participantsCount,
}: PropTypes) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  useEffect(() => {
    setShowVideo(showAllVideos);
  }, [showAllVideos]);

  if (height === 0) return null;

  const participantsPercentage = Math.floor(
    (participantsCount / maxVisibleParticipants) * 100,
  );
  let videoSource = "/sample-low-480p-5s.mp4";

  if (participantsPercentage <= 10) videoSource = "/sample-high-1080p-5s.mp4";
  else if (participantsPercentage <= 20)
    videoSource = "/sample-low-1080p-5s.mp4";
  else if (participantsPercentage <= 60)
    videoSource = "/sample-low-720p-5s.mp4";

  const avatarSize = Math.min(250, Math.floor(height / 2 - 16));
  const avatarFontSize = Math.floor(avatarSize / 3);

  return (
    <div
      className={`block rounded-lg bg-secondary p-4 relative`}
      style={{
        height: `${height - 16}px`,
        aspectRatio: `${aspectRatio.width}/${aspectRatio.height}`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div
          className={`uppercase rounded-full bg-primary/20 flex items-center justify-center text-5xl`}
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            fontSize: `${avatarFontSize}px`,
          }}
        >
          {participant.name[0]}
          {participant.name[1]}
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg overflow-hidden group">
        <Button
          className="rounded-full w-9 h-9 absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 group-hover:transition-opacity"
          onClick={() => setShowVideo(!showVideo)}
        >
          <span>
            {showVideo ? (
              <VideoOff className="w-5 h-5" />
            ) : (
              <Video className="w-5 h-5" />
            )}
          </span>
        </Button>
        {showVideo && isLoading && (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        {showVideo && (
          <>
            <video
              src={videoSource}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              playsInline
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onLoadedData={() => {
                setIsLoading(false);
              }}
            />
          </>
        )}
      </div>

      {/* <div className="absolute bottom-0 left-0 italic text-xs bg-primary/20 rounded-full px-2">
        {participant.name}
      </div> */}
    </div>
  );
}

export default Participant;
