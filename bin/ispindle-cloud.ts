#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IspindleCloudStack } from '../lib/ispindle-cloud-stack';

const app = new cdk.App();
new IspindleCloudStack(app, 'IspindleCloudStack');
