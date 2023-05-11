import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("request-must-have-accept-language-header", [
    {
        name: "valid case",
        document: {
            openapi: "3.1.0",
            info: { version: "1.0" },
            paths: {
                "/": {
                    parameters: [
                        {
                            schema: {
                                type: "string"
                            },
                            name: "Accept-Language",
                            in: "header",
                            required: true
                        }
                    ],
                    get: {}
                }
            }
        },
        errors: [],
    },

    {
        name: "invalid case",
        document: {
            openapi: "3.1.0",
            info: { version: "1.0" },
            paths: {
                "/": {
                    parameters: [
                        {
                            schema: {
                                type: "string"
                            },
                            name: "Not-Accept-Language",
                            in: "header",
                            required: true
                        }
                    ],
                    get: {}
                }
            }
        },
        errors: [
            {
                message: "PathItem request parameters should contain one 'Accept-Language' header.",
                path: ["paths", "/", "parameters"],
                severity: DiagnosticSeverity.Error
            }
        ],
    }
]);
