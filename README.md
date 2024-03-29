# ViCo - Video Conferencing UI

The objective of this project is to develop a dynamic user interface for a video conferencing platform, inspired by the grid layout observed in prominent platforms. The solution addresses key features such as dynamic video grid, aspect ratio handling, sidebar functionality, rendering heavy components, and adding animations.

## Setup Instructions

To set up and run the project locally, follow these steps:

1. Clone the repository -
   `git clone git@github.com:VinayakRugvedi/vico.git`
2. `cd vico`
3. `yarn install`
4. `yarn dev`
5. Open your browser and visit http://localhost:5173 to view the project.

## Demo

A live demo of the project can be accessed at https://vico-delta.vercel.app/

## Technology Stack

- TypeScript
- React
- TailwindCSS

## Further Action

One possible performance enhancement could be achieved by preserving/caching previously computed dimensions along with the extrapolated values within the range of the participant. By caching these values, we can avoid redundant calculations and optimize the rendering process.
