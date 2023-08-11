import HeroSection from './HeroSection'
import FeatureCard from './FeatureCard'
import CTASection from './CTASection'
import styles from './Home.module.css'
import registerImage from '../../assets/register.jpg'
import liveResultsImage from '../../assets/liveResults.jpg'
import easyImage from '../../assets/easyPolling.jpg'

const Home = () => {
    return (
        <div className={styles.container}>
            <HeroSection />
            <div className={styles.features}>
                <FeatureCard
                    imgSrc={liveResultsImage}
                    title="Live Updates"
                    description="Experience real-time results as votes come in. Our system updates instantly, providing you with the freshest data at your fingertips. No need to refresh, see live changes as they happen!"
                />
                <FeatureCard
                    imgSrc={easyImage}
                    title="Easy Polling"
                    description="Creating a poll has never been this effortless. With just a few clicks, you can set up your poll, share it, and start collecting responses. No fuss, no hassle, just simple and swift polling."
                />
                <FeatureCard
                    imgSrc={registerImage}
                    title="Register"
                    description="Say goodbye to annoying reCAPTCHAs! With our easy registration process, you not only secure your polls but also gain the ability to manage and delete them anytime. Control at your convenience."
                />
            </div>
            <CTASection />
        </div>
    )
}

export default Home
