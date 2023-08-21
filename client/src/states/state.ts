import { atom } from "recoil";
import { User } from "../types/types";

const tokenState = atom({
  key: "token",
  default: (localStorage.getItem("pet-adoption-user-token")
    ? localStorage.getItem("pet-adoption-user-token")
    : null) as string | null,
});

const userState = atom({
  key: "user",
  default: null as User | null,
});

export { tokenState, userState };
