import {
    Form,
    NavLink,
    Outlet,
    useNavigation,
    useLoaderData
} from "react-router-dom";
import { Contact, createContact, getContacts } from "../contacts";
import cn from 'classname';

export async function mainLoader() {
    const contacts = await getContacts();
    return { contacts };
}

export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function MainPage() {
    const { contacts } = useLoaderData() as { contacts: Contact[] };
    const navigation = useNavigation();

    return (
        <>
            <div id="sidebar" className="sidebar">
                <div className="top">
                    <div className="formSearch">
                        <i className={cn("bi-search", "searchIcon")}></i>
                        <input className="search" placeholder="Search"></input>
                    </div>
                    <Form method="post" className="newForm">
                        <button type="submit" className="button">New</button>
                    </Form>
                </div>
                <nav className="navbar">
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact: any) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={cn("detail", navigation.state === "loading" ? "loading" : "")}>
                <Outlet />
            </div>
        </>
    );
}