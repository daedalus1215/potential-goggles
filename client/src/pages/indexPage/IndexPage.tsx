import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import TagButton from '../../components/tagButton/TagButton';

import styles from './IndexPage.module.css';

export default function IndexPage() {

  return (
    <p id="zero-state">
      <br />
      <TagButton />
      <div className={styles.underline}></div>
      <UploadButton />
      <DownloadButton />
    </p>
  )
}
