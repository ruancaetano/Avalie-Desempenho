import React from 'react';

import authConfig from '../../config/auth';
import { Container, Logo, Items, Item, ItemLink } from './styles';

import logo from '~/assets/logo.png';

export default function Header({ path, history }) {
  const role = parseInt(localStorage.getItem(authConfig.ROLE_KEY), 10);

  function handleOnLogout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <Container>
      <Logo src={logo} />

      <Items>
        {role === 0 && (
          <>
            <Item selected={path === '/employees'}>
              <ItemLink to="/employees">Funcionários</ItemLink>
            </Item>
            <Item selected={path === '/evaluations'}>
              <ItemLink to="/evaluations">Avaliações</ItemLink>
            </Item>
          </>
        )}

        {role === 1 && (
          <Item selected={path === '/evaluate'}>
            <ItemLink to="/evaluate">Avaliar</ItemLink>
          </Item>
        )}

        <Item onClick={handleOnLogout}>Sair</Item>
      </Items>
    </Container>
  );
}
