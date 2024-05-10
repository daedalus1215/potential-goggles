import React from 'react';
import {
    useFetcher,
} from 'react-router-dom';
import {
    Contact,
} from '../../contacts';
import { ActionInterface } from '../../interfaces';




interface FavoriteProps {
    contact: Contact
}

const Favorite: React.FC<FavoriteProps> = ({ contact: task }) => {
    const fetcher = useFetcher();
    const favorite = task?.favorite ?? false;
    return (
        <fetcher.Form method="post" className="favoriteForm">
            <ButtonWrapper
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