import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import { tokenState, userState } from "../states/state";
import { User } from "../types/types";
import Pets from "../pages/Pets/Pets";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Favorites from "../pages/Favorites/Favorites";
import Admin from "../pages/Admin/Admin";
import About from "../pages/About/About";
import Faq from "../pages/Faq/Faq";
import Adopt from "../pages/Adopt/Adopt";
import SinglePet from "../pages/SinglePet/SinglePet";
import Profile from "../pages/Profile/Profile";

type WrapperProps = {
  apolloMocks?: readonly MockedResponse<
    Record<string, any>,
    Record<string, any>
  >[];
  mockUserState?: User | undefined;
  mockTokenState?: string | undefined;
};

const mockRecoilState = (
  snapshot: any,
  mockUserState: User | undefined,
  mockTokenState: string | undefined
) => {
  if (mockUserState) snapshot.set(userState, mockUserState);
  if (mockTokenState) snapshot.set(tokenState, mockTokenState);
};

const AllTheProviders = ({
  children,
  apolloMocks,
  mockUserState,
  mockTokenState,
}: {
  children: React.ReactNode;
  apolloMocks?: WrapperProps["apolloMocks"];
  mockUserState?: WrapperProps["mockUserState"];
  mockTokenState?: WrapperProps["mockTokenState"];
}) => {
  return (
    <MockedProvider mocks={apolloMocks}>
      <RecoilRoot
        initializeState={(snapshot) =>
          mockRecoilState(snapshot, mockUserState, mockTokenState)
        }
      >
        <MemoryRouter
          basename={"/pet-adoption-app"}
          initialEntries={["/pet-adoption-app"]}
        >
          <Routes>
            <Route path="/" element={<div>App</div>} />
            <Route path="/browse-pets/:animal" element={<Pets />} />
            <Route path="/browse-pets/:animal/:id" element={<SinglePet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:userId" element={<Profile />} />
            <Route path="/:userId/favorites" element={<Favorites />} />
            <Route path="/:userId/admin-panel" element={<Admin />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
          {children}
        </MemoryRouter>
      </RecoilRoot>
    </MockedProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: { wrapperProps: WrapperProps } & Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} {...options?.wrapperProps} />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
