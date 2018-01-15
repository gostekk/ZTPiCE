import React from 'react';

import MaterialsList from '../../components/MaterialsList/MaterialsList';

const Didactics = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push('/didactics/add')}>Add</button>
      <MaterialsList {...props}/>
    </div>
  );
}

export default Didactics;
