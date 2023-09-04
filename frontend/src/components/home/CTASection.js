import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import styles from './CTASection.module.css'

const CTASection = () => {
    const {userToken} = useContext(AuthContext)

    return (
        <section className={styles.cta}>
            <h2>Ready to dive in?</h2>
            <div className={styles.buttonContainer}>
                <Link to="/create" className={styles.ctaButton}>
                    Create a Poll
                </Link>
                {!userToken && (
                    <>
                        or
                        <Link to="/register" className={styles.ctaButton}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}

export default CTASection
