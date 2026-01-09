import { useState, useRef, useMemo, useEffect, useCallback } from 'react'

const RunningClock = () => {
  const minRef = useRef<HTMLInputElement>(null)
  const secRef = useRef<HTMLInputElement>(null)

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [count, setCount] = useState<number>(0)
  const [play, setPlay] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)

  const displayTime = useMemo(() => {
    const min = Math.floor(count / 60)
    const sec = count % 60

    return `${min.toString().length <= 1 ? '0' : ''}${min}:${sec.toString().length <= 1 ? '0' : ''}${sec}`
  }, [count])
  
  const countDownHandler = useCallback(() => {    
    if (timer.current) clearTimeout(timer.current)
    const timerHandler = () => {
      setCount(c => {
        if (c <= 0) {
          timer.current && clearTimeout(timer.current)
          setPlay(false)
          return c
        }
        return  c - 1
      })
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(timerHandler, 1000)
    } 
    timer.current = setTimeout(timerHandler, 1000)
  }, [])

  const startHandler = () => {
    const inputMinValue = Number(minRef.current?.value)
    const inputSecValue = Number(secRef.current?.value)
    const min = isNaN(inputMinValue) ? 0 : inputMinValue
    const sec = isNaN(inputSecValue) ? 0 : inputSecValue
    setCount(min * 60 + sec)

    setPlay(true)
    setPaused(false)
  }

  const resetHandler = () => {
    setCount(0)
    if (minRef.current) {
      minRef.current.value = '0'
    }
    if (secRef.current) {
      secRef.current.value = '0'
    }
    setPlay(false)
  }

  useEffect(() => {
    if (!play || paused) return
    countDownHandler()
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [countDownHandler, play, paused])

  return (
    <div>
      <div>
        <label>
          <input ref={minRef} type="number"></input> 
            Minutes 
        </label> 
        <label>
            <input ref={secRef} type="number"></input>
            Seconds 
        </label> 
      </div>
      <button onClick={startHandler}>START</button> 
      <button onClick={setPaused.bind(null, !paused)}>{paused ? 'RESUME' : 'PAUSE' }</button> 
      <button onClick={resetHandler}>RESET</button> 
      <h1 data-testid="running-clock">{displayTime}</h1>
    </div>

  )
}

export default RunningClock
