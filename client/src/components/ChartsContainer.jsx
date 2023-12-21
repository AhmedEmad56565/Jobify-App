/* eslint-disable react/prop-types */
import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  function handleBarChange() {
    setBarChart((prevState) => !prevState);
  }

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={handleBarChange}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
