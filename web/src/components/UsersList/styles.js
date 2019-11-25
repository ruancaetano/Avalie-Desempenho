import styled from 'styled-components';

export const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: 5px 10px;
  margin: 0;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 120px;
  border: 1px solid #dedee0;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background: ${({ selected }) =>
    selected ? 'rgba(51, 181, 229, 0.1)' : '#fff'};
  :hover {
    transform: translateY(-3px);
  }
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const CardTexts = styled.div`
  padding: 0 10px;
`;

export const CardTitle = styled.p`
  font-weight: bold;
  color: #5ccbc7;
  padding: 0;
  margin: 0;
`;

export const CardText = styled.p`
  margin: 0;
  padding: 0;
  color: #5e5e5d;
  font-size: 16px;
`;
