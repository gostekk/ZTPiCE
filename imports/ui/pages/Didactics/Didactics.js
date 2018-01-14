import React from 'react';

import MaterialAdd from '../../components/MaterialAdd/MaterialAdd';
import MaterialEdit from '../../components/MaterialEdit/MaterialEdit';
import MaterialsList from '../../components/MaterialsList/MaterialsList';

const Didactics = (props) => {
  return (
    <div>
      <MaterialAdd />
      <MaterialEdit />
      <MaterialsList />
    </div>
  );
}

export default Didactics;
