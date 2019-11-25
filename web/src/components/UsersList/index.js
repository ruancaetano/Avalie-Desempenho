import React, { useState } from 'react';

import avatar from '~/assets/avatar.jpg';

import {
  Avatar,
  CardText,
  CardTexts,
  CardTitle,
  UserCard,
  List,
} from './styles';

export default function UsersList({ onUserSelect, users }) {
  const [selected, setSelected] = useState(null);

  return (
    <List>
      {users.map(user => (
        <UserCard
          selected={selected === user.id}
          key={user.id}
          onClick={() => {
            setSelected(user.id);
            onUserSelect(user);
          }}
        >
          <Avatar src={avatar} />
          <CardTexts>
            <CardTitle>{user.name}</CardTitle>
            <CardText>{user.email}</CardText>
            <CardText>{user.office}</CardText>
          </CardTexts>
        </UserCard>
      ))}
    </List>
  );
}
