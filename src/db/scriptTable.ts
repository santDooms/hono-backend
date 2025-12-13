import { createDynamoTable } from "./dynamodb_manager";

const runTableCreation = async () => {
  try {
    await createDynamoTable();
    console.log("DynamoDB table created successfully.");
  } catch (error) {
    console.error("Error creating DynamoDB table:", error);
  }
};

runTableCreation();
