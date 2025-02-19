import { defined, pattern } from '@stoplight/spectral-functions'
import { oas3 } from '@stoplight/spectral-formats'
import { DiagnosticSeverity } from '@stoplight/types'
import myCustomFunction from './functions/myCustomFunction.js'

export default {
  // extends: ['spectral:oas'],
  rules: {
    'response-must-have-500': {
      description: 'All responses should have a `500` response defined.',
      message: 'All endpoints must have a `500` response defined.',
      given:
        '$.paths[*].[get,put,post,delete,options,head,patch,trace].responses',
      then: [
        {
          function: defined,
          field: '500',
        },
        {
          function: pattern,
          field: '500.description',
          functionOptions: {
            match: '^Internal Server Error$',
          },
        },
      ],
      formats: [oas3],
      severity: DiagnosticSeverity.Error,
    },
    'http-status-obsolete': {
      description: 'Obsolete or unused HTTP status codes should not be used.',
      message: '{{property}} is an obsolete or unused HTTP status code',
      given: '$.paths.*.*.responses',
      then: {
        function: myCustomFunction,
        field: '@key',
        functionOptions: {
          values: ['306', '418', '510'],
        },
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Warning,
    },
  },
}
