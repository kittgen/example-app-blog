import { request } from 'express';
import { ValueMapper } from './mapper/value.mapper';
import { AbstractParameterMapper, ParameterMapper } from './mapper/parameter-mapper.interface';
import { AbstractQueryMapper } from './query-mapper.interface';
import { ValueListMapper } from './mapper/value-list.mapper';

describe('QueryMapper', () => {
  class TestMapper extends AbstractQueryMapper { }
  const query = {
    foo: "bar",
    id: {
      0: 1,
      1: 2,
      lt: 10
    },
    views: [
      1,
      {
        lt: 10
      }
    ],
    order: {
      publishedAt: "desc",
      views: "asc"
    }
  }

  /**
 * TODO
 * Value Mapper: single ✔️, list ✔️  // DB output options partial, start, end
 * DateFilter before, after (equals day,hour,min)
 * Boolean filter 
 * Numeric filter lt,lte,gt,gte
 * exists filter 
 * order filter
 * paging filter
 * nested filter
 */

  it('value mapper should return value', () => {
    const mapper = new TestMapper([
      new ValueMapper('foo')
    ])

    const result = mapper.map(query)

    expect(result).toHaveProperty('foo', 'bar')
  });

  it('value mapper should return nothing if no value', () => {
    const mapper = new TestMapper([
      new ValueMapper('baz')
    ])

    const result = mapper.map(query)

    expect(result).not.toHaveProperty('baz')
  });

  it('value mapper should return first value of object/array', () => {
    const mapper = new TestMapper([
      new ValueMapper('id'),
      new ValueMapper('views')
    ])

    const result = mapper.map(query)

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('views', 1)
  });

  it('value list mapper should return all values with numeric keys', () => {
    const mapper = new TestMapper([
      new ValueListMapper('id')
    ])

    const result = mapper.map(query)

    expect(result).toHaveProperty('id', [1, 2])
  });

  it('value list mapper should return array for single value', () => {
    const mapper = new TestMapper([
      new ValueListMapper('foo')
    ])

    const result = mapper.map(query)

    expect(result).toHaveProperty('foo', ['bar'])
  });






});
