import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';

import styles from './IndexPage.module.css';
import { useLoaderData } from 'react-router-dom';
import TodaysActivityList from './todaysActivityList/TodaysActivityList';
import { AggregateActivity } from '@/interfaces';
import YearActivityGrid from './yearActivityGrid/YearActivityGrid';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import classNames from 'classnames';

export default function IndexPage() {
  const { allActivities, todaysActivities } = useLoaderData() as { allActivities: any, todaysActivities: AggregateActivity };
  const isSmallScreenSize = useSmallScreenSize();

  return (
    <>
      <p id="zero-state">
        <br />
      </p>

      <div className={styles.underline}></div>
      <div className={classNames(styles.row, {[styles.isSmallScreenSize]: isSmallScreenSize})}>
        <UploadButton />
        <DownloadButton />
      </div>


      <TodaysActivityList aggregate={todaysActivities} />
      <div className={styles.underline}></div>


      <YearActivityGrid allActivities={allActivities} />
      <div className={styles.underline}></div>

    </>
  )
}
