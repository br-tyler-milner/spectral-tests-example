import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('http-status-obsolete', [
    {
        name: 'valid case',
        document: {
            openapi: '3.1.0',
            info: { version: '1.0' },
            paths: {
                '/': {
                    get: {
                        responses: {
                            '400': {
                                description: "Bad Request"
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
                            '418': {
                                description: "I'm a teapot"
                            }
                        }
                    }
                }
            }
        },
        errors: [
            {
                message: '418 is an obsolete or unused HTTP status code',
                path: ['paths', '/', 'get', 'responses', '418'],
                severity: DiagnosticSeverity.Warning
            }
        ],
    }
]);
