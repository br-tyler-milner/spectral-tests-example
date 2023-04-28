// Author: Jakub Rozek, Stoplight.io
// License: Apache License 2.0
// https://github.com/stoplightio/spectral/blob/develop/packages/rulesets/src/__tests__/__helpers__/tester.ts

import { IRuleResult, Spectral, Document, Ruleset, RulesetDefinition } from '@stoplight/spectral-core';
import { httpAndFileResolver } from '@stoplight/spectral-ref-resolver';
import * as fs from "node:fs";
import * as path from "node:path";
import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";
import { fetch } from "@stoplight/spectral-runtime";

export type RuleName = keyof Ruleset['rules'];

type Scenario = ReadonlyArray<
    Readonly<{
        name: string;
        document: Record<string, unknown> | Document<unknown, any>;
        errors: ReadonlyArray<Partial<IRuleResult>>;
        mocks?: Record<string, Record<string, unknown>>;
    }>
>;

export default (ruleName: RuleName, tests: Scenario): void => {
    describe(`Rule ${ruleName}`, () => {
        const concurrent = tests.every(test => test.mocks === void 0 || Object.keys(test.mocks).length === 0);
        for (const testCase of tests) {
            (concurrent ? it.concurrent : it)(testCase.name, async () => {
                const s = await createWithRules([ruleName]);
                const doc = testCase.document instanceof Document ? testCase.document : JSON.stringify(testCase.document);
                const errors = await s.run(doc);
                expect(errors.filter(({ code }) => code === ruleName)).toEqual(
                    testCase.errors.map(error => expect.objectContaining(error) as unknown),
                );
            });
        }
    });
};

export async function createWithRules(rules: (keyof Ruleset['rules'])[]): Promise<Spectral> {
    const s = new Spectral({ resolver: httpAndFileResolver });

    // Load the ruleset from .spectral.yaml file
    const filePath = path.resolve("../../../.spectral.yaml")
    const myRuleset = await bundleAndLoadRuleset(path.resolve(filePath), { fs, fetch })

    s.setRuleset({
        extends: [
            [myRuleset as RulesetDefinition, 'off'],
        ],
        rules: rules.reduce((obj, name) => {
            obj[name] = true;
            return obj;
        }, {}),
    });

    return s;
}
