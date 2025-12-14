import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient , PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

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

export const saveQuotation = async (item: any) => {
  try {
    return dynamoClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );
  } catch (error) {
    console.error("Error saving quotation to DynamoDB:", error);
    throw error;
  }
};

export const queryQuotationsByBrokerKey = async (brokerKey: string, exclusiveStartKey?: Record<string, unknown>) => {
  const params: any = {
    TableName: TABLE_NAME,
    IndexName: "BrokerKeyIndex", // requiere crear un GSI con partition key = brokerKey y sort key = createdAt
    KeyConditionExpression: "brokerKey = :bk",
    ExpressionAttributeValues: { ":bk": brokerKey },
    Limit: 10,
    ScanIndexForward: false, // más recientes primero
  };
  if (exclusiveStartKey) params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoClient.send(new QueryCommand(params));
};