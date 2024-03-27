import React, { useState, useRef } from 'react';
import { Tag } from '@/interfaces';
import { HomeButton, BackButton, IconButton, SaveButton, TextAreaAdapter, TopBar } from '@/components';
import { useListenForSave } from '@/hooks';
import { useRef } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import styles from './EditTagPage.module.css';

const FORM_ID = "tagForm";

const EditTagePage: React.FC = () => {
    const tag = useLoaderData() as Tag;
    useListenForSave(FORM_ID);
    const reference = useRef(tag._id);

    if (!tag) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    return (
        <div >
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
                <TextAreaAdapter value={tag?.description ?? ''} reference={reference}/>
                <SaveButton className={styles.left} />
            </Form>
        </div>
    );
}

export default EditTagePage;
