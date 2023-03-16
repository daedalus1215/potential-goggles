import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import TagButton from '../../components/tagButton/TagButton';

import styles from './IndexPage.module.css';
import { useLoaderData } from 'react-router-dom';
import ActivityList from './ActivityList';
import { TodaysActivity } from '@/interfaces';

export default function IndexPage() {
  const todaysActivities = useLoaderData() as TodaysActivity[];
  return (
    <p id="zero-state">
      <br />
      <TagButton />
      <div className={styles.underline}></div>
      <UploadButton />
      <DownloadButton />
      <ActivityList activities={todaysActivities}/>
    </p>
  )
}
