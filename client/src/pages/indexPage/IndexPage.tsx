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

// @TODO: 1.[x] Fetch tags 
// @TODO: 2.[x] Replace options with the tags
// @TODO: 3.[] Integrate submitting a form.
// @TODO: 4.[] styling multiselect correctly

export default function IndexPage() {
  const { allActivities, todaysActivities, monthActivities, options } = useLoaderData() as { options: string[], allActivities: any, monthActivities: any, todaysActivities: AggregateActivity };
  const isSmallScreenSize = useSmallScreenSize();
  const [includeTags, setIncludeTags] = useState<string[]>([]);
  const [excludeTags, setExcludeTags] = useState<string[]>([]);

  return (
    <>
      <div className={styles.underline}></div>
      <div className={classNames(styles.row, { [styles.isSmallScreenSize]: isSmallScreenSize })}>
        <UploadButton />
        <DownloadButton />
      </div>
      <div className={styles.underline}></div>
      <div className={styles.filters}>
        <MultiSelect
          options={options}
          selectedOptions={includeTags}
          setSelectedOptions={setIncludeTags}
        />
        <MultiSelect
          options={options}
          selectedOptions={excludeTags}
          setSelectedOptions={setExcludeTags}
        />
        <input type='date' name='date' id='date'/>
      </div>
      <TodaysActivityList aggregate={todaysActivities} />
      <YearMonthActivityGrid allActivities={monthActivities} />
      <YearMonthActivityGrid allActivities={allActivities} />
    </>
  )
}
