import styles from './CTASection.module.css'

const CTASection = () => {
    return (
        <section className={styles.cta}>
            <h2>Ready to dive in?</h2>
            <div className={styles.buttonContainer}>
                <a href="/create" className={styles.ctaButton}>
                    Create a Poll
                </a>
                or
                <a href="/register" className={styles.ctaButton}>
                    Register
                </a>
            </div>
        </section>
    )
}

export default CTASection
