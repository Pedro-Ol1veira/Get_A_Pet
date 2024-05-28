import Styles from './Footer.module.css';

function Footer() {
    return(
        <footer className={Styles.footer}>
            <p>
                <span className="bold">Get A Pet &copy; 2021</span>
            </p>
        </footer>
    );
};

export default Footer;