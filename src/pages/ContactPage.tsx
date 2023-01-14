import { Form, useLoaderData } from "react-router-dom";
import { Contact, createContact, getContact } from "../contacts";

interface Params {
    params: {
        contactId: string
    };
}

export async function contactLoader({ params }: Params) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function ContactPage() {
    const { contact } = useLoaderData() as { contact: Contact };
    console.log('contact', contact)
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };

    return (
        <div id="contact" className="contact">
            <div className="avatar">
                <img
                    key={contact.avatar || ''}
                    src={contact.avatar || ''}
                />
            </div>

            <div className="contactRight">
                <div className="contactTitle">
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </div>

                {contact.twitter && (
                    <p className="twitter">
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form
                        action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }: { contact: Contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post" className="favoriteForm">
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
        </Form>
    );
}