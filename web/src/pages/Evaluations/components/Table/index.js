import React from 'react';

import {
  Container,
  Table,
  TBody,
  THead,
  TH,
  TR,
  TD,
  TableIcons,
  ViewIcon,
  DeleteIcon,
} from './styles';

export default function components({
  columns,
  rows,
  onViewAppraiser,
  onRemoveAppraiser,
}) {
  return (
    <Container>
      <Table>
        <THead>
          <TR>
            <TH>Nome</TH>
            <TH>E-mail</TH>
            <TH>Cargo</TH>
            <TH>Avaliado?</TH>
            <TH>Ações</TH>
          </TR>
        </THead>
        <TBody>
          {rows &&
            rows.map(row => (
              <TR key={row.id}>
                <TD>{row.appraiser.name}</TD>
                <TD>{row.appraiser.email}</TD>
                <TD>{row.appraiser.office}</TD>
                <TD>{row.wasEvaluationPerformed ? 'Sim' : 'Não'}</TD>
                <TD>
                  <TableIcons>
                    <ViewIcon onClick={() => onViewAppraiser(row.id)} />
                    <DeleteIcon onClick={() => onRemoveAppraiser(row.id)} />
                  </TableIcons>
                </TD>
              </TR>
            ))}
        </TBody>
      </Table>
    </Container>
  );
}
