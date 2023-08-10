import styles from '../pollVoting/PollInfo.module.css'

const Email = ({email}) => {
    return (
        <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email:</span>
            <span>{email}</span>
        </div>
    )
}

export default Email
