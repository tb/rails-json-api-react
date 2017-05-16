import { omit } from 'lodash';
import { Deserializer, Serializer } from 'jsonapi-serializer';

const serializers = {
  categories: {
    serializer: new Serializer('categories', {
      keyForAttribute: 'camelCase',
      attributes: [
        'name',
      ],
    }),
    deserializer: new Deserializer({
      keyForAttribute: 'camelCase',
    }),
  },

  posts: {
    serializer: new Serializer('posts', {
      keyForAttribute: 'camelCase',
      attributes: [
        'title',
        'body',
        'category',
        'parts',
      ],
      category: {
        ref: 'id',
        included: false,
        attributes: ['name'],
      },
    }),
    deserializer: new Deserializer({
      keyForAttribute: 'camelCase',
      categories: {
        valueForRelationship: relationship => ({
          id: relationship.id,
          name: relationship.name,
        }),
      },
    }),
  },

  users: {
    serializer: new Serializer('users', {
      keyForAttribute: 'camelCase',
      attributes: [
        'email',
        'roles',
      ],
    }),
    deserializer: new Deserializer({
      keyForAttribute: 'camelCase',
      roles: {
        valueForRelationship: relationship => ({
          id: relationship.id,
        }),
      },
    }),
  },

  roles: {
    serializer: new Serializer('roles', {
      keyForAttribute: 'camelCase',
      attributes: [
        'name',
      ],
    }),
    deserializer: new Deserializer({
      keyForAttribute: 'camelCase',
    }),
  },

  orders: {
    serializer: new Serializer('orders', {
      keyForAttribute: 'camelCase',
      attributes: [
        'orderDate',
        'requiredDate',
        'shippedDate',
        'shipVia',
        'freight',
        'shipName',
        'shipAddress',
        'shipCity',
        'shipRegion',
        'shipPostalCode',
        'shipCountry',
      ],
    }),
    deserializer: new Deserializer({
      keyForAttribute: 'camelCase',
    }),
  },
};

export const normalize = (type, data) => {
  if (!serializers[type]) {
    console.error(`No serializer for ${type}`);
  }

  return serializers[type].deserializer.deserialize(data);
};

export const denormalize = (type, data) => {
  const res = serializers[type].serializer.serialize(data);
  return data.id ? res : omit(res, 'data.id');
};
