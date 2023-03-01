import AddButton from '@/components/addButton/AddButton';
import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { Tag as TagInterface } from '@/interfaces';
import Tag from './tagItem/TagItem';

import styles from './TagPage.module.css';

const TagePage: React.FC = () => {
    const tags = useLoaderData() as TagInterface[];

    if (!tags) {
        throw new Response("", {
            status: 404,
            statusText: "Tags not found!",
        });
    }

    return (
        <div className={styles.page}>
            <Form
                method='post'>
                <AddButton />

                <div className={styles.grid}>
                    {tags.map((tag: TagInterface) => {
                        return <Tag key={tag._id} _id={tag._id} name={tag.name} />
                    })}
                </div>
            </Form>
        </div>
    );
}

export default TagePage;