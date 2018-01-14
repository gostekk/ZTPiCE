import React from 'react';

import ThingAdd from '../../components/ThingAdd/ThingAdd';
import ThingsList from '../../components/ThingsList/ThingsList';

const Stock = (props) => {
  return (
    <div>
      Stock
      <ThingAdd />
      <ThingsList {...props} />
    </div>
  );
}

export default Stock;
