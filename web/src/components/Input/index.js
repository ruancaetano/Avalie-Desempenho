import React from 'react';

import { Container, Error, Label, StyledInput } from './styles';

export default function Input({ label, error, ...props }) {
  return (
    <Container>
      {label && <Label error={error}>{label}</Label>}
      <StyledInput error={error} {...props} />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
