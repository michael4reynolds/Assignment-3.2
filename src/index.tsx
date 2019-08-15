import * as React from "react"
import ReactDOM from "react-dom"
import { Frame, useAnimation, transform } from "framer"

import "./styles.css"

function App() {
  const phoneWidth = 300
  const screenWidth = phoneWidth - 40
  const screenHeight = (screenWidth * 2436) / 1125

  const screen1Animation = useAnimation()
  const screen2Animation = useAnimation()

  return (
    <div className="App">
      {/* Phone frame */}
      <Frame
        width={phoneWidth}
        height={(phoneWidth * 1023) / 510}
        borderRadius={30}
        center
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2F510px-IPhone_X_vector.svg.png)"
        style={{ backgroundSize: "cover" }}
      >
        {/* Screen enclosure */}
        <Frame
          background="transparent"
          width={screenWidth}
          height={screenHeight}
          left={(phoneWidth - screenWidth) / 2}
          top={20}
          overflow="hidden"
          borderRadius={25}
        >
          {/* gmap screen */}
          <Frame
            background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fgmap.jpg)"
            width={screenWidth}
            height={screenHeight}
            style={{ backgroundSize: "cover" }}
            scale={0.7}
            borderRadius={25}
            drag="y"
            x={-250}
            animate={screen2Animation}
          />
          {/* Current Screen */}
          <Frame
            background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Ftwitter-screenshot.jpg)"
            width={screenWidth}
            height={screenHeight}
            style={{ backgroundSize: "cover", transformOrigin: "bottom" }}
            borderRadius={25}
            animate={screen1Animation}
            drag="y"
            dragConstraints={{ top: -125, bottom: 125 }}
            // dragMomentum={false}
            onDrag={function handleDrag(e, info) {
              console.log(info.point.y)
              const scale = transform(info.point.y, [0, -220], [1, 0.7])
              screen1Animation.start({ scale })
              if (info.point.y <= -100) {
                screen2Animation.start({
                  x: -195,
                  transition: { duration: 0.3 }
                })
              }
            }}
            onDragEnd={function handleDragEnd(e, info) {
              if (info.point.y > -100) {
                screen1Animation.start({ scale: 1, y: 0 })
                screen2Animation.start({ x: -250 })
              } else {
                screen1Animation.start({ scale: 0.7, y: -85 })
              }
            }}
          />
        </Frame>
      </Frame>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
