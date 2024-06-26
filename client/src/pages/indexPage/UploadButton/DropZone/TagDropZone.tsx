import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import fetchApiData from "@/utils/fetchApiData";
import { api } from '@/config.json';

import styles from './DropZone.module.css'

const TagDropZone: React.FC = () => {
    // const { setSuccessFlashMessage } = useFlashMessageContext();
    const onDrop = useCallback((acceptedFiles: any) => {
        const reader = new FileReader() as any;

        //@TODO: Could error message in these cases
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            const binaryStr = JSON.parse(reader.result);
            fetchApiData(`${api}import-tags`, { body: binaryStr, method: 'POST' });
        }
        reader.readAsBinaryString(acceptedFiles[0]);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    const { getRootProps, isDragActive } = useDropzone({ onDrop });
    const getRooterProps = getRootProps;
    console.log(getRootProps)

    return <div {...getRooterProps()} className={styles.innerModalContent}>
        <input {...getRooterProps()} className={styles.innerContainer} />
        {
            isDragActive
                ? <p className={styles.dropText}>Drop the files here...</p>
                : <p className={styles.dropText}>Drag 'n' drop files here, or click to select file</p>
        }
    </div>
};

export default TagDropZone;