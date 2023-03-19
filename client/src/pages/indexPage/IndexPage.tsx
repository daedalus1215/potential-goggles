import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import TagButton from '../../components/tagButton/TagButton';

import styles from './IndexPage.module.css';
import { useLoaderData } from 'react-router-dom';
import ActivityList from './activityList/ActivityList';
import { AggregateActivity } from '@/interfaces';

export default function IndexPage() {
  const todaysActivities = useLoaderData() as AggregateActivity;
  return (
    <p id="zero-state">
      <br />
      <div className={styles.underline}></div>
      <div className={styles.row}>
        <UploadButton />
        <DownloadButton />
      </div>
      <ActivityList aggregate={todaysActivities} />
    </p>
  )
}
