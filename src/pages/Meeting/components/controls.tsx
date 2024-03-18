import { useMemo } from "react";
import {
  UserPlus,
  UserMinus,
  PanelRightOpen,
  PanelRightClose,
  VideoOff,
  Video,
} from "lucide-react";

import { Button } from "components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components";
import {
  ASPECT_RATIOS,
  type AspectRatioNames,
  MAX_PARTICIPANTS,
} from "utils/constants";
import { type HallSettings } from "../meeting";

interface PropTypes {
  hallSettings: HallSettings;
  participantsCount: number;
  updateParticipants: (arg0?: boolean) => void;
  handleSidePanelState: () => void;
  updateParticipantAspectRatio: (arg0: AspectRatioNames) => void;
  handleParticipantVidoesState: () => void;
}

function Controls({
  hallSettings,
  participantsCount,
  updateParticipants,
  handleSidePanelState,
  updateParticipantAspectRatio,
  handleParticipantVidoesState,
}: PropTypes) {
  const aspectRatioOptions = useMemo(() => {
    const options = [];
    for (const [name, ratio] of Object.entries(ASPECT_RATIOS)) {
      options.push(
        <SelectItem value={name} className="cursor-pointer" key={name}>
          {ratio.display}
        </SelectItem>,
      );
    }
    return options;
  }, []);

  const { showSidePanel, showAllVideos, participantAspectRatio } = hallSettings;

  const onValueChange = (newRatioName: AspectRatioNames) => {
    updateParticipantAspectRatio(newRatioName);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-4 flex-wrap">
      <Button
        className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
        onClick={() => updateParticipants()}
        disabled={participantsCount === MAX_PARTICIPANTS ? true : false}
      >
        <span>
          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </Button>

      <Button
        className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
        onClick={() => updateParticipants(true)}
        disabled={participantsCount === 1 ? true : false}
      >
        <span>
          <UserMinus className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </Button>

      <Button
        className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
        onClick={handleSidePanelState}
      >
        <span>
          {showSidePanel ? (
            <PanelRightClose className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <PanelRightOpen className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </span>
      </Button>

      <Select value={participantAspectRatio.name} onValueChange={onValueChange}>
        <SelectTrigger className="rounded-full border border-primary w-24 h-10 sm:h-12">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dark">{aspectRatioOptions}</SelectContent>
      </Select>

      <Button
        className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
        onClick={handleParticipantVidoesState}
      >
        <span>
          {showAllVideos ? (
            <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </span>
      </Button>
    </div>
  );
}

export default Controls;
