import React from 'react';
import cn from 'classnames';
import styles from './SaveButton.module.css';
import Button from '../button/Button';

interface props {
    name: string;
}
const SaveButton: React.FC<props> = ({name}) => <Button
    type="submit"
    className={cn(styles.submit, "glyphicon glyphicon-floppy-save")}
    onClick={() => {
        document.getElementById(name)
            ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }}
/>

export default SaveButton;