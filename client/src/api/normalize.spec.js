import { denormalize, normalize } from './normalize';

const testNormalize = (type, values) => {
  describe(type, () => {
    it('denormalize', () => {
      expect(denormalize(type, values)).toMatchSnapshot();
    });

    it('normalize', async () => {
      return (normalize(type, denormalize(type, values)))
        .then(res => expect(res).toMatchSnapshot());
    });
  });
};

describe('normalize', () => {
  testNormalize('categories', {
    id: 11,
    name: 'Category 11',
  });

  testNormalize('posts', {
    id: 1,
    title: 'Title 1',
    body: 'Body 1',
    category: {
      id: 11,
      name: 'Category 11',
    },
  });
});
