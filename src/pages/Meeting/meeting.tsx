import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UsersRound } from "lucide-react";

import { Controls, Participant, SidePanel } from "./components";
import { useToast } from "components";
import { cn } from "utils/lib";
import { generateParticipants } from "utils/mock";
import {
  ASPECT_RATIOS,
  type AspectRatioNames,
  HALL_PARTICIPANTS_LIMIT,
  MAX_PARTICIPANTS,
} from "utils/constants";

export interface HallDimensions {
  width: number;
  height: number;
}

export interface ParticipantData {
  name: string;
  id: string;
}

export interface HallSettings {
  showSidePanel: boolean;
  showAllVideos: boolean;
  participantAspectRatio: {
    width: number;
    height: number;
    name: AspectRatioNames;
  };
}
export type ParticipantAspectRatio = HallSettings["participantAspectRatio"];

function Meeting() {
  const [participants, setParticipants] = useState<ParticipantData[]>(
    generateParticipants(3),
  );
  const [hallDimensions, setHallDimensions] = useState<HallDimensions>({
    width: 0,
    height: 0,
  });
  const [hallSettings, setHallSettings] = useState<HallSettings>({
    showSidePanel: false,
    showAllVideos: false,
    participantAspectRatio: {
      width: ASPECT_RATIOS.Large.width,
      height: ASPECT_RATIOS.Large.height,
      name: "Large",
    },
  });

  const { toast } = useToast();
  const hallRef = useRef<HTMLDivElement>(null);
  const { showSidePanel, participantAspectRatio } = hallSettings;
  const participantsCount = participants.length;

  useEffect(() => {
    if (!hallRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const element = entries[0].target;
      const width = element.getBoundingClientRect().width;
      const height = element.getBoundingClientRect().height;
      setHallDimensions({ width, height });
    });

    observer.observe(hallRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hallRef]);

  const optimalDimensions = {
    width: 0,
    height: 0,
    rows: 0,
    cols: 0,
  };

  const hallWidth = hallDimensions.width;
  const hallHeight = hallDimensions.height;

  // NOTE: We are limiting the maximum participants that are visible to ensure less clutter and better aesthetics
  let maxVisibleParticipants = 0;
  for (const limit of HALL_PARTICIPANTS_LIMIT) {
    if (hallWidth >= limit.minWidth) {
      maxVisibleParticipants = limit.maxVisibleParticipants;
      break;
    }
  }

  const hallAspectRatio = (hallWidth / hallHeight).toFixed(2);
  const userContainerAspectRatio = (
    participantAspectRatio.width / participantAspectRatio.height
  ).toFixed(2);

  function getWidthDerivedDimensions(rows: number) {
    const usersPerRowCount = Math.ceil(
      Math.min(participantsCount, maxVisibleParticipants) / rows,
    );
    let width = Math.floor(hallWidth / usersPerRowCount);
    let height = Math.floor(
      (width * participantAspectRatio.height) / participantAspectRatio.width,
    );

    if (height * rows <= hallHeight) {
      if (optimalDimensions.width + optimalDimensions.height < width + height) {
        optimalDimensions.width = width;
        optimalDimensions.height = height;
        optimalDimensions.rows = rows;
        optimalDimensions.cols = usersPerRowCount;
      }
    }
  }

  function getHeightDerivedDimensions(rows: number) {
    const usersPerRowCount = Math.ceil(
      Math.min(participantsCount, maxVisibleParticipants) / rows,
    );
    let height = Math.floor(hallHeight / rows);
    let width = Math.floor(
      (height * participantAspectRatio.width) / participantAspectRatio.height,
    );

    if (width * usersPerRowCount <= hallWidth) {
      if (optimalDimensions.width + optimalDimensions.height < width + height) {
        optimalDimensions.width = width;
        optimalDimensions.height = height;
        optimalDimensions.rows = rows;
        optimalDimensions.cols = usersPerRowCount;
      }
    }
  }

  if (hallAspectRatio >= userContainerAspectRatio) {
    // Width of screen is being a contraint
    for (let rows = 1; rows <= Math.ceil(participantsCount / 2); rows++) {
      getWidthDerivedDimensions(rows);
      getHeightDerivedDimensions(rows);
    }
  } else {
    // Height of screen is being a contraint
    for (let rows = participantsCount; rows >= 1; rows--) {
      getWidthDerivedDimensions(rows);
      getHeightDerivedDimensions(rows);
    }
  }

  const updateParticipants = (isDeleting = false) => {
    if (isDeleting && participantsCount <= 1) return;

    const participantsCopy = [...participants];
    let participantInConcern = {} as ParticipantData;
    if (!isDeleting) {
      if (participantsCount === MAX_PARTICIPANTS) return;
      participantInConcern = generateParticipants(1)[0];
      participantsCopy.push(participantInConcern);
    } else {
      const visibleParticipantsCount = Math.min(
        participantsCount,
        maxVisibleParticipants,
      );
      const deleteIndex = Math.random() * visibleParticipantsCount;
      participantInConcern = participantsCopy.splice(deleteIndex, 1)[0];
    }

    setParticipants([...participantsCopy]);
    isDeleting
      ? toast({
          description: `${participantInConcern.name} left the meeting.`,
        })
      : toast({
          description: `${participantInConcern.name} joined the meeting.`,
        });
  };

  const updateParticipantAspectRatio = (aspectRatioName: AspectRatioNames) => {
    const hallSettingsCopy = { ...hallSettings };
    hallSettingsCopy.participantAspectRatio = {
      width: ASPECT_RATIOS[aspectRatioName].width,
      height: ASPECT_RATIOS[aspectRatioName].height,
      name: aspectRatioName,
    };
    setHallSettings({ ...hallSettingsCopy });
  };

  const handleSidePanelState = () => {
    const hallSettingsCopy = { ...hallSettings };
    hallSettingsCopy.showSidePanel = !hallSettings.showSidePanel;
    setHallSettings({ ...hallSettingsCopy });
  };

  const handleParticipantVidoesState = () => {
    const hallSettingsCopy = { ...hallSettings };
    hallSettingsCopy.showAllVideos = !hallSettings.showAllVideos;
    setHallSettings({ ...hallSettingsCopy });
  };

  const nonVisibleParticipants =
    participantsCount - maxVisibleParticipants <= 0
      ? 0
      : participantsCount - maxVisibleParticipants;

  const content = [];
  for (
    let i = 0;
    i < Math.min(participantsCount, maxVisibleParticipants);
    i++
  ) {
    content.push(
      <motion.div
        key={participants[i].id}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2 },
        }}
        layout
      >
        <Participant
          height={optimalDimensions.height}
          aspectRatio={participantAspectRatio}
          showAllVideos={hallSettings.showAllVideos}
          maxVisibleParticipants={maxVisibleParticipants}
          participantsCount={participantsCount}
          participant={participants[i]}
        />
      </motion.div>,
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <div
        className={cn(
          "w-full h-full flex overflow-hidden",
          showSidePanel ? "gap-4" : "",
        )}
      >
        <div
          className="flex justify-center items-center w-full h-full relative"
          ref={hallRef}
        >
          <div className="flex gap-4 flex-wrap justify-center items-center">
            <AnimatePresence>{content}</AnimatePresence>
          </div>
          {nonVisibleParticipants > 0 ? (
            <div className="absolute bottom-0 right-0 text-primary border px-3 rounded-full py-1 flex items-center gap-2 bg-primary/10">
              <UsersRound className="w-4 h-4" />
              <span>{nonVisibleParticipants} more</span>
            </div>
          ) : null}
        </div>

        <SidePanel
          showSidePanel={showSidePanel}
          hallHeight={hallHeight}
          hallWidth={hallWidth}
          handleSidePanelState={handleSidePanelState}
        />
      </div>

      <Controls
        hallSettings={hallSettings}
        updateParticipants={updateParticipants}
        handleSidePanelState={handleSidePanelState}
        participantsCount={participantsCount}
        updateParticipantAspectRatio={updateParticipantAspectRatio}
        handleParticipantVidoesState={handleParticipantVidoesState}
      />
    </div>
  );
}

export default Meeting;
