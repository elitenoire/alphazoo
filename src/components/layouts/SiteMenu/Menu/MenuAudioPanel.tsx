// import { Variants } from 'framer-motion'
import { Grid, GridItem } from '@chakra-ui/react'
// import { MotionFlex, MotionSpan } from '~components/motion'

export const MenuAudioPanel = () => {
  return (
    <Grid templateRows={{ lg: '1fr 1fr' }} templateColumns={{ lg: '1fr 1fr' }} h="inherit">
      <GridItem bg="background" colSpan={{ lg: 2 }}></GridItem>
      <GridItem bg="red.200"></GridItem>
      <GridItem bg="orange.300"></GridItem>
    </Grid>
  )
}
