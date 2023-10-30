import { useState } from 'react';
import { useOutsideClick } from '../../utils';
import './Dropdown.css';

export const Dropdown = ({ items, setSelectedSave, cache, setCache }) => {
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

    setSelectedSave({ Id: id, sequenceName: name, noteSequence: value });
    clickOutsideHandler();
  };

  const openSavedHeight = items && items.length < 9 ? items.length * 21 : 100;
  const openCachedHeight = () => {
    if (!cache) return 200;
    return cache.length * 21;
  };

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
            height: open.saved && items ? `${openSavedHeight}px` : 0,
          }}
        >
          {items &&
            items.map((item, i) => (
              <li
                className="item"
                key={i}
                title={item.sequenceName}
                data-id={item.Id}
                data-name={item.sequenceName}
                data-value={item.noteSequence}
                onClick={selectHandler}
              >
                - {item.sequenceName}
              </li>
            ))}
        </ul>
      </li>
      {/* //! Need to update Recently Saved to display cache instead of saved data */}
      <li>
        <button
          className="accordion-header"
          name="recent"
          onClick={toggleAccordion}
        >
          Recently Saved
        </button>
        <ul
          className="submenu-items"
          style={{
            height: open.recent && cache ? `${openCachedHeight}px` : 0,
          }}
        >
          {cache &&
            cache.map((item, i) => (
              <li
                className="item"
                key={i}
                title={item.sequenceName}
                data-id={item.Id}
                data-name={item.sequenceName}
                data-value={item.noteSequence}
                onClick={selectHandler}
              >
                - {item.sequenceName}
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
};