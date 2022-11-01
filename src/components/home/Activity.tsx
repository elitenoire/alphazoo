import { Heading, Box, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { ActivityBoard } from './ActivityBoard'

// Pure Animal Fun

export default function Activity() {
  return (
    <section>
      {/* <Text>Go on a fun adventure and experience the alphabet like never before</Text> */}

      {/* make container or give bounding padding */}
      <List fontFamily="title" spacing={16}>
        <ListItem pos="sticky" top={4}>
          <Box overflow="hidden" px={1} py={4} bg="orange.200" rounded="full">
            <Text justifyContent="center" display="flex" fontSize={['f3xl', 'f5xl', null, 'f6xl']}>
              AaBbCcDdEeFf
            </Text>
          </Box>
        </ListItem>
        <ListItem pos="sticky" top={12}>
          <Box overflow="hidden" px={1} py={4} bg="pink.200" rounded="full">
            <Text justifyContent="center" display="flex" fontSize={['f3xl', 'f5xl', null, 'f6xl']}>
              GgHhIiJjKkLlMm
            </Text>
          </Box>
        </ListItem>
        <ListItem pos="sticky" top={20}>
          <Box overflow="hidden" px={1} py={4} bg="green.200" rounded="full">
            <Text justifyContent="center" display="flex" fontSize={['f3xl', 'f5xl', null, 'f6xl']}>
              NnOoPpQqRrSsTt
            </Text>
          </Box>
        </ListItem>
        <ListItem pos="sticky" top={28}>
          <Box overflow="hidden" px={1} py={4} bg="purple.200" rounded="full">
            <Text justifyContent="center" display="flex" fontSize={['f3xl', 'f5xl', null, 'f6xl']}>
              UuVvWwXxYyZz
            </Text>
          </Box>
        </ListItem>
        <ListItem h={32} aria-hidden="true" />
      </List>
      <ActivityBoard />
    </section>
  )
}
