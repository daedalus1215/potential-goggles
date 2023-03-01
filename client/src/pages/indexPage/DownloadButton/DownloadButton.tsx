import React from 'react';
import { fetchTasks } from '@/actions/actions';
import IconButton from '@/components/iconButton/IconButton';
import writeJsonFile from './writeJsonFile';

const DownloadButton: React.FC = (...tasks) => {
  const handleDownload = async () => {
    const tasks = await fetchTasks();
    return writeJsonFile(tasks)
  }

  return (
    <>
      {tasks?.length && (
        <IconButton 
          onClick={handleDownload}
          icon="bi bi-cloud-download"
          title="Download"
        />        
      )}
    </>
  );
};

export default DownloadButton;
