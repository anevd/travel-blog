import React from "react";
import styles from "./footer.module.css";

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.footer__content}`}>
				<div className={styles.footer__copyright}>© 2023 Travel Dog Blog</div>
				<div className={styles.footer__contact}>Contact with me: woof@gmail.com</div>
			</div>
		</footer>
	);
}

export default Footer;
