import { useEffect, useRef } from 'react';
import axios from 'axios';
import config from './config';

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

export const convertToString = (arr) => arr.map((item) => item.label).join('');

export const convertToUsablePair = (str) => {
  const arr = str.split(/(..)/g).filter((s) => s);
  return arr.map((item) => ({
    label: item.slice(0, 1).toUpperCase(),
    note: item,
  }));
};

export const checkSavedItems = async (title, setSavedItems) => {
  try {
    const res = await getAllSaved();

    if (res) {
      setSavedItems(res);
      const notes = res.find(
        (item) => item.sequenceName.toLowerCase() === title.toLowerCase()
      );
      if (notes) {
        return notes;
      }
    }
    return false;
  } catch (e) {
    console.error(e);
  }
};

export const postSequence = async (obj, setSavedItems, setCache) => {
  try {
    const res = await axios.post(`${config.endpoint}:8089/sequences`, obj);
    setSavedItems((prev) => (prev ? [...prev, res.data] : [res.data]));
    getCache().then(setCache);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const putSequence = async (obj, setSavedItems, setCache) => {
  try {
    const res = await axios.put(`${config.endpoint}:8089/allsequences`, obj);
    const saved = await getAllSaved();
    setSavedItems(saved);
    getCache().then(setCache);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteSequence = async (id, setSavedItems) => {
  try {
    await axios.delete(`${config.endpoint}:8089/allsequences?id=${id}`);
    const updated = await getAllSaved();
    setSavedItems(updated);
  } catch (e) {
    console.error(e);
  }
};

export const getAllSaved = async () => {
  try {
    const res = await axios.get(`${config.endpoint}:8089/allsequences`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCache = async () => {
  try {
    const res = await axios.get(`${config.endpoint}:8089/cachesequences`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};