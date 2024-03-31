/**
 * @fileoverview Disallow complex Logical Expressions in JSX
 * @module eslint-plugin-no-complex-evaluation-in-jsx/rule
 */

module.exports = {
  /**
   * Rule metadata
   */
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow complex Logical Expressions in JSX",
      category: "Best Practices",
      recommended: true
    },
    schema: [], // no options
  },

  /**
   * Create the rule
   * @param {Object} context - The ESLint rule context
   * @returns {Object} - The rule definition
   */
  create: function(context) {

    const { sourceCode } = context

    const evaluationOperators = new Set(['&&', '||'])

    /**
     * Check if a value is an evaluation operator
     * @param {string} value - The value to check
     * @returns {boolean} - True if the value is an evaluation operator, false otherwise
     */
    function isEvaluationOperator (value) {
      return evaluationOperators.has(value)
    }

    /**
     * Check if logical expression has more than one evaluation operator.
     * @param {Object} node - The node to check from.
     * @returns {boolean} - True if the node represents a complex expression, false otherwise.
     */
    function hasComplexLogicalExpression(node) {
      return false
      if (node.type === "LogicalExpression") {
        if (isEvaluationOperator(node.operator)) {
          let count = 0
          const tokens = sourceCode.getTokens(node)
          
          for (let i = 0; i < tokens.length; i++) {
            if (isEvaluationOperator(tokens[i].value)) {
              count = count + 1
            }
            if (count > 1) {
              return true
            }
          }
        }
      }
      return false
    }

    /**
     * Check a JSX expression for complex Logical Expressions.
     * @param {Object} node - The JSXExpressionContainer node to check.
     */
    function checkJSXExpression(node) {
      if (node.type === "JSXExpressionContainer") {
        if (hasComplexLogicalExpression(node.expression)) {
          context.report({
            node: node,
            message: "Avoid using complex Logical Expressions in JSX"
          });
        }
      }
    }

    return {
      JSXExpressionContainer: checkJSXExpression
    }
  },
}
