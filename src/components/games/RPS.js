import { useContext } from 'react'
import { RoomContext } from '@/providers/RoomProvider'
import { Button, Flex, GridItem, SimpleGrid, Square, Text } from '@chakra-ui/react'

const TIE_COLOR = 'yellow.500'
const WINNING_COLOR = 'green.200'
const LOSSING_COLOR = 'red.200'

const PLAYERS_SQUARE_STYLES = {
  flexDir: 'column',
  gap: '5',
  size: 'min(40vw, 200px)',
  bgColor: 'blue.700',
  rounded: 'xl'
}

const Plays = {
  Rock: 1,
  Paper: 2,
  Sissors: 3
}

export default function () {
  const { userData, game, generalRoomData, socket } = useContext(RoomContext)

  const {
    firstPlayerSeat,
    secondPlayerSeat,
    firstPlayerPlay,
    secondPlayerPlay,
    firstPlayerVictories,
    secondPlayerVictories
  } = game
  const userIsRoomOwner = generalRoomData.ownerUser.id === userData.id
  const seatAvailable = Boolean(!firstPlayerSeat | !secondPlayerSeat)
  const userIsFirstPlayer = firstPlayerSeat?.id === userData.id
  const userIsSecondPlayer = secondPlayerSeat?.id === userData.id
  const playerIsInGame = firstPlayerSeat?.id === userData.id || secondPlayerSeat?.id === userData.id
  const userAlreadyPlay = (
    (userIsFirstPlayer && firstPlayerPlay) ||
    (userIsSecondPlayer && secondPlayerPlay)
  )
  const buttonCommonProps = {
    isDisabled: userAlreadyPlay || !playerIsInGame,
    variant: 'ghost',
    boxSize: '32',
    fontSize: '6xl',
    colorScheme: 'blue'
  }
  const firstPlayerVictoryRate = Math.round(firstPlayerVictories / (firstPlayerVictories + secondPlayerVictories) * 100)
  const onTie = firstPlayerVictoryRate === 50 || (firstPlayerVictories === 0 && secondPlayerVictories === 0)
  const firstPlayerIsWinnging = firstPlayerVictoryRate > 50
  const firstPlayerRateColor = onTie ? TIE_COLOR : firstPlayerIsWinnging ? WINNING_COLOR : LOSSING_COLOR
  const secondPlayerRateColor = onTie ? TIE_COLOR : !firstPlayerIsWinnging ? WINNING_COLOR : LOSSING_COLOR

  const joinGame = () => socket.emit('joinGame')
  const leaveGame = () => socket.emit('leaveGame')
  const resetGame = () => socket.emit('resetGame')
  const sendMove = (newMove) => socket.emit('move', newMove)

  return (
    <>
      <Flex justifyContent='center' gap='7' my='4'>
        {
          playerIsInGame
            ? <Button onClick={leaveGame} w='135px' colorScheme='red'>Leave game</Button>
            : seatAvailable && <Button onClick={joinGame} w='135px' colorScheme='green'>Join game</Button>
        }
        {userIsRoomOwner && <Button onClick={resetGame} w='135px' colorScheme='blue'>Reset game</Button>}
      </Flex>
      <Flex justifyContent='center' gap='7' wrap='wrap' my='7'>
        <Square color={firstPlayerRateColor} {...PLAYERS_SQUARE_STYLES}>
          {firstPlayerSeat && <Text>{firstPlayerSeat.nickName} {userIsFirstPlayer && '(You)'}</Text>}
          <Text fontSize='lg'><b>{firstPlayerVictories}</b> Victories</Text>
          <Text>{firstPlayerVictoryRate || 0}%</Text>
        </Square>
        <Square color={secondPlayerRateColor} {...PLAYERS_SQUARE_STYLES}>
          {secondPlayerSeat && <Text>{secondPlayerSeat.nickName} {userIsSecondPlayer && '(You)'}</Text>}
          <Text fontSize='lg'><b>{secondPlayerVictories}</b> Victories</Text>
          <Text>{100 - firstPlayerVictoryRate || 0}%</Text>
        </Square>
      </Flex>
      <SimpleGrid justifyItems='center' alignItems='center' columns={2} boxSize='300px' mx='auto'>
        <GridItem colSpan={2}>
          <Button onClick={() => sendMove(Plays.Rock)} {...buttonCommonProps}>🪨</Button>
        </GridItem>
        <Button onClick={() => sendMove(Plays.Paper)} {...buttonCommonProps}>📜</Button>
        <Button onClick={() => sendMove(Plays.Sissors)} {...buttonCommonProps}>✂️</Button>
      </SimpleGrid>
    </>
  )
}
