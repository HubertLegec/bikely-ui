import React from 'react';
import ReactDOM from 'react-dom';
import { act, waitFor, fireEvent } from '@testing-library/react';

import { BikelyApi } from '../../../api/BikelyApi';

import { LoginForm } from './LoginForm';

jest.mock('../../../api/BikelyApi');

let container;

const mockedUnsuccessfulResponse = {
  message: 'error',
  status: '400',
  error: true,
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const setup = () => {
  act(() => {
    ReactDOM.render(<LoginForm />, container);
  });
  const button = container.querySelector('button');
  const passwordInput = container.querySelector('#password');
  const emailInput = container.querySelector('#email');

  return { button, passwordInput, emailInput };
};

describe('Validation tests', () => {
  it('Should display required under empty inputs', async () => {
    const promise = Promise.resolve();
    const { button } = setup();
    const elements = container.querySelectorAll('.MuiFormHelperText-root');

    act(() => {
      button.dispatchEvent(new MouseEvent('click'));
    });

    await waitFor(
      () => {
        expect(elements[0]).toHaveTextContent('Required');
        expect(elements[1]).toHaveTextContent('Required');
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });

  it('Should display too short if password has less than 8 chars', async () => {
    const promise = Promise.resolve();
    const { passwordInput } = setup();
    const elements = container.querySelectorAll('.MuiFormHelperText-root');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '1234' } });
    });

    await waitFor(
      () => {
        expect(elements[1]).toHaveTextContent('Password too short');
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });

  it('Should display invalid email if email is invalid', async () => {
    const promise = Promise.resolve();
    const { emailInput } = setup();
    const elements = container.querySelectorAll('.MuiFormHelperText-root');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'not.validEmail' } });
    });

    await waitFor(
      () => {
        expect(elements[0]).toHaveTextContent('Invalid email address');
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });

  it("Shouldn't display anything if inputs are valid", async () => {
    const promise = Promise.resolve();
    const { emailInput, passwordInput } = setup();
    const elements = container.querySelectorAll('.MuiFormHelperText-root');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    });

    await waitFor(
      () => {
        expect(elements[0]).toHaveTextContent('');
        expect(elements[1]).toHaveTextContent('');
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });
});

describe('Response handling', () => {
  it('Should display form error after unsuccessful login', async () => {
    const promise = Promise.resolve();
    const { emailInput, passwordInput, button } = setup();
    const mockResult = jest.fn().mockResolvedValueOnce(mockedUnsuccessfulResponse);
    const formError = container.querySelector('#formError');
    BikelyApi.login = mockResult;

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    });

    act(() => {
      button.dispatchEvent(new MouseEvent('click'));
    });

    await waitFor(
      () => {
        expect(formError).toHaveTextContent('Invalid credentials');
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });
});
