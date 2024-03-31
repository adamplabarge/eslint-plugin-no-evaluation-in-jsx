# eslint-no-complex-evaluation-in-jsx

Experimental, use with caution.

Disallow multiple Logical Expressions in JSXExpressionContainer.

To use this rule, you need to have ESLint installed in your project. You can then configure ESLint to enable the "no-complex-evaluation-in-jsx" rule and customize its options according to your needs.

For more details, please refer to the rule.test.js file.

Currently only accounts for && and || Logical Expressions. ! is ignored.

```javascript
// DISALLOWED
const Component = () => {
  const a = true
  const b = true

  return (
    <div>
      {
        // complex evaluation in JSX
        a && b && <div />
      }
    </div>
  )
}
```

```javascript
// ALLOWED
const Component = () => {
  const a = true
  const b = true
  const c = a && b

  return (
    <div>
      {
        // simple evaluation in JSX
        c && <div />
      }
    </div>
  )
}
```

To use plugin:

```
yarn add -D eslint-plugin-no-complex-evaluation-in-jsx
```

configure in .eslintrc.json

```json
{
"plugins": [ 
	"no-complex-evaluation-in-jsx"
  ],
"rules": {
	"no-complex-evaluation-in-jsx/no-complex-evaluation-in-jsx": ["error"]
  }
}
```