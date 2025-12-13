import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Quotations";

const client = new DynamoDBClient({ // infra
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fake",
    secretAccessKey: "fake",
  },
});

const dynamoClient = DynamoDBDocumentClient.from(client); // data

export const createDynamoTable = () => {
  const command = new CreateTableCommand({
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: "policyId", KeyType: "HASH" },
      { AttributeName: "createdAt", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "policyId", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  });
  return client.send(command);
};
