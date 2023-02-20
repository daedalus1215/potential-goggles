import { useLoaderData } from 'react-router-dom';
import { Task } from '../../interfaces';
import DownloadButton from './DownloadButton/DownloadButton';
import UploadButton from './UploadButton/UploadButton';

export default function IndexPage() {

  return (
    <p id="zero-state">
      <br />
      <UploadButton />
      <DownloadButton />
    </p>
  )
}
