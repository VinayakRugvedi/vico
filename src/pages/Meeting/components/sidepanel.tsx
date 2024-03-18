import { useState, useEffect } from "react";
import { X, Wand } from "lucide-react";

import { Button } from "components";
import { Sheet, SheetContent } from "components";

import { cn } from "utils/lib";

interface PropTypes {
  showSidePanel: boolean;
  hallHeight: number;
  hallWidth: number;
  handleSidePanelState: () => void;
}

function SidePanel({
  showSidePanel,
  hallHeight,
  hallWidth,
  handleSidePanelState,
}: PropTypes) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  useEffect(() => {
    if (!showSidePanel) {
      setIsAnimationComplete(false);
    }
  }, [showSidePanel]);

  if (hallWidth >= 750) {
    return (
      <div
        className={cn(
          "bg-secondary rounded-lg self-center transition-[flex-basis] duration-500 ease-in",
          !showSidePanel ? "basis-0" : "basis-[450px]",
        )}
        onTransitionEnd={() => showSidePanel && setIsAnimationComplete(true)}
        style={{
          height: `${hallHeight - 16}px`,
        }}
      >
        {showSidePanel && isAnimationComplete && (
          <div className="h-full">
            <div className="w-full flex items-center justify-between p-4 border-b border-primary/30">
              <h6 className="text-lg font-medium">Side Panel</h6>
              <Button
                className="rounded-full h-10 w-10"
                onClick={() => handleSidePanelState()}
              >
                <span>
                  <X className="h-4 w-4" />
                </span>
              </Button>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-8 h-[70%]">
              <span>
                <Wand className="w-20 h-20 text-primary" />
              </span>
              <p className="text-center">More actions will appear here.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Sheet open={showSidePanel} onOpenChange={handleSidePanelState}>
      <SheetContent className="dark p-0 bg-secondary text-foreground w-[325px]">
        <div className="w-full flex items-center justify-between p-4 border-b border-primary/30">
          <h6 className="text-lg font-medium">Side Panel</h6>
          <Button
            className="rounded-full h-10 w-10"
            onClick={() => handleSidePanelState()}
          >
            <span>
              <X className="h-4 w-4" />
            </span>
          </Button>
        </div>

        <div className="h-full">
          <div className="px-4 flex items-center justify-center flex-col gap-8 h-[70%]">
            <span>
              <Wand className="w-20 h-20 text-primary" />
            </span>

            <p className="text-center">More actions will appear here.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SidePanel;
