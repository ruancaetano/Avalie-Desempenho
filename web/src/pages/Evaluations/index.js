import React, { useState, useEffect } from 'react';
import AsynSelect from 'react-select/async';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import UsersList from '~/components/UsersList';
import EvaluationCard from '~/components/EvaluationCard';
import Button from '~/components/Button';
import Text from '~/components/Text';
import api from '~/services/api';

import {
  AddNewAppraisers,
  AppraisersWrapper,
  Container,
  Content,
  UsersListWrapper,
  ViewEvaluationContainer,
  ViewEvaluationContent,
  ViewEvaluationCloseButton,
} from './styles';
import Table from './components/Table';

export default function Employees({ location: { pathname }, history }) {
  const [employees, setEmployees] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loadingEvaluations, setLoadingEvaluations] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [viewEvaluation, setViewEvaluation] = useState(false);
  const [newAppraiser, setNewAppraiser] = useState(null);
  const [loadingNewAppraiser, setLoadingNewAppraiser] = useState(false);

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

  async function loadEvaluations(appraisedId) {
    try {
      setLoadingEvaluations(true);
      const response = await api.get(`/evaluations?appraisedId=${appraisedId}`);
      setEvaluations(response.data);
      setLoadingEvaluations(false);
    } catch (error) {
      setLoadingEvaluations(false);
      toast.error(error);
    }
  }

  async function handleOnRemoveAppraiser(evaluationId) {
    try {
      await api.delete(`/evaluations/${evaluationId}`);
      loadEvaluations(selectedEmployee.id);
    } catch (error) {
      toast.error(error);
    }
  }

  function handleOnViewAppraiser(evaluationId) {
    setSelectedEvaluation(
      evaluations.find(evaluation => evaluation.id === evaluationId)
    );
    setViewEvaluation(true);
  }

  /**
   * Function fired when any employee card is clicked
   * @param {object} user
   */
  async function handleOnUserSelect(selectedUser) {
    setSelectedEmployee(selectedUser);
    setNewAppraiser(null);
    loadEvaluations(selectedUser.id);
  }

  async function loadNewAppraisersOptions(inputValue, callback) {
    if (!inputValue) callback([]);

    try {
      const response = await api.get(
        `/appraisers/${selectedEmployee.id}?searchTerm=${inputValue}`
      );
      callback(
        response.data.map(user => ({
          label: `${user.name} <${user.email}>`,
          value: user.id,
        }))
      );
    } catch (error) {
      callback([]);
      toast.error(error);
    }
  }

  async function handleOnSaveNewAppraiser() {
    if (newAppraiser) {
      try {
        setLoadingNewAppraiser(true);
        await api.post('/evaluations', {
          technicalKnowledge: 0,
          teamWork: 0,
          commitment: 0,
          organization: 0,
          proactivity: 0,
          appraiserId: newAppraiser.value,
          appraisedId: selectedEmployee.id,
        });
        setNewAppraiser(null);
        setLoadingNewAppraiser(false);
        loadEvaluations(selectedEmployee.id);
      } catch (error) {
        toast.error(error);
      }
    }
  }

  async function handleOnEvaluationChange(ratings) {
    try {
      await api.put(`/evaluations/${selectedEvaluation.id}`, ratings);
      setViewEvaluation(false);
      loadEvaluations(selectedEmployee.id);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container>
      <Header path={pathname} history={history} />

      <Content>
        <UsersListWrapper>
          <Text>Selecione um funcionário para visualizar avaliações:</Text>
          {loadingEmployees && <Text note>Carregando...</Text>}
          {!loadingEmployees && employees.length < 1 && (
            <Text note>Nenhum funcionário a ser exibido!</Text>
          )}
          {!loadingEmployees && employees.length > 0 && (
            <UsersList users={employees} onUserSelect={handleOnUserSelect} />
          )}
        </UsersListWrapper>

        <AppraisersWrapper>
          {selectedEmployee ? (
            <>
              <Text>
                Adicione novos avaliadores para o funcionário selecionado:
              </Text>
              <AddNewAppraisers>
                <AsynSelect
                  placeholder="Digite o nome do funcionário desejado"
                  noOptionsMessage={() => 'Nenhum funcionário a ser listado'}
                  value={newAppraiser}
                  loadOptions={loadNewAppraisersOptions}
                  onChange={value => setNewAppraiser(value)}
                />
                <Button onClick={handleOnSaveNewAppraiser}>
                  {loadingNewAppraiser ? 'Salvando...' : 'Salvar'}
                </Button>
              </AddNewAppraisers>

              {loadingEvaluations && <Text>Carregando avaliadores...</Text>}
              {!loadingEvaluations && evaluations.length < 1 && (
                <Text>Nenhum avaliador encontrado.</Text>
              )}
              {!loadingEvaluations && evaluations.length > 0 && (
                <>
                  <Text>Avaliadores do funcionário selecionado:</Text>
                  <Table
                    rows={evaluations}
                    onRemoveAppraiser={handleOnRemoveAppraiser}
                    onViewAppraiser={handleOnViewAppraiser}
                  />
                </>
              )}
            </>
          ) : (
            <Text>Nenhum funcionário selecionado.</Text>
          )}
        </AppraisersWrapper>
      </Content>

      {viewEvaluation && (
        <ViewEvaluationContainer>
          <ViewEvaluationCloseButton
            onClick={() => {
              setViewEvaluation(false);
              loadEvaluations(selectedEmployee.id);
            }}
          />
          <ViewEvaluationContent>
            <EvaluationCard
              evaluation={selectedEvaluation}
              onUpdate={handleOnEvaluationChange}
            />
          </ViewEvaluationContent>
        </ViewEvaluationContainer>
      )}
    </Container>
  );
}
