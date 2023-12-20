import { useContext } from 'react';
import AllJobsContext from '../context/allJobsContext';

export const useAllJobsContext = () => useContext(AllJobsContext);
