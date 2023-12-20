import { useEffect, useRef, createContext } from 'react';

export const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return ref;
};

export const CloseContext = createContext(null)

export const convertToString = (arr) => arr.map((item) => item.label).join('');

export const convertToUsablePair = (str) => {
  const arr = str.split(/(..)/g).filter((s) => s);
  return arr.map((item) => ({
    label: item.slice(0, 1).toUpperCase(),
    note: item,
  }));
};

export const checkSavedItems = (title, setSavedItems) => {
  const res = getAllSaved();

  if (res.length) {
    setSavedItems(res);
    const notes = res.find(
      (item) => item.sequenceName.toLowerCase() === title.toLowerCase()
    );
    if (notes) {
      return notes;
    }
  }
  return false;
};

export const postSequence = (obj, setSavedItems) => {
  const current = getAllSaved();
  const id = new Date().toISOString();
  const updatedItem = {...obj, id}

  if (current.length) {
    current.push(updatedItem);
    localStorage.setItem("savedSeqs", JSON.stringify(current))
  } else {
    localStorage.setItem("savedSeqs", JSON.stringify([updatedItem]))
  }
  setSavedItems((prev) => (prev ? [...prev, updatedItem] : [updatedItem]));
  return updatedItem;
};

export const putSequence = (obj, setSavedItems) => {
  const saved = getAllSaved();
  const itemIndex = saved.findIndex((i) => i.id === obj.id);

  saved[itemIndex] = obj;
  localStorage.setItem("savedSeqs", JSON.stringify(saved));

  setSavedItems(saved);
};

export const deleteSequence = async (id, setSavedItems) => {
  const savedItems = getAllSaved();
  const itemIndex = savedItems.findIndex((i) => i.id === id);

  savedItems.splice(itemIndex, 1);
  localStorage.setItem("savedSeqs", JSON.stringify(savedItems));

  setSavedItems(savedItems);
};

export const getAllSaved = () => {
  const res = localStorage.getItem("savedSeqs");
  if (res) return JSON.parse(res);
  return [];
};