import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import { useLoaderData } from 'react-router-dom';
import TodaysActivityList from './todaysActivityList/TodaysActivityList';
import { AggregateActivity } from '@/interfaces';
import YearMonthActivityGrid from './yearMonthActivityGrid/YearMonthActivityGrid';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import classNames from 'classnames';

import styles from './IndexPage.module.css';

export default function IndexPage() {
  const { allActivities, todaysActivities, monthActivities } = useLoaderData() as { allActivities: any, monthActivities: any, todaysActivities: AggregateActivity };
  const isSmallScreenSize = useSmallScreenSize();

  return (
    <>
      <p id="zero-state">
        <br />
      </p>

      <div className={styles.underline}></div>
      <div className={classNames(styles.row, { [styles.isSmallScreenSize]: isSmallScreenSize })}>
        <UploadButton />
        <DownloadButton />
      </div>


      <TodaysActivityList aggregate={todaysActivities} />
      <div className={styles.underline}></div>

      <YearMonthActivityGrid allActivities={monthActivities} />
      <div className={styles.underline}></div>

      <YearMonthActivityGrid allActivities={allActivities} />
      <div className={styles.underline}></div>

    </>
  )
}
