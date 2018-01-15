import React from 'react';

import MaterialsList from '../../components/MaterialsList/MaterialsList';

const Didactics = (props) => {
  return (
    <div>
      { Meteor.userId()
        ? <button onClick={() => props.history.push('/didactics/add')}>Add</button>
        : undefined }
      <MaterialsList {...props}/>
    </div>
  );
}

export default Didactics;
