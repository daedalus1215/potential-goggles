import React from 'react';
import IconButton from '@/components/iconButton/IconButton';
import writeJsonFile from './writeJsonFile';
import { fetchTasks } from '@/actionsAndLoaders/loaders';

const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    const tasks = await fetchTasks();
    return writeJsonFile(tasks)
  }

  return <IconButton
    category='primary2nd'
    onClick={handleDownload}
    icon="bi bi-cloud-download"
    title="Download"
  />
};

export default DownloadButton;
