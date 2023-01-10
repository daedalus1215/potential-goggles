
export interface Contact {
    id: string;
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: true;
};

export const getContacts = (): Contact[] => ([{
    id: 'dsd',
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
},
{
    id: 'd2sd',
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
}]);

export const createContact = () => ({
    id: 'd2sd',
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
});


export const getContact = (index: string): Contact => getContacts()
    .find(contact => contact.id === index) as Contact;