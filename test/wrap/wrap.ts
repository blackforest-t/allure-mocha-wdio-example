import { log } from '../config/log4js.config';
import * as assert from 'assert';
import allureReporter from '@wdio/allure-reporter';

const debug: any = (msg: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const original = propertyDescriptor.value;
    propertyDescriptor.value = function (...args) {
      log.debug(msg);
      return original.call(this, ...args);
    };

    return propertyDescriptor;
  };
};

class Test {
  @debug('[[ Start test suite ]]')
  spec(msg: string, executeBlock: any) {
    return describe(msg, () => {
      log.debug(`Start spec -> ${msg}`);
      executeBlock();
      after(() => {
        log.debug(`End spec -> ${msg}`);
      });
    });
  }

  case(msg: string, executeBlock: any) {
    return it(msg, () => {
      allureReporter.addStep(`|-[case]: ${msg}`);
      allureReporter.addSeverity('minor');
      try {
        log.debug(`  Start case -> ${msg}`);
        return executeBlock();
      } finally {
        log.debug(`  End case -> ${msg}`);
      }
    });
  }

  step(msg: string, executeBlock) {
    allureReporter.addStep(`|--[step]: ${msg}`);
    try {
      log.debug(`    Start step -> ${msg}`);
      return executeBlock();
    } finally {
      log.debug(`    End step -> ${msg}`);
    }
  }

  equal(msg: string, actual: any, expected: any) {
    allureReporter.addStep(`|----[assert]: ${msg}`);
    log.debug(`      Assert [${msg}]`);
    let result;

    try {
      result = `[PASS] - ${actual} == ${expected}`;
      assert.equal(actual, expected);
    } catch (e) {
      result = `[FAIL] - ${actual} !== ${expected}`;
    }
    const assertResultMsg = `      Assert_result [${msg}] - ${result}`;
    if (result.includes('FAIL')) {
      log.fatal(assertResultMsg);
    } else {
      log.debug(assertResultMsg);
    }

    return assert.equal(actual, expected);
  }
}

export default new Test();
