import * as React from 'react';
import { Button, SaveButton, TextAreaAdapter, TopBar } from '@/components';
import HomeButton from '@/components/homeButton/HomeButton';
import { Tag } from '@/interfaces';
import { useRef } from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';

import styles from './EditTagPage.module.css';
import classNames from 'classnames';

function EditTagePage() {
    const tag = useLoaderData() as Tag;
    const descRef = useRef(null);
    const navigate = useNavigate();

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
                        <Form method="delete" onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this task.")) {
                                event.preventDefault();
                            }
                        }}>
                            <input type="hidden" name="formId" value="deleteTag" />
                            <input type="hidden" name="id" value={tag._id} />
                            <Button type="submit" className={styles.trashButton}><i className={classNames("bi bi-trash", styles.trash)} ></i></Button>
                        </Form>
                    </>
                </TopBar>
            </div>

            <Form
                method="post"
                action={`/task/${tag._id}`}
                className={styles.form}>
                <input type="hidden" name="id" value={tag._id} />
                <input type="hidden" name="formId" value="updateTag" />
                
                <TextAreaAdapter reference={descRef} value={tag.description} />
                <SaveButton className={styles.left} />
            </Form>
        </div>
    );
}

export default EditTagePage;
