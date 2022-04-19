import DynamoDB from "aws-sdk/clients/dynamodb";

export default class DynamoDBConnection {
  private static client: DynamoDB.DocumentClient;

  public static Client(options?: any): DynamoDB.DocumentClient {
    if (this.client) {
      return this.client;
    } else {
      this.client = new DynamoDB.DocumentClient(options);
      return this.client;
    }
  }
}
