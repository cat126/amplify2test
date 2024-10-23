import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { aws_rum} from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  data,
});





const customResourceStack = backend.createStack('MyCustomResources');



//https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rum.CfnAppMonitorProps.html

const cfnAppMonitorProps: aws_rum.CfnAppMonitorProps = {
    domain: 'test.catis.me',
    name: 'TestRumMointor',

    // the properties below are optional
    appMonitorConfiguration: {
        allowCookies: true,
        enableXRay: true,
       
    },
    cwLogEnabled: true,
    tags: [{
        key: 'key',
        value: 'value',
    }],
};

//const rum: aws_rum.CfnAppMonitor =
new aws_rum.CfnAppMonitor(customResourceStack, "TestRumMointor", cfnAppMonitorProps);


const { amplifyDynamoDbTables } = backend.data.resources.cfnResources;
for (const table of Object.values(amplifyDynamoDbTables)) {
    table.pointInTimeRecoveryEnabled = true;
}