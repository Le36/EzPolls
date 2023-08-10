import {FaGithub, FaArrowCircleUp} from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
    const scrollToTop = (event) => {
        event.preventDefault()
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.linkWrapper}>
                <a
                    href="https://github.com/Le36"
                    className={styles.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className={styles.icon} size={20} /> View on GitHub
                </a>
                <a href="/" className={styles.backToTop} onClick={scrollToTop}>
                    <FaArrowCircleUp className={styles.icon} size={20} /> Back to top
                </a>
            </div>
            <p>© 2023 EzPolls</p>
        </footer>
    )
}

export default Footer
