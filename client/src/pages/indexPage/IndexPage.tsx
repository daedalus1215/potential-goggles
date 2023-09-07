import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import { useLoaderData } from 'react-router-dom';
import TodaysActivityList from './todaysActivityList/TodaysActivityList';
import { AggregateActivity, Tag } from '@/interfaces';
import YearMonthActivityGrid from './yearMonthActivityGrid/YearMonthActivityGrid';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import classNames from 'classnames';

import styles from './IndexPage.module.css';
import MultiSelect from '@/components/multiselect/Multiselect';
import { useState } from 'react';

// @TODO: 1. Fetch tags
// @TODO: 2 Replace options with the tags
// @TODO: 3. Integrate submitting a form.
// @TODO: 4. styling multiselect correctly

export default function IndexPage() {
  const { allActivities, todaysActivities, monthActivities, options } = useLoaderData() as { options: string[], allActivities: any, monthActivities: any, todaysActivities: AggregateActivity };
  const isSmallScreenSize = useSmallScreenSize();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <>
      <div className={styles.underline}></div>
      <div className={classNames(styles.row, { [styles.isSmallScreenSize]: isSmallScreenSize })}>
        <UploadButton />
        <DownloadButton />
      </div>
      <div className={styles.underline}></div>
      <MultiSelect
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
        />
      <TodaysActivityList aggregate={todaysActivities} />
      <YearMonthActivityGrid allActivities={monthActivities} />
      <YearMonthActivityGrid allActivities={allActivities} />
    </>
  )
}
