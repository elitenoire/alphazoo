import { useRef, useEffect } from 'react'
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Events,
  Vector,
} from 'matter-js'
import { Box } from '@chakra-ui/react'

const TH = 20

export function ActivityBoardCanvas() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cw = sceneRef.current?.clientWidth
    const ch = sceneRef.current?.clientHeight
    // create engine
    const engine = Engine.create()
    const world = engine.world
    // create renderer
    const render = Render.create({
      element: sceneRef.current ?? undefined,
      engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
        // hasBounds: true,
      },
    })
    // create runner
    const runner = Runner.create()

    const roof = Bodies.rectangle(cw / 2, -TH / 2, cw, TH, { isStatic: true })
    const wallL = Bodies.rectangle(-TH / 2, ch / 2, TH, ch, { isStatic: true })
    const floor = Bodies.rectangle(cw / 2, ch + TH / 2, cw, TH, { isStatic: true })
    const wallR = Bodies.rectangle(cw + TH / 2, ch / 2, TH, ch, { isStatic: true })

    Composite.add(world, [roof, wallL, wallR, floor])

    for (let i = 0; i < 5; i++) {
      const circle = Bodies.circle(150, 0, 10, {
        friction: 0.3,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
          fillStyle: 'yellow',
          // sprite: {
          //   texture: './img/',
          //   xScale: 1,
          //   yScale: 1,
          // },
        },
      })
      Composite.add(world, circle)
    }

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

    Composite.add(world, mouseConstraint)

    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      mouseConstraint.mouse.mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      mouseConstraint.mouse.mousewheel
    )

    // Events.on(mouseConstraint, 'startdrag', (e) => {
    //   // choose alphaball in fixed footer
    //  // setSelectedId(e.body.label)
    // })

    // keep the mouse in sync with rendering
    render.mouse = mouse

    Render.run(render)
    Runner.run(runner, engine)

    const handleResize = () => {
      const cw = sceneRef.current?.clientWidth
      const ch = sceneRef.current?.clientHeight
      // set canvas size to new values
      render.canvas.width = cw
      render.canvas.height = ch

      Body.setPosition(floor, Vector.create(cw / 2, ch + TH / 2))
      Body.setPosition(wallR, Vector.create(cw + TH / 2, ch / 2))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      Render.stop(render)
      Runner.stop(runner)
      Composite.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box h="2xs" bg="black" borderBottomRadius={[null, '5px']}>
      <div
        ref={sceneRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </Box>
  )
}
