import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('response-must-have-500', [
    {
        name: 'valid case',
        document: {
            openapi: '3.1.0',
            info: { version: '1.0' },
            paths: {
                '/': {
                    get: {
                        responses: {
                            '500': {
                                description: "Internal Server Error"
                            }
                        }
                    }
                }
            }
        },
        errors: [],
    },

    {
        name: 'invalid case',
        document: {
            openapi: '3.1.0',
            info: { version: '1.0' },
            paths: {
                '/': {
                    get: {
                        responses: {
                            '200': {
                                description: "OK"
                            }
                        }
                    }
                }
            }
        },
        errors: [
            {
                message: 'All endpoints must have a `500` response defined.',
                path: ['paths', '/', 'get', 'responses'],
                severity: DiagnosticSeverity.Error
            }
        ],
    }
]);
