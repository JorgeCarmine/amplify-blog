
import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import { dict } from './lang/es';

import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
  AmplifyForgotPassword,
  AmplifyConfirmSignUp,
  AmplifyRequireNewPassword,
  withAuthenticator
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Amplify, { I18n, API, graphOperation } from 'aws-amplify';

import awsExports from './aws-exports.js';

Amplify.configure(awsExports);

I18n.putVocabularies(dict)

I18n.setLanguage('es');

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <AmplifySignOut buttonText="Cerrar sesión"/>
          <div>Hello, {user.attributes.email}</div>
      </div>
    ) : (
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          headerText="Crear una cuenta"
          haveAccountText="¿Tienes una cuenta?"
          signInText="Iniciar sesión"
          submitButtonText="Crear cuenta"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Correo electrónico",
              placeholder: "",
              required: true,
            },
            {
              type: "password",
              label: "Contraseña",
              placeholder: "",
              required: true,
            },
            {
              type: "phone_number",
              label: "Número telef+onico",
              placeholder: "",
              required: false,
            },
          ]} 
        />
        <AmplifyConfirmSignUp
          slot="confirm-sign-up"
          headerText="Confirmar correo"
          usernameAlias="email"
        ></AmplifyConfirmSignUp>
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          headerText="Iniciar sesión"
          submitButtonText="Aceptar"
          forgotPasswordText="Olvidé mi contraseña"
          formFields={[
            {
              type: "email",
              label: "Correo electrónico",
              placeholder: "",
              required: true,
            },
            {
              type: "password",
              label: "Contraseña",
              placeholder: "",
              required: true,
            },
          ]}
        />
        <AmplifyForgotPassword
          slot="forgot-password"
          headerText="Recuperar contraseña"
          sendButtonText="Enviar código"
          submitButtonText="Aceptar"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Correo electrónico",
              placeholder: "",
              required: true,
            }
          ]}
        ></AmplifyForgotPassword>
        <AmplifyRequireNewPassword
          slot="require-new-password"
          headerText='Nueva contraseña'
          submitButtonText='Aceptar'
        ></AmplifyRequireNewPassword>
      </AmplifyAuthenticator>
  );
}

export default App
