const ASPECT_RATIOS = {
  Large: {
    width: 16,
    height: 9,
    display: "16 : 9",
  },
  Medium: {
    width: 4,
    height: 3,
    display: "4 : 3",
  },
  Square: {
    width: 1,
    height: 1,
    display: "1 : 1",
  },
};

export type AspectRatioNames = "Large" | "Medium" | "Square";

const HALL_PARTICIPANTS_LIMIT = [
  {
    minWidth: 1280,
    maxVisibleParticipants: 49,
  },
  {
    minWidth: 1024,
    maxVisibleParticipants: 34,
  },
  {
    minWidth: 768,
    maxVisibleParticipants: 29,
  },
  {
    minWidth: 640,
    maxVisibleParticipants: 15,
  },
  {
    minWidth: 300,
    maxVisibleParticipants: 10,
  },
];

const MAX_PARTICIPANTS = 10000;

export { ASPECT_RATIOS, HALL_PARTICIPANTS_LIMIT, MAX_PARTICIPANTS };
