import React from 'react';
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Contact, Params, updateContact } from '../contacts';

//@TODO: Leaving these any for now
export const action = async ({ request, params }: {request:any, params:any}) => {
  window.console.log('simulate updating a record!')
  const formData = await request.formData();
  console.log('formData', formData)
  const updates = Object.fromEntries(formData);
  console.log('fromEntries', updates)
  await updateContact(params.contractId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

const EditContactPage: React.FC = () => {
  const contact = useLoaderData() as Contact;
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form" className="contactForm">
      <div className="row">
        <p className="label">Name</p>
        <p className="names">
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            className="firstName"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            className="lastName"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
      </div>
      <div className='row'>
        <p className='label'>
          <span>Twitter</span>
        </p>
        <p className="twitter">
          <input
            type="text"
            name="twitter"
            className="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </p>
      </div>

      <div className='row'>
        <p className="label">
          Avatar URL
        </p>
        <p className="twitter">
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            className="twitter"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </p>
      </div>



      <div className='row'>
        <p className="label">
          Notes
        </p>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </div>


      <div className='row'>
        <p className="label">
        </p>
        <p className="editContactPageButtons">
          <button
            type="submit"
            className="editContactPgeSubmit">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}>
            Cancel
          </button>
        </p>
      </div>
    </Form >
  );
}

export default EditContactPage;