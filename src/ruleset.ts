import { defined, pattern } from '@stoplight/spectral-functions'
import { oas3 } from '@stoplight/spectral-formats'
import { DiagnosticSeverity } from '@stoplight/types'
import myCustomFunction from './functions/myCustomFunction.js'
import { oas as spectralOas } from '@stoplight/spectral-rulesets'
// import { fetch } from '@stoplight/spectral-runtime'
// import * as fs from 'node:fs'
// import * as path from 'node:path'
// import { bundleAndLoadRuleset } from '@stoplight/spectral-ruleset-bundler/with-loader'

// TODO: Importing local JSON ruleset is throwing runtime errors
// const enforceHttpsRulesetPath = path.join(
//   __dirname,
//   '../public-rulesets/enforce-https/.spectral.json',
// )
// const enforceHttpsRuleset = bundleAndLoadRuleset(enforceHttpsRulesetPath, {
//   fs,
//   fetch,
// })

function buildRuleset() {
  // console.log('enforceHttpsRulesetPath', enforceHttpsRulesetPath)
  // console.log('enforceHttpsRuleset', enforceHttpsRuleset) // This is output as `Promise { <pending> }` - not being resolved properly?
  const baseRuleset = {
    extends: [spectralOas],
    rules: {
      // 'info-contact': 'off', // uncomment to disable built-in Spectral 'oas' ruleset 'info-contact' rule
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

  return baseRuleset
}

export default buildRuleset()
