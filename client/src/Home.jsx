import { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { Cursor } from './components/Cursor'

const renderCursors = (users) => {
  return Object.keys(users).map(uuid => {
    const user = users[uuid]

    return (
      <Cursor key={uuid} point={[user.state.x, user.state.y]}/>
    )
  })
}
 
const renderUserList = (users) => {
  return Object.keys(users).map(uuid => {

    return (
      <li key={uuid}>{JSON.stringify(users[uuid])}</li>
    )
  })
}

// eslint-disable-next-line react/prop-types
export function Home({ username }) {
  const WS_URL = 'ws://localhost:8080'
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username }
  })
  const THROTTLE = 50
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0
    })
    window.addEventListener('mousemove', (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY
      })
    })
  }, [])

  if(lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)}
        {renderUserList(lastJsonMessage)}
      </>
    )
  }

  return (
    <div></div>
  )
}
