import styles from './HeroSection.module.css'
import heroImage from '../../assets/hero.jpg'

const HeroSection = () => {
    return (
        <section
            className={styles.hero}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
            }}
        >
            <h2>Welcome to EzPolls</h2>
            <p>Create your poll in seconds</p>
        </section>
    )
}

export default HeroSection
