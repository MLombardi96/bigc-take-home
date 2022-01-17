import styles from "../styles/Layout.module.css";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="container">
        <main className={styles.main}>{children}</main>
      </div>
      <Footer></Footer>
    </>
  );
}
