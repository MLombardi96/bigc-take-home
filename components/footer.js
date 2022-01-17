import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/mlombardi96"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by Mitchell Lombardi
      </a>
    </footer>
  );
}
