import {
    Form,
    NavLink,
    Outlet,
    useNavigation,
    useLoaderData,
    useSubmit
} from "react-router-dom";
import cn from 'classnames';
import { createContact, getContactsSearch, Task } from "../contacts";
import { useEffect } from "react";

export async function action() {
    const contact = await createContact();
    return { contact };
}

//@TODO: Move this
export async function mainLoader({ request }: any) {
    console.log('mainLoader')
    const url = new URL(request.url);
    const q = url.searchParams.get("q") as string;
    console.log('q', q)
    const tasks = await getContactsSearch(q);
    return { tasks, q };
}

export default function MainPage() {
    const { tasks, q } = useLoaderData() as { tasks: Task[], q: string };
    const navigation = useNavigation();
    const submit = useSubmit();
    
    console.log('tasks', tasks)
    // const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    // console.log('q', q)
    useEffect(() => {
        const element = document.getElementById('q') as unknown as { value: string };
        element.value = q;
        // console.log('q', q)
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
                    {tasks.length ? (
                        <ul>
                            {tasks.map((contact: any) => (
                                <li key={contact._id}>
                                    <NavLink
                                        key={contact.id}
                                        to={`contacts/${contact._id}`}
                                        className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                                        {contact?.title ? (
                                            <>
                                                {contact.title}
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