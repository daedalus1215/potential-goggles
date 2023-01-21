import React from 'react';
import {
    useFetcher,
} from 'react-router-dom';
import {
    Contact,
    updateContact
} from '../../contacts';
import { ActionInterface } from '../interfaces';


export const action: ActionInterface = async ({ request, params }) => {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get('favorite') === 'true'
    });
};

interface FavoriteProps {
    contact: Contact
}

const Favorite: React.FC<FavoriteProps> = ({ contact }) => {
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    return (
        <fetcher.Form method="post" className="favoriteForm">
            <button
                name="favorite"
                className="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}

export default Favorite;