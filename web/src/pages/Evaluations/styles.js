import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Container = styled.div``;

export const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const AppraisersWrapper = styled.div`
  margin: 0 20px;
  flex: 2;
`;

export const UsersListWrapper = styled.div`
  margin: 0 20px;
  flex: 1;
`;

export const AddNewAppraisers = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  grid-gap: 5px;
`;



export const ViewEvaluationCloseButton = styled(MdClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 25px;
  color: #fff;
  cursor: pointer;
`;

export const ViewEvaluationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  height: 100%;
`;

export const ViewEvaluationContent = styled.div`
  width: 500px;
  max-width: 80%;
  margin-top: 50px;
`;
