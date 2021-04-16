import React from 'react';
import ReactDOM from 'react-dom';
import { act, waitFor, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from '../../../theme/theme';

import { LoginForm } from './LoginForm';

jest.mock('../../../api/BikelyApi');

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const setup = () => {
  const formik = {
    handleSubmit: jest.fn(),
    values: {},
    errors: {},
    handleChange: jest.fn(),
  };
  act(() => {
    const loading = false;
    const formError = '';
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <LoginForm formik={formik} formError={formError} loading={loading} />
      </ThemeProvider>,
      container,
    );
  });
  const form = container.querySelector('form');
  const button = container.querySelector('button');
  const passwordInput = container.querySelector('#password');
  const emailInput = container.querySelector('#email');

  return { formik, form, button, passwordInput, emailInput };
};

describe('Validation tests', () => {
  it('Should call Formik.handleSubmit once as form submitted', async () => {
    const promise = Promise.resolve();
    const { formik, form } = setup();

    act(() => {
      fireEvent.submit(form);
    });

    await waitFor(
      () => {
        expect(formik.handleSubmit).toHaveBeenCalledTimes(1);
      },
      { timeout: 100 },
    );
    await act(() => promise);
  });
});
