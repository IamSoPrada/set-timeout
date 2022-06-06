import styles from "./Button.module.css"
export const Button = ({onClick, currTime, disabled}) => {
	return <button disabled={disabled} type="button" className={styles.btn} onClick={onClick}>Start - {Math.trunc(currTime/1000)}</button>
}