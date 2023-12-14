import { useState } from 'react';
import { useOutsideClick } from '../../utils';
import './Dropdown.css';

export const Dropdown = ({ items, setSelectedSave }) => {
  const [open, setOpen] = useState({
    saved: false,
    recent: false,
  });

  const toggleAccordion = (e) => {
    const { name } = e.target;

    setOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const clickOutsideHandler = () =>
    setOpen({
      saved: false,
      recent: false,
    });

  const selectHandler = (e) => {
    const { id, name, value } = e.target.dataset;

    setSelectedSave({ id: id, sequenceName: name, noteSequence: value });
    clickOutsideHandler();
  };
  
  const openSavedHeight = !items.length ? 21 : items.length < 9 ? items.length * 21 : 100;
  const dropdownRef = useOutsideClick(clickOutsideHandler);

  return (
    <ul className="accordion-wrapper" ref={dropdownRef}>
      <li>
        <button
          className="accordion-header"
          name="saved"
          onClick={toggleAccordion}
        >
          Saved Sequences
        </button>
        <ul
          className="submenu-items"
          style={{
            height: open.saved ? `${openSavedHeight}px` : 0,
          }}
        >
          {items.length > 0 ?
            items.map((item, i) => (
              <li
                className="item"
                key={i}
                title={item.sequenceName}
                data-id={item.id}
                data-name={item.sequenceName}
                data-value={item.noteSequence}
                onClick={selectHandler}
              >
                - {item.sequenceName}
              </li>
            ))
          : (<li className="no-items">- no saved items -</li>)}
        </ul>
      </li>
    </ul>
  );
};