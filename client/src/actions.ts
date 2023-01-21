import { redirect } from "react-router-dom";
import { deleteContact, Params } from "./contacts";


export async function destroy({ params }: Params) {
    // throw new Error("oh dang!");
    deleteContact(params.contactId);
    return redirect("/");
}