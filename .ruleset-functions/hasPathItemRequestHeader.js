import { createRulesetFunction } from "@stoplight/spectral-core";

const verboseLogging = false; // This should only be true when debugging locally and false otherwise

/**
 * This function verifies that PathItem request parameters should contain one instance of the functionOptions defined 'name' request header.
 */
export default createRulesetFunction(
  {
    input: null,
    options: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string"
        },
      },
      required: ["name"]
    }
  },
  function hasPathItemRequestHeader(input, options, { path, document, documentInventory, rule }) {
    if (verboseLogging === true) console.log(`\n[hasPathItemRequestHeader]\n  input=${JSON.stringify(input)},\n  options=${JSON.stringify(options)},\n  path=${JSON.stringify(path)},\n  rule=${rule.name}`);

    const targetRequestHeaderName = options.name;
    if (verboseLogging === true) console.log(`[hasPathItemRequestHeader] targetRequestHeaderName=${targetRequestHeaderName}`);

    const headerParameterList = input.filter(parameter => parameter.in === 'header');
    const mappedHeaderParameterNames = headerParameterList.map(parameter => parameter.name);
    if (verboseLogging === true) console.log(`[hasPathItemRequestHeader] ${mappedHeaderParameterNames.length} mappedHeaderParameterNames=${mappedHeaderParameterNames}`);

    let hasTargetRequestHeader = false;
    const targetRequestHeaderCount = mappedHeaderParameterNames.filter(name => name === targetRequestHeaderName).length;
    if (targetRequestHeaderCount === 1) {
      hasTargetRequestHeader = true;
    }
    if (verboseLogging === true) console.log(`[hasPathItemRequestHeader] targetRequestHeaderCount=${targetRequestHeaderCount}, hasTargetRequestHeader=${hasTargetRequestHeader}`);

    const results = [];

    if (hasTargetRequestHeader !== true) {
      if (verboseLogging === true && targetRequestHeaderCount < 1) console.error(`**[hasPathItemRequestHeader] path ${JSON.stringify(path)} missing target request header: '${targetRequestHeaderName}'**`);
      if (verboseLogging === true && targetRequestHeaderCount > 1) console.error(`**[hasPathItemRequestHeader] path ${JSON.stringify(path)} has multiple target request headers: '${targetRequestHeaderName}'**`);
      results.push({
        message: `PathItem request parameters should contain one '${targetRequestHeaderName}' header.`,
      });
    }
    return results;
  }
);