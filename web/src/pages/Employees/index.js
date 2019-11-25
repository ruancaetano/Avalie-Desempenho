import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import UsersList from '~/components/UsersList';

import { Container, Content, FormWrapper, UsersListWrapper } from './styles';
import UserForm from './components/UserForm';
import Text from '~/components/Text';
import api from '~/services/api';

export default function Employees({ location: { pathname }, history }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  async function loadEmployees() {
    try {
      const response = await api.get('/users');
      setEmployees(response.data);
      setLoadingEmployees(false);
    } catch (error) {
      setLoadingEmployees(false);
      toast.error(error);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleOnUserSelect(user) {
    setSelectedEmployee(user);
  }

  async function handleOnSubmit(values, { setSubmitting, resetForm }) {
    try {
      // Is editing ?
      if (selectedEmployee) {
        await api.put(`/users/${selectedEmployee.id}`, values);
      } else {
        await api.post('/users', values);
      }
      setSelectedEmployee(null);
      setLoadingEmployees(true);
      loadEmployees();
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setLoadingEmployees(false);
      setSubmitting(false);
      toast.error(error);
    }
  }

  function handleOnCancelButton() {
    setSelectedEmployee(null);
  }

  async function handleOnDeleteButton(setSubmitting, resetForm) {
    try {
      await api.delete(`/users/${selectedEmployee.id}`);
      setSelectedEmployee(null);
      setLoadingEmployees(true);
      loadEmployees();
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setLoadingEmployees(false);
      setSubmitting(false);
      toast.error(error);
    }
  }

  return (
    <Container>
      <Header path={pathname} history={history} />

      <Content>
        <UsersListWrapper>
          <Text>Selecione um funcionário para editar/excluir:</Text>
          {loadingEmployees && <Text note>Carregando...</Text>}
          {!loadingEmployees && employees.length < 1 && (
            <Text note>Nenhum funcionário a ser exibido!</Text>
          )}
          {!loadingEmployees && employees.length > 0 && (
            <UsersList users={employees} onUserSelect={handleOnUserSelect} />
          )}
        </UsersListWrapper>

        <FormWrapper>
          <UserForm
            userToEdit={selectedEmployee}
            onSubmit={handleOnSubmit}
            onDelete={handleOnDeleteButton}
            onCancelButton={handleOnCancelButton}
          />
        </FormWrapper>
      </Content>
    </Container>
  );
}
