import React from 'react';
import cn from 'classnames';
import { Button } from '../../../components';
import { fetchTasks } from '../../../actions/actions';
import writeJsonFile from './writeJsonFile';

import styles from './DownloadButton.module.css';
import classNames from 'classnames';

const DownloadButton: React.FC = (...tasks) => {
  const handleDownload = async () => {
    const tasks = await fetchTasks();
    console.log(tasks);

    console.log('assembledTasked', tasks)
    return writeJsonFile(tasks)
  }

  return (
    <>
      {tasks?.length && (
        <Button
          data-testid="btn-download"
          title="Download Tasks"
          type="a"
          className={cn(styles.buttonDownload, 'glyphicon glyphicon-download-alt')}
          onClick={handleDownload}>
          <div className={styles.wrap}>
            <i className={classNames("bi bi-cloud-download", styles.icon)}></i>
            <span className={styles.title}>Download</span>
          </div>
        </Button>
      )}
    </>
  );
};

export default DownloadButton;
