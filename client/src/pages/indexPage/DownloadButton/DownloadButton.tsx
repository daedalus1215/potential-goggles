import React from 'react';
import IconButton from '@/components/iconButton/IconButton';
import writeJsonFile from './writeJsonFile';
import { fetchTasks } from '@/actionsAndLoaders/loaders';

const DownloadButton: React.FC = () => <IconButton
  category='primary2nd'
  onClick={async () => {
    const tasks = await fetchTasks();
    return writeJsonFile(tasks)
  }}
  icon="bi bi-cloud-download"
  title="Download"
/>;

export default DownloadButton;
