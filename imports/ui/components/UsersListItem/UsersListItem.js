import React from 'react';

const UsersListItem = ({user}) => {
  return (
    <div>
      nameDisplayed: { user.info.nameDisplayed }
    </div>
  );
}

export default UsersListItem;
