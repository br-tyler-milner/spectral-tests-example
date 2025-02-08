import { createRulesetFunction } from "@stoplight/spectral-core";

function myCustomFunction(targetVal, options, context) {
    const { values } = options;
    if (values.includes(targetVal)) {
        return [
            {
                message: `Value must be different from "${values.join(',')}".`,
            },
        ];
    }
}

// Export custom function using ES6 syntax
export default createRulesetFunction(
    {
        // JSON Schema of the targetVal parameter
        input: {
            type: "string"
        },
        // JSON Schema of the options parameter
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
    myCustomFunction
);
