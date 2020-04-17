# Canvas Drawing to firebase

Based on https://github.com/embiem/react-canvas-draw

## Installation

```jsx
npm install --save react-live-drawing-firebase
```

## Usage

Person drawing:

```jsx
import {ReactLiveDrawing} from 'react-live-drawing-firebase'
<ReactLiveDrawing db={fireBase.ref('draws') {...props}}>
```

Person viewing:

```jsx
import {LiveViewer} from 'react-live-drawing-firebase'
<LiveViewer db={fireBase.ref('draws') {...props}}>
```

## props

- db firebase ref
- all other react-canvas-draw props
  https://github.com/embiem/react-canvas-draw#props
