import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';

import styles from './IndexPage.module.css';
import { useLoaderData } from 'react-router-dom';
import TodaysActivityList from './todaysActivityList/TodaysActivityList';
import { AggregateActivity } from '@/interfaces';
import YearActivityGrid from './yearActivityGrid/YearActivityGrid';

export default function IndexPage() {
  const { allActivities, todaysActivities } = useLoaderData() as { allActivities: any, todaysActivities: AggregateActivity };
  return (
    <>
      <p id="zero-state">
        <br />
      </p>

        <div className={styles.underline}></div>
        <div className={styles.row}>
          <UploadButton />
          <DownloadButton />
        </div>


        <TodaysActivityList aggregate={todaysActivities}/>
        <div className={styles.underline}></div>


      <YearActivityGrid allActivities={allActivities} />
      <div className={styles.underline}></div>

    </>
  )
}
