import styles from '../pollVoting/PollInfo.module.css'

const Username = ({username}) => {
    return (
        <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Username:</span>
            <span>{username}</span>
        </div>
    )
}

export default Username
