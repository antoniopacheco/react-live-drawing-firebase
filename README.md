# Canvas Drawing to firebase

Based on https://github.com/embiem/react-canvas-draw

## Installation

```jsx
npm install --save react-live-drawing-firebase
```

## Usage

Person drawing:

```jsx
import { ReactLiveDrawing } from "react-live-drawing-firebase";

<ReactLiveDrawing
  ref={(canvasDraw) => (drawingRef = canvasDraw)}
  db={fire.database().ref("draw-room")}
  {...props}
/>;
```

Person viewing

### Live view

```jsx
import {LiveViewer} from 'react-live-drawing-firebase'
<LiveViewer db={fireBase.ref('draws') {...props}} />
```

### Recorder view

```jsx
import { RecorderViewer } from "react-live-drawing-firebase";
<RecorderViewer db={firebase.href("draw")} {...props} />;
```

## props

- db firebase ref
- all other react-canvas-draw props
  https://github.com/embiem/react-canvas-draw#props

## Functions

functions are only available on ReactLiveDrawing

### clear

This function will clear the canvas, delete lines from firebase and will cause an update on the viewer

```jsx
canvasDraw.clear();
```
