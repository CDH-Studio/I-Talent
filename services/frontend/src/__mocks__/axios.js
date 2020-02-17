class AxiosMocker {
  constructor() {}

  get = jest.fn(async url => ({}));

  put = jest.fn(async (url, data) => {});
}

const axiosMocker = new AxiosMocker();

export default axiosMocker;
