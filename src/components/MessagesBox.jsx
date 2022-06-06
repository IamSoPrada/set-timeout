import {useEffect, useState, useRef} from 'react'
import styles from "./MessagesBox.module.css"


export const MessagesBox = ({disableBtn, showMessages, handleShowMessages, setTimer}) => {

	let msgs = ['HelloWorld-1', 'HelloWorld-2', 'HelloWorld-3', 'HelloWorld-4', 'HelloWorld-5', 'HelloWorld-6',
		'HelloWorld-7', 'HelloWorld-8', 'HelloWorld-9', 'HelloWorld-10', 'HelloWorld-11', 'HelloWorld-12', 'HelloWorld-13', 'HelloWorld-14']


	const [messagesToShow, setMessagesToShow] = useState([])
	const [messagesFromApi, setMessages] = useState([...msgs])


	const messagesRef = useRef(messagesToShow);
	const messagesFromApiRef = useRef(messagesFromApi)

	messagesRef.current = messagesToShow
	messagesFromApiRef.current = messagesFromApi

	const shiftMessage = () => {
		if(Array.isArray(messagesFromApiRef.current) && messagesFromApiRef.current.length > 0){
			return messagesFromApiRef.current.shift()
		} else {
			handleShowMessages(!showMessages)
			disableBtn(true)
			setTimer(60000)
			messagesRef.current = []
			setMessages([...msgs]) // возвращаем состояние массива сообщений к первоначальному значению.
			setTimeout(()=> disableBtn(false), 2000)
		}
	}

	useEffect(() => {
		let timer = null
		if(showMessages){
			timer = setInterval(() => {
				const currMsg = shiftMessage()
				setMessagesToShow([...messagesRef.current, currMsg])
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [showMessages]);


	return <div className={styles.messages__container}>
		<h4>Выполнение функции вывода сообщений в заданный интервал: </h4>
		<ul className={styles.messages__list}>
			{Array.isArray(messagesToShow) && messagesToShow.length > 0 && messagesToShow.map((message, idx)=> {
					return <li key={idx} className={styles.messages_item}>{message}</li>
			})}
		</ul>
	</div>
}