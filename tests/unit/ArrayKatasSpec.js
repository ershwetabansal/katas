describe('`Array.from` converts an array-like object or list into an Array', () => {

  const arrayLike = {0: 'one', 1: 'two', length: 2};

  it('call `Array.from` with an array-like object', function() {
    const arr = Array.from(arrayLike);

    expect(arr).toEqual(['one', 'two']);
  });

  it('a DOM node`s classList object can be converted', function() {
    document.body.classList.add('some');
    document.body.classList.add('other');
    const classList = Array.from(document.body.classList);

    expect(''+classList).toEqual(''+['some', 'other']);
  });

  it('convert a NodeList to an Array and `filter()` works on it', function() {
    const nodeList = Array.from(document.querySelectorAll('body'));
    const bodies = nodeList.filter((node) => node === document.body);

    expect(bodies).toEqual([document.body]);
  });

  describe('custom conversion using a map function as second param', () => {
    it('we can modify the value before putting it in the array', function() {
      const arr = Array.from(arrayLike, (value) => value.toUpperCase());
      expect(arr).toBe(['ONE', 'TWO']);
    });

    it('and we also get the object`s key as second parameter', function() {
      const arr = Array.from(arrayLike, (value, key) => `${key}=${value}`);
      expect(arr).toBe(['0=one', '1=two']);
    });
  });

});

describe('`Array.of` creates an array with the given arguments as elements', () => {

  it('dont mix it up with `Array(10)`, where the argument is the array length', () => {
    const arr = Array.of(10);

    expect(arr).toBe([10]);
  });

  it('puts all arguments into array elements', () => {
    const arr = Array.of(1,2);

    expect(arr).toBe([1, 2]);
  });

  it('takes any kind and number of arguments', () => {
    const starter = [1, 2];
    const end = [3, '4'];
    const arr = Array.of(starter, ...end);

    expect(arr).toBe([[1, 2], 3, '4']);
  });

});


describe('`Array.prototype.fill` can fill up an array with one value', () => {

  it('`fill(0)` will populate `0` into each array element', function() {
    const arr = new Array(3).fill(0);

    expect(arr).toBe([0, 0, 0]);
  });

  it('fill only changes content, adds no new elements', function() {
    const arr = [].fill();

    expect(arr).toBe([]);
  });

  it('second parameter to `fill()` is the position where to start filling', function() {
    const fillPosition = 2;
    const arr = [1,2,3].fill(42, fillPosition);

    expect(arr).toBe([1, 2, 42]);
  });

  it('third parameter is the position where filling stops', function() {
    const fillStartAt = 1;
    const fillEndAt = 2;
    const arr = [1,2,3].fill(42, fillStartAt, fillEndAt);

    expect(arr).toBe([1, 42, 3]);
  });

});

// 42: array - `Array.prototype.keys`
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Array.prototype.keys` returns an iterator for all keys in the array', () => {

  it('`keys()` returns an iterator', function() {
    const arr = ['a'];
    const iterator = arr.keys();

    assert.deepEqual(iterator.next(), {value: 0, done: false});
    assert.deepEqual(iterator.next(), {value: void 0, done: true});
  });

  it('gets all keys', function() {
    const arr = [1, 2, 3];
    const keys = Array.from(arr.keys());

    assert.deepEqual(keys, [0, 1, 2]);
  });

  it('empty array contains no keys', function() {
    const arr = [];
    const keys = [...arr.keys()];

    assert.equal(keys.length, 0);
  });

  it('a sparse array without real values has keys though', function() {
    const arr = [,,];
    const keys = [...arr.keys()];

    assert.deepEqual(keys, [0, 1]);
  });

  it('also includes holes in sparse arrays', function() {
    const arr = ['a', , 'c'];
    const keys = [...arr.keys()];

    assert.deepEqual(keys, [0, 1, 2]);
  });
});
