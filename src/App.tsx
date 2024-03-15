import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Meeting } from "pages";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="p-4 w-screen h-screen dark bg-background text-foreground overflow-hidden">
          <Routes>
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
