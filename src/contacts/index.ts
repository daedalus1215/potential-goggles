
export interface Contact {
    id: string;
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: true;
};

const data = [{
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
}] as Contact[];

export const getContacts = (): Contact[] => data;

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


export const getContact = (index: string): Contact => getContacts()
    .find(contact => contact.id === index) as Contact;