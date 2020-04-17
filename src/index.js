import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import CanvasDraw from "react-canvas-draw";

export const ReactLiveDrawing = forwardRef((props, ref) => {
  const { db } = props;
  let canvasRef = useRef(null);
  const saveCanvas = () => {
    const data = canvasRef.getSaveData();
    db.set(JSON.parse(data));
  };

  useImperativeHandle(ref, () => ({
    clear() {
      canvasRef.clear();
      console.log(db.child("lines"));
      db.child("lines").remove();
    },
  }));

  return (
    <CanvasDraw
      onChange={(e) => {
        saveCanvas();
      }}
      ref={(canvasDraw) => (canvasRef = canvasDraw)}
      {...props}
    />
  );
});

export const LiveViewer = ({ props, db, immediate = false }) => {
  let canvasRef = useRef(null);
  const draws = useState(null);
  let simulating = false;
  let drawImmediate = immediate;

  useEffect(() => {
    db.on("child_removed", () => {
      canvasRef.clear();
    });

    db.child("lines").on("child_added", (snap) => {
      const line = snap.val();
      const { points, brushColor, brushRadius } = line;
      let curTime = 0;
      drawImmediate = simulating ? true : immediate;
      let timeoutGap = drawImmediate ? 0 : canvasRef.props.loadTimeOffset;

      if (drawImmediate) {
        canvasRef.drawPoints({
          points,
          brushColor,
          brushRadius,
        });
        canvasRef.points = points;
        canvasRef.saveLine({ brushColor, brushRadius });
        return;
      }
      // Use timeout to draw
      simulating = true;
      for (let i = 1; i < points.length; i++) {
        curTime += timeoutGap;
        window.setTimeout(() => {
          canvasRef.drawPoints({
            points: points.slice(0, i + 1),
            brushColor,
            brushRadius,
          });
        }, curTime);
      }

      curTime += timeoutGap;
      window.setTimeout(() => {
        // Save this line with its props
        canvasRef.points = points;
        canvasRef.saveLine({ brushColor, brushRadius });
        simulating = false;
      }, curTime);
    });
  }, []);

  return (
    <CanvasDraw
      ref={(canvasDraw) => (canvasRef = canvasDraw)}
      disabled
    ></CanvasDraw>
  );
};
