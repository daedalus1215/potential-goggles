import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';

import styles from './IndexPage.module.css';
import TagButton from '../../components/tagButton/TagButton';
import { Form } from 'react-router-dom';

export default function IndexPage() {

  return (
    <p id="zero-state">
      <br />
      <TagButton />
      <Form method="post" className={styles.newForm}>
        <input type="hidden" name="formId" value="newTask" />
        <button type="submit" className="button">
          New
        </button>
      </Form>
      <div className={styles.underline}></div>
      <UploadButton />
      <DownloadButton />
    </p>
  )
}
