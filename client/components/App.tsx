import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Granim from 'granim'
import TodoApp from './TodoApp'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    if (canvasRef.current === null) return

    const granimInstance = new Granim({
      element: canvasRef.current,
      direction: 'diagonal',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
              ['#58bcc4', '#2094DA', '#254688'],
              ['#1DBBED', '#265EB6', '#273172'],
             ['#C979EB', '#6B56E9', '#3B2B7E'],
          ],
          transitionSpeed: 10000,
        },
      },
    })

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      duration: 5,
      onUpdate: () => {
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
