import { redirect } from "react-router-dom";
import { deleteContact, Params } from "./contacts";


export async function destroy({ params }: Params) {
    deleteContact(params.contactId);
    return redirect("/");
}