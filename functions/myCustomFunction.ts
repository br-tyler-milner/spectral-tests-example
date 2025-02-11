// Import the 'createRulesetFunction' Spectral function using ES6 syntax.
// The custom function must be exported using the createRulesetFunction function
// if it utilizes a JSON schema to define its input and options parameters.
import { createRulesetFunction, RulesetFunctionContext } from "@stoplight/spectral-core";

// Define the interface for the options parameter
interface Options {
    values: string[];
}

// Define a custom function that checks if the target value is included in the values
// array. If targetVal is already in the list, the rule violation is triggered.
// Used to create a 'http-status-obsolete' custom rule in the .spectral.yml ruleset.
// The custom function takes three parameters:
// - targetVal: the value to be checked (should match the schema for the rule's 'given' property defined in the .spectral.yml ruleset, also taking into account the 'then.field' filter if it's utilized)
// - options: an object containing a 'values' array (should match the schema for the rule's 'then.functionOptions' property defined in the .spectral.yml ruleset)
// - context: an object containing properties that provide the context about how the custom function is called ('path' - the path to 'targetVal' in the form of an array of strings, 'document' - the document being linted, 'rule' - the rule that's using the function, 'documentInventory' - provides access to resolved and unresolved documents, the $ref resolution graph, and other advanced properties)
function myCustomFunction(targetVal: string, options: Options, context: RulesetFunctionContext) {
    // Get the 'values' property defined in the 'functionOptions' object, which should be an array of strings (e.g. ["418", "510"])
    const { values } = options;

    // Check if the target value is included in the values array (e.g. the value being checked is in the list of obsolete HTTP status codes)
    if (values.includes(targetVal)) {
        // Return an array of objects with a 'message' property that describes the rule violation
        // Objects can also optionally include a 'path' property that points to the location of the violation in the document
        return [
            {
                message: `Value must be different from "${values.join(',')}".`,
            },
        ];
    }
}

// Export custom function using ES6 syntax
export default createRulesetFunction(
    // Define a JSON Schema that describes the custom function's input and options
    {
        // JSON Schema of the targetVal parameter in the custom function
        input: {
            type: "string"
        },
        // JSON Schema of the options parameter in the custom function (should match the schema for the rule's 'then.functionOptions' property defined in the .spectral.yml ruleset)
        options: {
            type: "object",
            additionalProperties: false,
            properties: {
                values: {
                    type: "array"
                }
            },
            required: ["values"],
        },
    },
    // The custom function implemented above will be exported
    myCustomFunction
);
