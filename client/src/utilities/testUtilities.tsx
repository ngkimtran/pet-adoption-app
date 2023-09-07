import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import Pets from "../pages/Pets/Pets";
import { RecoilRoot } from "recoil";
import AdoptionForm from "../components/AdoptionForm/AdoptionForm";
import { tokenState, userState } from "../states/state";
import { User } from "../types/types";

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
            <Route path="/browse-pets/cat" element={<Pets />} />
            <Route path="/adopt" element={<AdoptionForm />} />
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
