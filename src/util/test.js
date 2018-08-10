import test from 'ava';
import { camelize } from './';

const CAMEL = 'SomeNameValue';
let camelizeMacro = (t, input) => t.is(camelize(input), CAMEL);
camelizeMacro.title = title => `camelize ${title}`;
test('kebab case', camelizeMacro, 'some-name-value');
test('already upper camelcase', camelizeMacro, 'SomeNameValue');
test('lower camelcase', camelizeMacro, 'someNameValue');
