import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as IspindleCloud from '../lib/ispindle-cloud-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new IspindleCloud.IspindleCloudStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
