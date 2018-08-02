const TestRunner = require('test-runner');
const a = require('assert');
const mock = require('mock-fs');
const runner = new TestRunner();

runner.test('getByEnv', t => {
  let config = require('../lib/painless-config');

  process.env.envkey1 = 'envvalue1';
  a.strictEqual(config.get('envkey1'), 'envvalue1');
  teardown();
});

runner.test('getByJson', t => {
  let config = require('../lib/painless-config');

  mock({
    './env.json': '{"jsonkey1": "jsonvalue1"}'
  });

  a.strictEqual(config.get('jsonkey1'), 'jsonvalue1');
  teardown();
});

runner.test('getByYaml', t => {
  let config = require('../lib/painless-config');

  mock({
    './env.yaml': 'yamlkey1: yamlvalue1'
  });

  a.strictEqual(config.get('yamlkey1'), 'yamlvalue1');
  teardown();
});

function teardown() {
  mock.restore();
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key];
  });
}
