import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Toaster } from "components";
import { Home, Meeting } from "pages";

function App() {
  return (
    <Router>
      <div className="dark">
        <Suspense fallback={<div>Loading...</div>}>
          <main className="p-4 w-screen h-screen bg-background text-foreground overflow-hidden">
            <Routes>
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Toaster />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
