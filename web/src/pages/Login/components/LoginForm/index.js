import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { Form } from './styles';

export default function LoginForm({ onSubmit }) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Digite um e-mail válido'),
    password: Yup.string()
      .min(6, 'Sua senha precisa ter pelo menos 6 caracteres')
      .required('O campo senha é obrigatório'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Digite seu e-mail"
            placeholder="E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />

          <Input
            type="password"
            name="password"
            label="Digite sua senha"
            placeholder="Senha"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
          />

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
