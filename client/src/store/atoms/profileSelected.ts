import { atom } from "recoil";

export const profileSelected = atom({
    key: 'profileSelected', // unique ID
    default: false, // default value
  });