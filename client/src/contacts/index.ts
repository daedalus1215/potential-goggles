import { isHtmlElement } from "react-router-dom/dist/dom";

export interface Contact {
    id: string;
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
};

export interface Params {
    params: {
        contactId: string
    };
}

let data: Contact[] = [{
    id: 'dsd',
    first: "Jeremy",
    last: "Holmes",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "@jHolmes",
    notes: "Some notes",
    favorite: true,
},
{
    id: 'd2sd',
    first: "Ysdsour",
    last: "Namsdase",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "twitter handle",
    notes: "Some notes",
    favorite: true,
}];

export const getContacts = (): Contact[] => data;
export const getContactsSearch = (name: string): Contact[] => !name ? getContacts() : data.filter(da => da.first.toLowerCase().includes(name.toLowerCase()));

export const createContact = () => {
    data.push({
        id: 'd2sdw',
        first: "Yddour",
        last: "Naddsme",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    });
};

export const deleteContact = (id: string) => {
    data = data.filter(contact => contact.id !== id);
}

export const getContact = (index: string): Contact => getContacts()
    .find(contact => contact.id === index) as Contact;

export const updateContact = async (contactId: string, updates: any) => {
    const otherContacts = data.filter(items => items.id !== contactId);
    otherContacts.push({ ...data?.find(item => item?.id === contactId), ...updates });
    data = otherContacts;
    return data;
}