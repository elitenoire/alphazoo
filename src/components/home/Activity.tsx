import { Heading, Box, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { AlphabetBubble } from './AlphabetBubble'
import { ActivityBoard } from './ActivityBoard'

// Pure Animal Fun

export default function Activity() {
  return (
    <Box as="section">
      {/* <Text>Go on a fun adventure and experience the alphabet like never before</Text> */}

      {/* make container or give bounding padding */}
      <List mb={8} fontFamily="title" spacing={16}>
        <ListItem pos="sticky" zIndex={1} top={4} overflow="hidden">
          <AlphabetBubble bg="orange.200">AaBbCcDdEeFf</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={2} top={12} overflow="hidden">
          <AlphabetBubble bg="pink.200">GgHhIiJjKkLlMm</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={3} top={20} overflow="hidden">
          <AlphabetBubble bg="green.200">NnOoPpQqRrSsTt</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={4} top={28} overflow="hidden">
          <AlphabetBubble bg="purple.200">UuVvWwXxYyZz</AlphabetBubble>
        </ListItem>
        <ListItem h={32} aria-hidden="true" />
      </List>
      <ActivityBoard />
    </Box>
  )
}
