import React from 'react';
import AddButton from '@/components/addButton/AddButton';
import { TopBar } from '@/components';
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
        <div className='contactRight'>
            <TopBar />
            <div className={styles.page}>
                <Form
                    method='post'>
                    <AddButton />

                    <ul className={styles.DateTimeListView}>
                        {tags.map((tag: TagInterface) => {
                            return <Tag
                            _id={tag._id} 
                            key={tag._id} 
                            name={tag.name} 
                            classNames={styles.content}/>
                        })}
                    </ul>
                </Form>
            </div>
        </div>
    );
}

export default TagePage;