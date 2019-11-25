import styled from 'styled-components';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';

export const Container = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;
export const THead = styled.thead``;
export const TBody = styled.thead``;

export const TH = styled.th`
  background-color: #ddefef;
  border: solid 1px #ddefef;
  color: #336b6b;
  padding: 10px;
  text-align: left;
  text-shadow: 1px 1px 1px #fff;
`;

export const TR = styled.tr``;
export const TD = styled.td`
  border: solid 1px #ddeeee;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
`;

export const TableIcons = styled.div`
  text-align: center;
`;

export const DeleteIcon = styled(MdDelete)`
  color: #ff0000;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

export const ViewIcon = styled(MdRemoveRedEye)`
  color: #5ccbc7;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  :hover {
    opacity: 0.5;
  }
`;
