/* eslint-disable react/prop-types */
import { useNavigation } from 'react-router-dom';

const MainBtn = ({ formBtn, defaultBtn, defaultBtnLabel }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  if (defaultBtn) {
    return (
      <button type='button' className='btn btn-block'>
        {defaultBtnLabel}
      </button>
    );
  }

  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn ? 'form-btn' : ''}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting...' : 'submit'}
    </button>
  );
};
export default MainBtn;
