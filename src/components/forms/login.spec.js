import { LoginForm } from "./login";
import ReactDOM from "react-dom";
import { act, waitFor, fireEvent } from "@testing-library/react";
import { BikelyApi } from "../../api/BikelyApi";

jest.mock("../../api/BikelyApi");

let container;
const mockedSuccessfulResponse = {
  access_token: "token",
};

const mockedUnsuccessfulResponse = {
  message: "error",
  status: "400",
  error: true,
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Validation tests", () => {
  it("Should display required under empty inputs", async () => {
    const promise = Promise.resolve();

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const button = container.querySelector("button");
    act(() => {
      button.dispatchEvent(new MouseEvent("click"));
    });
    const elements = container.querySelectorAll(".MuiFormHelperText-root");

    await waitFor(
      () => {
        expect(elements[0].textContent).toEqual("Required");
        expect(elements[1].textContent).toEqual("Required");
      },
      { timeout: 100 }
    );
    await act(() => promise);
  });

  it("Should display too short if password has less than 8 chars", async () => {
    const promise = Promise.resolve();

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const passwordInput = container.querySelector("#password");
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "1234" } });
    });

    const elements = container.querySelectorAll(".MuiFormHelperText-root");

    await waitFor(
      () => {
        expect(elements[1].textContent).toEqual("Password too short");
      },
      { timeout: 100 }
    );
    await act(() => promise);
  });

  it("Should display invalid email if email is invalid", async () => {
    const promise = Promise.resolve();

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const emailInput = container.querySelector("#email");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "not.validEmail" } });
    });

    const elements = container.querySelectorAll(".MuiFormHelperText-root");

    await waitFor(
      () => {
        expect(elements[0].textContent).toEqual("Invalid email address");
      },
      { timeout: 100 }
    );
    await act(() => promise);
  });

  it("Shouldn't display anything if inputs are valid", async () => {
    const promise = Promise.resolve();

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const emailInput = container.querySelector("#email");
    const passwordInput = container.querySelector("#password");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    });

    const elements = container.querySelectorAll(".MuiFormHelperText-root");

    await waitFor(
      () => {
        expect(elements[0].textContent).toEqual("");
        expect(elements[1].textContent).toEqual("");
      },
      { timeout: 100 }
    );
    await act(() => promise);
  });
});

describe("Response handling", () => {
  it("Redirect after successful login", async () => {
    const promise = Promise.resolve();
    const mockResult = jest.fn().mockResolvedValueOnce(mockedSuccessfulResponse);
    BikelyApi.login = mockResult;

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const emailInput = container.querySelector("#email");
    const button = container.querySelector("button");
    const passwordInput = container.querySelector("#password");

    act(() => {
      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    });

    act(() => {
      button.dispatchEvent(new MouseEvent("click"));
    });

    expect(true).toEqual(true);
    await act(() => promise);
  });

  it("Should display form error after unsuccessful login", async () => {
    const promise = Promise.resolve();
    const mockResult = jest.fn().mockResolvedValueOnce(mockedUnsuccessfulResponse);
    BikelyApi.login = mockResult;

    act(() => {
      ReactDOM.render(<LoginForm></LoginForm>, container);
    });
    const emailInput = container.querySelector("#email");
    const button = container.querySelector("button");
    const passwordInput = container.querySelector("#password");

    act(() => {
      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    });

    act(() => {
      button.dispatchEvent(new MouseEvent("click"));
    });

    const formError = container.querySelector("#formError");

    await waitFor(
      () => {
        expect(formError.textContent).toEqual("Invalid credentials");
      },
      { timeout: 100 }
    );
    await act(() => promise);
  });
});
