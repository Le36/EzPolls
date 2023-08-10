import styles from './CTASection.module.css'

const CTASection = () => {
    return (
        <section className={styles.cta}>
            <h2>Ready to dive in?</h2>
            <a href="/create" className={styles.ctaButton}>
                Create a Poll
            </a>
        </section>
    )
}

export default CTASection
