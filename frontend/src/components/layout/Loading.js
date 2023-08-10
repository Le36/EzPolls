import React from 'react'
import {FaCircleNotch} from 'react-icons/fa'
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <FaCircleNotch className={styles.loadingIcon} />
        </div>
    )
}

export default Loading
