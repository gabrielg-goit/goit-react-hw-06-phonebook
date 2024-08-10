import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from './PhonebookForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts-selector';
import { addContactAction } from '../../redux/contacts-slice';

const PhonebookForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validateName = name => {
    const nameRegex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  };

  const validateNumber = number => {
    const phoneRegex =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return phoneRegex.test(number);
  };

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateName(name)) {
      return alert('Name may contain only letters, apostrophe, and spaces');
    }

    if (!validateNumber(number)) {
      return alert(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
    }

    const newContact = {
      id: nanoid(4),
      name: name,
      number: number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContactAction(newContact));
    setName('');
    setNumber('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Name:
        <input
          className={style.input}
          id="nameInput"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={style.label}>
        Phone Number:
        <input
          className={style.input}
          id="numberInput"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={style.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default PhonebookForm;
