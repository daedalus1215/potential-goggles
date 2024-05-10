import React, { useMemo, useState } from 'react';
import Modal from '@/components/modal/Modal';
import TaskDropZone from './DropZone/TaskDropZone';
import { ButtonWrapper } from '@/components';
import TagDropZone from './DropZone/TagDropZone';

type props = {
    isShowing: boolean;
    setIsShowing: (isShowing: boolean) => void;
}

const UploadModal: React.FC<props> = ({ isShowing, setIsShowing }) => {
    const [radioChoice, setRadioChoice] = useState('Tag');
    const options = ['Task', 'Tag'];

    return isShowing
        ? (<Modal setIsShowing={setIsShowing} >
            <div>
                {options.map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            value={option}
                            checked={radioChoice === option}
                            onChange={() => setRadioChoice((option as any))}
                        />
                        {option}
                    </label>
                ))}
            </div>
            {radioChoice === 'Task'
                ? <TaskDropZone />
                : <TagDropZone />}
        </Modal>)
        : <></>;
};

export default UploadModal;