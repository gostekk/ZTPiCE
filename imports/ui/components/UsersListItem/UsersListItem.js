import React from 'react';

const UsersListItem = ({user}) => {
  console.log(user);
  return (
    <div>
      nameDisplayed: { user.info.nameDisplayed }
    </div>
  );
}

export default UsersListItem;
