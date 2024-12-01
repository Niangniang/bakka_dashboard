import { Helmet } from 'react-helmet-async';
import { Signup } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <Signup />
    </>
  );
}
