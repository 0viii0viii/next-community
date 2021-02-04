import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Gunner</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
