import { Link } from "react-router-dom";

import { Button } from "components";

function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-8">
      <h2 className="text-5xl font-semibold">Vico</h2>
      <p className="max-w-2xl text-center text-sm sm:text-lg">
        The objective of this project is to develop a dynamic user interface for
        a video conferencing platform, inspired by the grid layout observed in
        prominent platforms. The solution addresses key features such as dynamic
        video grid, aspect ratio handling, sidebar functionality, rendering
        heavy components, and adding animations.
      </p>

      <Button
        asChild
        className="rounded-full px-8 text-slate-950 font-semibold"
      >
        <Link to="/meeting">Get Started</Link>
      </Button>
    </div>
  );
}

export default Home;
