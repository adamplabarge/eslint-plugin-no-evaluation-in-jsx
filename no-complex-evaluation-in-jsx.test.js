/**
 * @fileoverview Tests for the "no-complex-evaluations-in-jsx" rule.
 */

const { RuleTester } = require('eslint');
const rule = require('./no-complex-evaluation-in-jsx.js');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

/**
 * Run tests for the "no-complex-evaluations-in-jsx" rule.
 */
ruleTester.run('no-complex-evaluations-in-jsx', rule, {
  
  valid: [
    {
      code: `<div>{(a && b)}</div>`,
    },
    {
      code: `<div>{(a || b)}</div>`,
    },
    {
      code: '<div>{(! a && b)}</div>',
    },
    {
      code: `const Component = () => {
        const a = 0 || ( 0 || 1 )
        return (<div>{a}</div>)
      }`
    },
    {
      code: `const a = 0 || ( 0 || 1 )`
    }
  ],

  invalid: [
    {
      code: `<div>{(a && b && c)}</div>`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    },
    {
      code: `<div>{(a && b) || c}</div>`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    },
    {
      code: `<div>{(a || b || c)}</div>`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    },
    {
      code: `const Component = () => <div>{(a || b || c)}</div>`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    },
    {
      code: `const Component = () => {
        return (<div>{(a || b || c)}</div>)
      }`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    },
    {
      code: `const Component = () => {
        const a = true
        const b = true
        const c = []

        const SubComponent = () => {
          return (<div></div>)
        }

        return (
          <div>
            {
              a || b && c.length && <SubComponent />
            }
          </div>
        )
      }`,
      errors: [{
        message: `Avoid using complex evaluation expressions in JSX`,
        type: `JSXExpressionContainer`
      }]
    }
  ]
});

console.log(`All tests passed!`)