import styles from "./StreamFooter.module.scss";

export default function StreamFooter() {
  return (
    <footer className={styles.footer}>
      <div className="mx-auto w-full max-w-[1184px] px-4">
        <div className={styles.footerBottom}>
          <p className="text-sm text-[#868e96]">
            © 2026 Stream by Proofer Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
