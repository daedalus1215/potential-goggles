import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';

import styles from './IndexPage.module.css';

export default function IndexPage() {

  return (
    <p id="zero-state">
      <br />
      <UploadButton />
      <DownloadButton />
      <div className={styles.underline}></div>
    </p>
  )
}
