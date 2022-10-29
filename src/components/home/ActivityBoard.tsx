import { Heading, Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { ActivityBoardCanvas } from './ActivityBoardCanvas'

export function ActivityBoard() {
  return (
    <Flex
      direction={['column', null, null, 'row']}
      columnGap={4}
      px={4}
      py={[12, 24]}
      bg="secondary.200"
      borderRadius={['2em', '4em']}
    >
      <Box w={[null, null, null, '30%']}>
        <Flex
          pos={[null, null, null, 'sticky']}
          top={[null, null, null, 4]}
          align={[null, 'center']}
          justify="space-between"
          wrap={[null, null, null, 'wrap']}
          direction={['column', null, 'row']}
          rowGap={[2, null, null, 8]}
        >
          <Text as="h3" maxW={[null, null, 44]} fontSize="f2xl" fontWeight={700}>
            Animal
            <Box
              as="span"
              display="inline-flex"
              mr={[1, null, null, 0]}
              ml={1}
              px="7px"
              py="5px"
              fontSize="xs"
              borderWidth="1px"
              borderColor="currentColor"
              rounded="full"
            >
              <Box as="span" p={1} bg="white" rounded="inherit">
                🦁
              </Box>
              <Box as="span" ml="-2" p={1} bg="white" rounded="inherit">
                🐲
              </Box>
            </Box>
            Alphabets
          </Text>
          <Text
            maxW={[null, null, '3xs']}
            fontSize={[null, 'xl']}
            textAlign={[null, null, 'right', 'left']}
          >
            Discover animals that begin with the selected letter
          </Text>
        </Flex>
      </Box>
      <SimpleGrid flex={[null, null, null, 1]} py={12} columns={[1, 2]} spacing={4}>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="orange.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">A-F</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦊
            </Box>
          </Flex>
          <ActivityBoardCanvas />
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="pink.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">G-M</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🐵
            </Box>
          </Flex>
          <ActivityBoardCanvas />
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="green.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">N-T</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦚
            </Box>
          </Flex>
          <ActivityBoardCanvas />
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="purple.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">U-Z</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦓
            </Box>
          </Flex>
          <ActivityBoardCanvas />
        </Box>
      </SimpleGrid>
    </Flex>
  )
}
