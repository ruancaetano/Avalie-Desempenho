import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import EvaluationCard from '~/components/EvaluationCard';
import authConfig from '~/config/auth';

import {
  ButtonWrapper,
  CardWrapper,
  Content,
  Container,
  NextButton,
  PreviousButton,
  Message,
} from './styles';
import Text from '~/components/Text';
import api from '~/services/api';
import { toast } from 'react-toastify';

export default function Evaluate({ location: { pathname }, history }) {
  const [evaluations, setEvaluations] = useState([]);
  const [evaluationIndex, setEvaluationsIndex] = useState(0);
  const [loadingEvaluations, setLoadingEvaluations] = useState(true);

  async function loadEvaluations() {
    const appraiserId = localStorage.getItem(authConfig.ID_KEY);
    try {
      setLoadingEvaluations(true);
      const response = await api.get(`/evaluations?appraiserId=${appraiserId}`);
      const filteredEvaluations = response.data.filter(
        evaluation => !evaluation.wasEvaluationPerformed
      );
      setEvaluations(filteredEvaluations);
      setLoadingEvaluations(false);
    } catch (error) {
      setLoadingEvaluations(false);
      toast.error(error);
    }
  }

  useEffect(() => {
    loadEvaluations();
  }, []);

  function handleOnNextClick() {
    const newIndex = evaluationIndex + 1;
    setEvaluationsIndex(
      newIndex < evaluations.length ? newIndex : evaluations.length - 1
    );
  }

  function handleOnPreviousClick() {
    const newIndex = evaluationIndex - 1;
    setEvaluationsIndex(newIndex >= 0 ? newIndex : 0);
  }

  async function handleOnEvaluationChange(ratings) {
    try {
      await api.put(`/evaluations/${evaluations[evaluationIndex].id}`, ratings);
      loadEvaluations();
      setEvaluationsIndex(0);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container>
      <Header path={pathname} history={history} />

      <Text center>Avalie seus colegas de trabalho com estrelas</Text>
      <Content>
        {loadingEvaluations && <Message>Carregando avaliações...</Message>}

        {!loadingEvaluations && evaluations.length < 1 && (
          <Message>Nenhuma avaliação a ser feita!</Message>
        )}

        {!loadingEvaluations && evaluations.length > 0 && (
          <>
            <ButtonWrapper>
              {evaluationIndex !== 0 && (
                <PreviousButton
                  onClick={handleOnPreviousClick}
                  disabled={evaluationIndex === 0}
                />
              )}
            </ButtonWrapper>

            <CardWrapper>
              <EvaluationCard
                evaluation={evaluations[evaluationIndex]}
                onUpdate={handleOnEvaluationChange}
              />
            </CardWrapper>
            <ButtonWrapper>
              {evaluationIndex !== evaluations.length - 1 && (
                <NextButton
                  onClick={handleOnNextClick}
                  disabled={evaluationIndex === evaluations.length - 1}
                />
              )}
            </ButtonWrapper>
          </>
        )}
      </Content>
    </Container>
  );
}
