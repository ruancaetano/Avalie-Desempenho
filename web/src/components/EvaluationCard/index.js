import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { MdStar } from 'react-icons/md';

import avatar from '~/assets/avatar.jpg';

import {
  CardAvatar,
  CardText,
  CardTitle,
  Container,
  Evaluation,
  Label,
} from './styles';
import Button from '../Button';

export default function EvaluationCard({ evaluation, onUpdate }) {
  const [ratings, setRatings] = useState({
    technicalKnowledge: 0,
    teamWork: 0,
    commitment: 0,
    organization: 0,
    proactivity: 0,
  });

  useEffect(() => {
    if (evaluation) {
      const {
        technicalKnowledge,
        teamWork,
        commitment,
        organization,
        proactivity,
      } = evaluation;
      setRatings({
        technicalKnowledge,
        teamWork,
        commitment,
        organization,
        proactivity,
      });
    }
  }, [evaluation]);

  /**
   * Render rating stars
   * @param {number} index
   * @param {number} value
   */
  function renderStarIcon(index, value) {
    return <MdStar size={20} color={index <= value ? '#ffb400' : '#d4d4d4'} />;
  }

  /**
   * Saves user-selected value in star rating for each type
   * @param {number} nextValue
   * @param {number} prevValue
   * @param {string} name
   */
  function handleStartClick(nextValue, prevValue, name) {
    const newRatings = {
      ...ratings,
      [name]: nextValue,
    };
    setRatings(newRatings);
  }

  return (
    <Container>
      {evaluation && evaluation.appraised && (
        <>
          <CardAvatar src={avatar} />
          <CardTitle>{evaluation.appraised.name}</CardTitle>
          <CardText>{evaluation.appraised.office}</CardText>
          <br />
        </>
      )}

      <Evaluation>
        <Label>Conhecimento técnico:</Label>
        <StarRatingComponent
          name="technicalKnowledge"
          value={ratings.technicalKnowledge}
          onStarClick={handleStartClick}
          renderStarIcon={renderStarIcon}
        />
      </Evaluation>

      <Evaluation>
        <Label>Trabalho em equipe:</Label>
        <StarRatingComponent
          name="teamWork"
          value={ratings.teamWork}
          onStarClick={handleStartClick}
          renderStarIcon={renderStarIcon}
        />
      </Evaluation>

      <Evaluation>
        <Label>Compromisso com resultados:</Label>
        <StarRatingComponent
          name="commitment"
          value={ratings.commitment}
          onStarClick={handleStartClick}
          renderStarIcon={renderStarIcon}
        />
      </Evaluation>

      <Evaluation>
        <Label>Organização:</Label>
        <StarRatingComponent
          name="organization"
          value={ratings.organization}
          onStarClick={handleStartClick}
          renderStarIcon={renderStarIcon}
        />
      </Evaluation>

      <Evaluation>
        <Label>Proatividade:</Label>
        <StarRatingComponent
          name="proactivity"
          value={ratings.proactivity}
          onStarClick={handleStartClick}
          renderStarIcon={renderStarIcon}
        />
      </Evaluation>

      <Button onClick={() => onUpdate(ratings)}>Salvar</Button>
    </Container>
  );
}
