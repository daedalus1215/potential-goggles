import React, { Suspense, useRef, useState } from "react";
import ms from 'pretty-ms';
import cn from "classnames";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { TextAreaAdapter, IconButton, TopBar, SaveButton } from "@/components";
import Button, { Category } from "@/components/button/Button";
import { useListenForSave, useSmallScreenSize } from '@/hooks';
import { api } from '@/config.json';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from './TaskPage.module.css';

const FORM_ID = "taskForm";
// define your extension array
const extensions = [
    StarterKit,
  ]
const TaskPage: React.FC = () => {
    const { task, options } = useLoaderData() as any;
    const navigate = useNavigate();
    const submit = useSubmit();
    const isSmallScreen = useSmallScreenSize();
    useListenForSave(FORM_ID);
    
    // console.log('yes', value)
    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }

    const editor = useEditor({
        extensions,
        content: task?.description ?? '',
      })
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
    return (
        <div className="contactRight">
            <h2 className={styles.h2}>{task.title}</h2>
            <div className="contactButtons">
                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                <TopBar>
                    <>
                        <IconButton
                            icon="bi bi-clock"
                            form={FORM_ID}
                            onClick={() => {
                                navigate(`/task/${task.taskId}/date-time`);
                            }} />

                        <Form
                            method="delete"
                            onSubmit={(event) => {
                                if (!confirm("Please confirm you want to delete this task.")) {
                                    event.preventDefault();
                                }
                            }}>
                            <input type="hidden" name="formId" value="deleteTask" />
                            <input type="hidden" name="id" value={task.taskId} />
                            <IconButton
                                icon="bi bi-trash"
                                type="submit"
                                className={styles.trashButton} />
                        </Form>
                        <IconButton
                            icon="bi bi-save"
                            category={Category.info}
                            form={FORM_ID}
                        />
                    </>
                </TopBar>
            <Form
                id={FORM_ID}
                name={FORM_ID}
                method="post"
                action={`/task/${task.taskId}`}
                className={cn({ [styles.form]: isSmallScreen })}>
                <input type="hidden" name="id" value={task.taskId} />
                <input type="hidden" name="formId" value="updateTask" />
                {/* Need to make this multi select */}
                <select name="tags">
                    {options?.map((tag: any) => <option
                        key={tag._id}
                        id={tag.name}
                        value={tag.name}
                        selected={tag.selected}>
                        {tag.name}
                    </option>)}
                </select>
                <EditorContent editor={editor} />
            </Form>
        </div>
        </div>);
};

export default TaskPage;

