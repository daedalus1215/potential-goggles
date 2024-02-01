import React, {useState, useRef} from 'react';
import { Tag } from '@/interfaces';
import { HomeButton, BackButton, IconButton, SaveButton, TextAreaAdapter, TopBar } from '@/components';
import { useListenForSave } from '@/hooks';
import { useRef } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import styles from './EditTagPage.module.css';

const FORM_ID = "tagForm";

const EditTagePage: React.FC = () => {
    const tag = useLoaderData() as Tag;
    const [desc, setDesc] = useState(tag?.description??'');
    const ref = useRef(null);
    useListenForSave(FORM_ID);

    if (!tag) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    return (
        <div className="contactRight">
            <HomeButton />
            <h2 className={styles.h2}>{tag.name}</h2>
            <div className="contactButtons">
                <TopBar>
                    <>
                        <BackButton path='/tags' />
                        <Form method="delete" onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this Tag.")) {
                                event.preventDefault();
                            }
                        }}>
                            <input type="hidden" name="formId" value="deleteTag" />
                            <input type="hidden" name="id" value={tag._id} />
                            <IconButton
                                icon="bi bi-trash"
                                type="submit"
                                className={styles.trashButton} />
                        </Form>
                    </>
                </TopBar>
            </div>

            <Form
                id={FORM_ID}
                name={FORM_ID}
                method="put"
                className={styles.form}>
                <input type="hidden" name="id" value={tag._id} />
                <input type="hidden" name="formId" value="updateTag" />
                <input type="text" name="name" defaultValue={tag.name} />
                {/* @TODO: Clean this up!! */}
                <input type="hidden" name="description" id="description" value={desc} key={tag._id} />
                <TextAreaAdapter  value={desc} onChange={setDesc} reference={tag._id}/>
                <SaveButton className={styles.left} />
            </Form>
        </div>
    );
}

export default EditTagePage;
