import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import store from "../redux/store";
import Header from "./Header";

describe("Header", () => {
  it("renders component", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    expect(screen.getByText(/imperial/i)).toBeInTheDocument();
    expect(screen.getByText(/metric/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Weather in your city")).toBeInTheDocument();
  });
});
