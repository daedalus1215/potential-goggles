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

export default function IndexPage() {
  const { allActivities, todaysActivities, monthActivities, options, queryDate, queryIncludeTags, queryExcludeTags } = useLoaderData() as { options: string[], allActivities: any, monthActivities: any, todaysActivities: AggregateActivity, queryDate: any, queryIncludeTags: any, queryExcludeTags: any };
  const isSmallScreenSize = useSmallScreenSize();
  const [includeTags, setIncludeTags] = useState<string[]>(queryIncludeTags ?? '');
  const [excludeTags, setExcludeTags] = useState<string[]>(queryExcludeTags ?? '');
  const [date, setDate] = useState<string>(queryDate ?? '');
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.underline}></div>
      <div className={styles.underline}></div>
      <div className={classNames(styles.filters, { [styles.filtersSmall]: isSmallScreenSize })}>
        <fieldset>
          <label>Include Tags</label>
          <MultiSelect
            classNames={classNames({ [styles.inputSmall]: isSmallScreenSize })}
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
        <div className={styles.dateSection}>
          <fieldset>
            {!isSmallScreenSize && <label>Date</label>}
            <Date
              classNames={classNames({ [styles.isSmallScreenSize]: isSmallScreenSize })}
              date={date}
              setDate={setDate}
            />
          </fieldset>
          <LabelButton
            classNames={classNames({ 
              [styles.labelButtonSmall]: isSmallScreenSize,
              [styles.labelButton]: !isSmallScreenSize,
            })}
            value="Filter"
            onClick={() => navigate(`?includeTags=${includeTags}&excludeTags=${excludeTags}&date=${date}`)}
          />
        </div>
      </div>
      <div className={styles.underline}></div>
      <TodaysActivityList aggregate={todaysActivities} />
      {!isSmallScreenSize && <YearMonthActivityGrid allActivities={monthActivities} />}
      {!isSmallScreenSize && <YearMonthActivityGrid allActivities={allActivities} />}
    </>
  )
}
