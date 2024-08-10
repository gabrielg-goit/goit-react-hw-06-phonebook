import style from './Contacts.module.css';
import React from 'react';
import { deleteContactAction } from '../../redux/contacts-slice';
import { useDispatch } from 'react-redux';

const ContactsItem = ({ name, number, contactId }) => {
  const dispatch = useDispatch();

  const deleteContact = contactId => dispatch(deleteContactAction(contactId));
  return (
    <li key={contactId} className={style.item}>
      {name}: {number}
      <button
        className={style.buttonDelete}
        type="button"
        onClick={() => deleteContact(contactId)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactsItem;
