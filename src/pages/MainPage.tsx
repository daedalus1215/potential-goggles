import {
    Form,
    NavLink,
    Outlet,
    useNavigation,
    useLoaderData,
    useSubmit
} from "react-router-dom";
import { Contact, createContact, getContacts, getContactsSearch } from "../contacts";
import cn from 'classname';
import { useEffect } from "react";

export async function action() {
    const contact = await createContact();
    return { contact };
}

export async function mainLoader({ request }: any) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") as string;
    console.log('q', q)
    const contacts = await getContactsSearch(q);
    console.log('contacts', contacts)
    return { contacts, q };
}

export default function MainPage() {
    const { contacts, q } = useLoaderData() as { contacts: Contact[], q: string };
    const navigation = useNavigation();
    const submit = useSubmit();

    // const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        //@TODO: Probs useRef is better here
        document.getElementById('q').value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar" className="sidebar">
                <div className="top">
                    <Form id="search-form" role="search" className="formSearch">
                        <i className={cn("bi-search", "searchIcon")} ></i>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            className={cn("search")}
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch
                                });
                            }}
                        />
                    </Form>
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