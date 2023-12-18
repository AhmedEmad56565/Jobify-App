import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, MainBtn } from '../components';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>

        <FormRow type='email' name='email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />

        <MainBtn />
        <MainBtn defaultBtn defaultBtnLabel='explore the app' />

        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
