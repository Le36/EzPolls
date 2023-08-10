import styles from './FeatureCard.module.css'

const FeatureCard = ({imgSrc, title, description}) => {
    return (
        <div className={styles.featureCard}>
            <img src={imgSrc} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default FeatureCard
