import React from 'react'
import {FaCircleNotch} from 'react-icons/fa'
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <FaCircleNotch className={styles.loadingIcon} />
            <div className={styles.errorMessage1}>Sorry, something is wrong...</div>
            <div className={styles.errorMessage2}>Did the hamster fall off the wheel?</div>
            <div className={styles.errorMessage3}>Maybe try summoning a wizard?</div>
            <div className={styles.errorMessage4}>Hold on, just restarting the universe.</div>
            <div className={styles.errorMessage5}>Tried turning it off and on again?</div>
            <div className={styles.errorMessage6}>Why are you still here? Grab a snack!</div>
            <div className={styles.errorMessage7}>Just kidding... Please refresh or try later!</div>
            <div className={styles.errorMessage8}>Please help me... I'm trapped in here!</div>
        </div>
    )
}

export default Loading
