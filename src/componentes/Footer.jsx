import styles from "./Footer.module.css";

const Footer =()=>{
    return(
        <footer className={styles.footer}>
            
            <p className={styles.p}>Desarrollado por JPPOTHOVEN - 2025</p>
            <a className={styles.a} href="mailto:jppothoven@hotmail.com">jppothoven@hotmail.com</a>
            
        </footer>
    )
}

export default Footer