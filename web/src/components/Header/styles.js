import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  background: #fff;
  border-bottom: 3px solid #dedee0;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  height: 60px;
`;

export const Items = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: inline;
  height: 100%;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  color: #757575;
  border-bottom: ${({ selected }) => (selected ? '2px' : 0)} solid #5ccbc7;
  font-size: 17px;
`;

export const ItemLink = styled(Link)`
  color: #757575;
  text-decoration: none;
`;
