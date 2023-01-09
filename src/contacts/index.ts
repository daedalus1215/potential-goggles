
export const getContacts = () => ([{
    id: 'dsd',
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
}]);

export const createContact = () => ({
    id: '2dsd',
    first: 'firsts',
    last: 'lasts',
    favorite: 'fsacorite'
});


export const getContact = () => getContacts()[0];