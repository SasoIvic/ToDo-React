import React from 'react'
import styles from './index.module.scss'

const Header = ({ invert, title, subtitle, children }) => {
  return (
    <div className={styles.background} data-test="headerWrapper">
      <div  className={`${styles.bubble} ${invert ? styles.invert : ''}`}>
        <div className={styles.container}>

          <div className={`${styles.left} ${invert ? styles.invert : ''}`}>
            <h1>{title}</h1>

            {/* Podnaslov je le takrat ko ni children elementov (dropdown) */}
            {!children && <span>{subtitle}</span>}
            {children}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header
