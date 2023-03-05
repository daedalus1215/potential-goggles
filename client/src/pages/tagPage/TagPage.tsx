import AddButton from '@/components/addButton/AddButton';
import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { Tag as TagInterface } from '@/interfaces';
import Tag from './tagItem/TagItem';

import styles from './TagPage.module.css';
import HomeButton from '@/components/homeButton/HomeButton';
import { Button, TopBar } from '@/components';

const TagePage: React.FC = () => {
    const tags = useLoaderData() as TagInterface[];

    if (!tags) {
        throw new Response("", {
            status: 404,
            statusText: "Tags not found!",
        });
    }

    return (
        <div className='contactRight'>
            <HomeButton />
            <TopBar />
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
        </div>
    );
}

export default TagePage;