import { Helmet } from 'react-helmet-async';

import ParameterView from 'src/sections/parameter/view/parameter-view';

// ----------------------------------------------------------------------

export default function ParameterPage() {
  return (
    <>
      <Helmet>
        <title> Parameter </title>
      </Helmet>

      <ParameterView />
    </>
  );
}
