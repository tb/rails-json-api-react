import { omit } from 'lodash';
import { Deserializer, Serializer } from 'jsonapi-serializer';

const serializers = {
  categories: {
    serializer: new Serializer('categories', {
      attributes: [
        'name',
      ],
    }),
    deserializer: new Deserializer({}),
  },

  posts: {
    serializer: new Serializer('posts', {
      attributes: [
        'title',
        'body',
        'category',
      ],
      category: {
        ref: 'id',
        included: false,
        attributes: ['name'],
      }
    }),
    deserializer: new Deserializer({
      categories: {
        valueForRelationship: (relationship) => ({
          id: relationship.id,
          name: relationship.name,
        }),
      }
    }),
  },
};

export const normalize = (type, data) => serializers[type].deserializer.deserialize(data);

export const normalizeEach = (items = []) => items.map(item => serializers[item.type].deserializer.deserialize({data: item}));

export const denormalize = (type, data) => {
  const res = serializers[type].serializer.serialize(data);
  return data.id ? res : omit(res, 'data.id');
};
