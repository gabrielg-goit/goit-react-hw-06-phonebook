import style from './Contacts.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filter-selector';
import ContactsItem from './ContactsItem';

const Contacts = () => {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <ul className={style.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactsItem key={id} name={name} number={number} contactId={id} />
        );
      })}
    </ul>
  );
};
export default Contacts;
