import styled from 'styled-components';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

export const Container = styled.div``;
export const Content = styled.div`
  width: 800px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

export const PreviousButton = styled(MdChevronLeft)`
  font-size: 3rem;
  color: #5e5e5d;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const NextButton = styled(MdChevronRight)`
  font-size: 3rem;
  color: #5e5e5d;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const CardWrapper = styled.div`
  flex: 3;
`;

export const Message = styled.h2`
  flex: 1;
  text-align: center;
  color: #5e5e5d;
`;

export const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
