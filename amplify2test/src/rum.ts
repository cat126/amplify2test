import { AwsRum, AwsRumConfig } from 'aws-rum-web';

export function rum()
{
    try {
        const config: AwsRumConfig = {
            sessionSampleRate: 0,
            endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
            telemetries: [],
            allowCookies: true,
            enableXRay: true
        };

        const APPLICATION_ID: string = 'fc48546e-3a63-4f2c-b32f-be574387f6a7';
        const APPLICATION_VERSION: string = '1.0.0';
        const APPLICATION_REGION: string = 'us-east-2';

        
        const awsRum: AwsRum = new AwsRum(
            APPLICATION_ID,
            APPLICATION_VERSION,
            APPLICATION_REGION,
            config
        );
        return awsRum;
    } catch (error) {
        // Ignore errors thrown during CloudWatch RUM web client initialization
    }
}