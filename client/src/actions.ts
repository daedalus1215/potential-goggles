import { redirect } from "react-router-dom";
import { deleteContact, Params, updateContact } from "./contacts";
import { ActionInterface } from "./pages/interfaces";


export async function destroyContact({ params }: Params) {
    // throw new Error("oh dang!");
    deleteContact(params.contactId);
    return redirect("/");
}

export const updateContactForm: ActionInterface = async ({ request, params }) => {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get('favorite') === 'true'
    });
};