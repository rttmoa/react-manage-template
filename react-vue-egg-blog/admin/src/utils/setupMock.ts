/* eslint-disable no-useless-return */








export default (config: { mock?: boolean; setup: () => void }) => {
  const { mock = process.env.NODE_ENV === 'development' } = config;
  // console.log('mock', mock) //true
  if (mock === false) return;
  // setup();
};
