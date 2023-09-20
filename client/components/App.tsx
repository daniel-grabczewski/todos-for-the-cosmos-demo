import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Granim from 'granim'
import TodoApp from './TodoApp'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Remove any default margin and padding from the body
    document.body.style.margin = '0'
    document.body.style.padding = '0'

    // Set the canvas to cover the full viewport
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    if (canvasRef.current === null) return

    const granimInstance = new Granim({
      element: canvasRef.current,
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#833ab4', '#fd1d1d'],
            ['#003973', '#e5e5be'],
            ['#1f4037', '#99f2c8'],
          ],
          transitionSpeed: 5000,
        },
      },
    })

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      duration: 5,
      onUpdate: () => {
        // You can change the Granim state or gradients here
      },
    })

    return () => {
      tl.kill()
      granimInstance.destroy()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: '0', left: '0', zIndex: -1 }} 
      />
      <TodoApp />
    </>
  )
}

export default App
