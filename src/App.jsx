import {useState, useEffect, useRef} from 'react'
import styles from './App.module.css'
import {Button} from "./components/Button";
import {MessagesBox} from "./components/MessagesBox"

export const App = () => {

	const [isStarted, setIsStarted] = useState(false)
	const [isBtnDisabled, setBtnDisabled] = useState(false)
	let [time, setTimer] = useState(60000)

	const timerRef = useRef(time)
	timerRef.current = time

	const handleStartTimer = ()=> {
		setIsStarted(!isStarted)
	}

	useEffect(()=> {
		let timerId
		if(isStarted) {
			timerId = setInterval(() => {
				time > 0 && setTimer(time -= 1000);
			}, 1000);
		}
		return ()=> clearInterval(timerId)
	}, [isStarted, time])

	return (
		<div className={styles.container}>
			<MessagesBox showMessages={isStarted} handleShowMessages={setIsStarted} disableBtn={setBtnDisabled} setTimer={setTimer}/>
			<Button onClick={handleStartTimer} currTime={time} disabled={isBtnDisabled}/>
		</div>
	)
}