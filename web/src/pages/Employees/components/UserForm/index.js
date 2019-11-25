import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Buttons, Container, Form, Title } from './styles';
import Button from '~/components/Button';
import Input from '~/components/Input';

export default function UserForm({
  onSubmit,
  userToEdit,
  onCancelButton,
  onDelete,
}) {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string()
      .email()
      .required('Digite um e-mail válido'),
    password: Yup.string().min(
      6,
      'Sua senha precisa ter pelo menos 6 caracteres'
    ),
    office: Yup.string().required('O campo cargo é obrigatório'),
  });

  const updateSchema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string()
      .email()
      .required('Digite um e-mail válido'),
    office: Yup.string().required('O campo cargo é obrigatório'),
  });

  const formInitialValues = userToEdit
    ? {
        name: userToEdit.name,
        email: userToEdit.email,
        password: '',
        office: userToEdit.office,
      }
    : { name: '', email: '', password: '', office: '' };
  return (
    <Container>
      <Title>Cadastro de funcionários</Title>
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={userToEdit ? updateSchema : registerSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          resetForm,
          setSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              label="Digite o nome do funcionário"
              placeholder="Nome"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name && errors.name}
            />
            <Input
              label="Digite o e-mail do funcionário"
              placeholder="E-mail"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
            />
            {!userToEdit && (
              <Input
                label="Digite uma senha para conta funcionário"
                placeholder="Senha"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
            )}

            <Input
              label="Digite o cargo do funcionário"
              placeholder="Cargo"
              type="text"
              name="office"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.office}
              error={touched.office && errors.office}
            />

            <Buttons>
              {userToEdit && (
                <Button
                  light
                  type="button"
                  disabled={isSubmitting}
                  onClick={onCancelButton}
                >
                  Cancelar
                </Button>
              )}

              {userToEdit && (
                <Button
                  danger
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    onDelete(setSubmitting, resetForm);
                  }}
                >
                  {isSubmitting ? 'Carregando...' : 'Deletar'}
                </Button>
              )}

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Carregando...' : 'Salvar'}
              </Button>
            </Buttons>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
