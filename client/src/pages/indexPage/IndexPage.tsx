import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';
import { useLoaderData, useNavigate } from 'react-router-dom';
import TodaysActivityList from './todaysActivityList/TodaysActivityList';
import { AggregateActivity, Tag } from '@/interfaces';
import YearMonthActivityGrid from './yearMonthActivityGrid/YearMonthActivityGrid';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import classNames from 'classnames';

import styles from './IndexPage.module.css';
import MultiSelect from '@/components/multiselect/Multiselect';
import { useState } from 'react';
import { Date } from '@/components/date/Date';
import { LabelButton } from '@/components/labelButton/LabelButton';

// @TODO: 1.[x] Fetch tags 
// @TODO: 2.[x] Replace options with the tags
// @TODO: 3.[] Integrate submitting a form.
// @TODO: 4.[] styling multiselect correctly

export default function IndexPage() {
  const { allActivities, todaysActivities, monthActivities, options, queryDate, queryIncludeTags, queryExcludeTags } = useLoaderData() as { options: string[], allActivities: any, monthActivities: any, todaysActivities: AggregateActivity, queryDate: any, queryIncludeTags: any, queryExcludeTags: any };
  const isSmallScreenSize = useSmallScreenSize();
  const [includeTags, setIncludeTags] = useState<string[]>(queryIncludeTags ?? '');
  const [excludeTags, setExcludeTags] = useState<string[]>(queryExcludeTags ?? '');
  const [date, setDate] = useState<string>(queryDate ?? '');
  const navigate = useNavigate();

  // console.log('excludeTags',queryExcludeTags[0] )
  return (
    <>
      <div className={styles.underline}></div>
      <div className={classNames(styles.row, { [styles.isSmallScreenSize]: isSmallScreenSize })}>
        <UploadButton />
        <DownloadButton />
      </div>
      <div className={styles.underline}></div>
      <div className={classNames(styles.filters, { [styles.filtersSmall]: isSmallScreenSize })}>
        <fieldset>
          <label>Include Tags</label>
          <MultiSelect
            classNames={classNames({ [styles.isSmallScreenSize]: isSmallScreenSize })}
            options={options}
            selectedOptions={includeTags}
            setSelectedOptions={setIncludeTags}
          />
        </fieldset>
        <fieldset>
          <label>Exclude Tags</label>
          <MultiSelect
            classNames={classNames({ [styles.inputSmall]: isSmallScreenSize })}
            options={options}
            selectedOptions={excludeTags}
            setSelectedOptions={setExcludeTags}
          />
        </fieldset>
        <fieldset>
          <label>Date</label>
          <Date
            classNames={classNames({ [styles.isSmallScreenSize]: isSmallScreenSize })}
            date={date}
            setDate={setDate}
          />
        </fieldset>
      </div>
      <LabelButton value="Filter" onClick={() => navigate(`?includeTags=${includeTags}&excludeTags=${excludeTags}&date=${date}`)} />
      <div className={styles.underline}></div>
      <TodaysActivityList aggregate={todaysActivities} />
      <YearMonthActivityGrid allActivities={monthActivities} />
      <YearMonthActivityGrid allActivities={allActivities} />
    </>
  )
}
