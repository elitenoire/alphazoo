import { motion } from 'framer-motion'

const doodle = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(239, 233, 169, 0)',
  },
  visible: (i: number) => {
    const delay = i * 0.25
    return {
      opacity: 1,
      pathLength: 1,
      //   fill: 'rgba(239, 233, 169, 1)',
      fill: '#000000',
      transition: {
        pathLength: { delay, type: 'spring', duration: 1 },
        opacity: { delay, duration: 0.01 },
        // fill: { delay, duration: 0.8 },
      },
    }
  },
}

export function MotionGirlDoodle({ play }: { play: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 244.75 262.75"
      initial="hidden"
      animate={play ? 'visible' : 'hidden'}
    >
      {/* left eye */}
      <motion.path
        variants={doodle}
        custom={1}
        d="M124.51,69.82a6.7,6.7,0,0,0-2.09,2.86,11.75,11.75,0,0,0-1.81,2.92C115.26,88.29,131.6,99,141.09,89,150.83,78.68,135.87,60.8,124.51,69.82ZM127,75.9a4.51,4.51,0,0,1,.17-1.4,11.65,11.65,0,0,1,2.15-1.43,5.45,5.45,0,0,1,1.7-.53,12.26,12.26,0,0,1,4.22,1.57l0,0h0a2.76,2.76,0,0,0-1.32,2C133.32,80.55,127.13,80.54,127,75.9Z"
        fill="#000000"
      />
      {/* right eye */}
      <motion.path
        variants={doodle}
        custom={1}
        d="M150.6,94.19a6.76,6.76,0,0,0-2.1,2.87,12,12,0,0,0-1.81,2.91c-5.34,12.7,11,23.42,20.49,13.38C176.91,103.05,162,85.18,150.6,94.19Zm2.49,6.09a5,5,0,0,1,.17-1.41,11.94,11.94,0,0,1,2.15-1.42,5.54,5.54,0,0,1,1.7-.53,11.9,11.9,0,0,1,4.22,1.56s0,0,0,0v0a2.73,2.73,0,0,0-1.31,2C159.4,104.93,153.22,104.92,153.09,100.28Z"
        fill="#000000"
      />
      {/* mouth */}
      <motion.path
        variants={doodle}
        custom={1.5}
        d="M113.8,111.72c.69-2.94,3.52-5.17,5.39-7.39,1.59-1.9-1.14-4.83-3.19-3.58-9.38,5.69-11.41,17.35-2.49,24.53,3.87,3.12,10.38,3.5,14.79,1.47,3.94-1.82,9.64-5.92,8.44-10.86a2.52,2.52,0,0,0-3.56-1.72c-2.41,1.11-3.18,3.4-5.06,5.18-2.61,2.46-6.29,2.71-9.54,1.68C114.75,119.82,112.94,115.4,113.8,111.72Z"
        fill="#efe9a9"
      />
      {/* body */}
      <motion.path
        variants={doodle}
        custom={2.25}
        d="M118.71,29.5c-2.32-.37-2.88,3.18-.79,3.92A125.73,125.73,0,0,1,158,56c-6.36,4.71-6.59,17.32-1.84,22.93a.93.93,0,0,0,1.59-.8A47.71,47.71,0,0,1,157,67.62c.29-3.62,2.19-6.39,3.37-9.58,1.23,1.1,2.42,2.25,3.6,3.41-3.19,6.32-2.9,17.14.68,22.84.42.67,1.62.59,1.63-.34.08-4.14-1-8.22-1.06-12.37,0-2.79.41-5.55.54-8.31q3.31,3.43,6.33,7.19c-.88,3.68-1.51,7-.63,11.18,1.43,6.87,6,14.31,10.79,19.36a1.14,1.14,0,0,0,2-1c-1.78-6.87-6.7-12.42-9-19.15a16.31,16.31,0,0,1-.6-7.09A98.58,98.58,0,0,1,182,85.39c7.53,13.83,11.23,30.26,6,45.46-6.56,19-29.25,24.41-46.85,22.19-17-2.14-32.27-13-44.87-23.89-14-12.1-25.76-28.37-24.69-47.62.92-16.47,14.22-30.67,29.52-35.13,17.11-5,33.2,4.44,44.44,16.46,1.77,1.89,5-.23,3.78-2.59-8.7-16.81-26.13-23.39-42.92-21.5,1.69-5.69-2.25-13.15-4.42-18.25-3.3-7.74-9-16.09-16.36-20.32-1.28-.72-3.24.6-2.32,2.07,4.42,7.09,9.8,13.26,13.48,20.89a31.58,31.58,0,0,1,2,6.12C94.38,25,89,21.32,84.33,18c-7.86-5.52-17-10.47-26.49-12.2-1.2-.22-1.62,1.53-.72,2.13,7.82,5.25,16.39,9.31,24.26,14.53a96,96,0,0,1,13,10.91c-4.87-1.8-10.56-2.51-14.56-3-9.61-1.14-20,.43-27.75,6.37C51,37.6,52,39.13,53.16,39c8.86-1.33,17.23-3.33,26.27-2.75C85,36.56,90.65,39.6,96.16,41,84.39,44.93,74,53.13,68.62,65c-9.27,20.49-3,40.36,9.78,56.78-3.81.81-7.5,2.42-11.29,3.56a178.59,178.59,0,0,1-19.9,4.57c-14.58,2.64-29.4.78-43.87,3a1.77,1.77,0,0,0-.21,3.39c13,4.22,28.61,1.9,41.91,0A164.75,164.75,0,0,0,68.25,131a85.33,85.33,0,0,0,9.28-3.06C67.67,137.2,58,146.06,46.12,153.25a138.72,138.72,0,0,1-21.93,10.48c-7.51,2.91-15.78,3.88-23,7.24a2.16,2.16,0,0,0,.76,4c1.85,2.77,5,3.2,8.25,5.08,6.24,3.55,11.39,8.66,16.12,14,2.45,2.77,4.72,5.7,6.89,8.69-3.17,1.77-5.48,6.24-7.52,8.85C21.44,217,17,222.22,14.72,228.73a1.66,1.66,0,0,0,2.66,1.76c4.87-4,8.09-9.28,11.84-14.34,1.81-2.44,5.38-5.69,7-9,4.36,6.41,8.43,13,12.9,19.35A96.36,96.36,0,0,0,58,237.18c-2.69,2.25-4.95,5.66-6.79,7.94-3.48,4.35-8.41,10.57-8.4,16.41a1.42,1.42,0,0,0,.64,1.22h1.48c.06,0,.12-.06.17-.1,4.08-3.24,6.49-9.13,9.49-13.37a99.52,99.52,0,0,1,6.75-8.17l.28-.32C73,251.5,88.1,260.18,101.93,254.13c2.07-.91,1.13-3.8-.83-4.06-.88-.11-1.75-.2-2.61-.28,11.71-7.27,17.73-27.49,20.62-39.32,4.23-17.38,5-37.22,2.78-55.18l.44.19c.23,6.38,3.49,13.15,5.44,19q4.2,12.65,9.35,25a207.87,207.87,0,0,0,11.44,23c3.72,6.51,8,14.47,14.25,18.71,1.61,1.09,3.22-.73,2.6-2.32-2.65-6.84-8.1-12.6-11.89-18.91a198.67,198.67,0,0,1-11.48-23c-3.45-7.92-6.42-16.05-9.28-24.2-1.59-4.51-2.84-10.21-5-15,16.75,6.2,37.75,5.8,52.46-5,15.85-11.63,20.66-28.94,17.51-47.86A70.44,70.44,0,0,0,196.14,98c1.5.5,3.06.86,4.68,1.38a52.58,52.58,0,0,1,13.61,7c8.4,5.77,12.45,14.11,18.67,21.73,1.1,1.35,2.87.06,2.74-1.38-.89-9.8-9-18.13-16.24-24A52.22,52.22,0,0,0,204,94a72.54,72.54,0,0,1,13.82-1c8.79.52,16.7,4.28,25.31,5.31a1.56,1.56,0,0,0,1.26-2.58c-9.34-9-31.66-12.58-46-7.75,5.44-3.3,10.72-6.64,17.05-8.79,8.24-2.8,17-2.17,25.18-4.57a1.1,1.1,0,0,0,.13-2.11C226.89,66.09,203,74.17,191.8,85.7,178.79,56.79,149.08,34.24,118.71,29.5Zm-4.83,179.2a91.64,91.64,0,0,1-8.4,22.54c-3.38,6.44-9.22,11.51-12,18.14a44,44,0,0,1-10.34-1.79c-6.58-2.11-12.48-6.39-17.59-10.92-9.94-8.82-16.81-20.86-24.14-31.76C35.84,196.65,29.76,188.4,22.05,182c-2.44-2-6.35-5.48-10.42-7.72,13-2.38,26.74-9.83,37.11-15.88,13-7.6,26.14-17.87,35-30.39a123.37,123.37,0,0,0,33.92,25.24C116.23,171.88,118,190.21,113.88,208.7Z"
        stroke="#efe9a9"
        strokeWidth="2"
      />
    </motion.svg>
  )
}
