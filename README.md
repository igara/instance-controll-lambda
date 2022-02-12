# instance-controll-lambda

## setup

```
nodebrew use 14.18.1
npm i -g yarn@1.22.5
yarn
```

### local

```
yarn dev
yarn run:local [function name]
```

### production

#### Required IAM Role

- EC2
  - AmazonEC2RoleforSSM
  - AmazonSSMFullAccess

```
yarn create:domain
yarn deploy
aws lambda invoke --invocation-type Event --region us-east-1 --function-name instance-controll-lambda-production-[function name] response.json
# aws lambda invoke --invocation-type Event --region us-east-1 --function-name instance-controll-lambda-production-status_all_instance  --payload file://event.json --cli-binary-format raw-in-base64-out response.json
```
