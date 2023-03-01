import { useContext } from 'react'
import { RoomContext } from '@/providers/RoomProvider'
import Rps from './games/RPS'

const gameComponentsByKey = {
  RPS: <Rps />
}

export default function () {
  const { game: { name: gameName } } = useContext(RoomContext)
  return gameComponentsByKey[gameName] || 'Game not found'
}
