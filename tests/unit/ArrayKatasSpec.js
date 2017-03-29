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
