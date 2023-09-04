import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import Pets from "../pages/Pets/Pets";
import { RecoilRoot } from "recoil";

type WrapperProps = {
  mocks?: readonly MockedResponse<Record<string, any>, Record<string, any>>[];
};

const AllTheProviders = ({
  children,
  mocks,
}: {
  children: React.ReactNode;
  mocks?: WrapperProps["mocks"];
}) => {
  return (
    <MockedProvider mocks={mocks}>
      <RecoilRoot>
        <MemoryRouter
          basename={"/pet-adoption-app"}
          initialEntries={["/pet-adoption-app"]}
        >
          <Routes>
            <Route path="/" element={<div>App</div>} />
            <Route path="/browse-pets/cat" element={<Pets />} />
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
