import HeroSection from './HeroSection'
import FeatureCard from './FeatureCard'
import CTASection from './CTASection'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <HeroSection />
            <div className={styles.features}>
                <FeatureCard
                    imgSrc="https://cdn.strawpoll.com/images/stock/index-splash.jpg"
                    title="Feature 1"
                    description="feature 1."
                />
                <FeatureCard
                    imgSrc="https://cdn.strawpoll.com/images/stock/index-splash.jpg"
                    title="Feature 2"
                    description="feature 2."
                />
                <FeatureCard
                    imgSrc="https://cdn.strawpoll.com/images/stock/index-splash.jpg"
                    title="Feature 3"
                    description="feature 3."
                />
            </div>
            <CTASection />
        </div>
    )
}

export default Home
