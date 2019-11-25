import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import logo from '~/assets/logo.png';

import api from '~/services/api';
import { Container, Content, Logo } from './styles';
import LoginForm from './components/LoginForm';
import authConfig from '~/config/auth';
import { isAuthenticated } from '~/util/auth';

export default function Login({ location: { state }, history }) {
  function goToInitialRoute(role) {
    history.push(role === authConfig.roles.ADMIN ? '/employees' : '/evaluate');
  }

  useEffect(() => {
    /**
     * If the user tries to access a page that does not have permission,
     * they will be redirected to login, receiving the props 'from' which indicates
     * which page the user tried to access.
     */
    if (state && state.from) {
      toast.error(
        'Ops, você não tem permissão para acessar essa página, faça login e tente novamente!'
      );
    }

    if (isAuthenticated()) {
      const role = parseInt(localStorage.getItem(authConfig.ROLE_KEY), 10);
      goToInitialRoute(role);
    }
  }, []);

  async function handleOnSubmit(values, { setSubmitting }) {
    try {
      const response = await api.post('/sessions', values);
      const {
        token,
        user: { id, name, email, role },
      } = response.data;
      localStorage.setItem(authConfig.TOKEN_KEY, token);
      localStorage.setItem(authConfig.ROLE_KEY, role);
      localStorage.setItem(authConfig.ID_KEY, id);
      localStorage.setItem(authConfig.NAME_KEY, name);
      localStorage.setItem(authConfig.EMAIL_KEY, email);
      setSubmitting(false);
      goToInitialRoute(role);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container>
      <Content>
        <Logo src={logo} />

        <LoginForm onSubmit={handleOnSubmit} />
      </Content>
    </Container>
  );
}
