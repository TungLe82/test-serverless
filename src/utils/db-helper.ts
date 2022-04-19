import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";
import DynamoDBConnection from "./db-connection";
import { isEmpty, has } from "lodash";
import { DEFAULT_LIMIT } from "../configs/constants";

export default class DbHelper {
  private client: DynamoDB.DocumentClient;
  constructor() {
    this.client = DynamoDBConnection.Client();
  }

  async insertOrReplace(item: any, tableName: string): Promise<any> {
    const params: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    const result = await this.client.put(params).promise();
    return item;
  }

  async find(id: string, tableName: string): Promise<any> {
    const params = {
      Key: { id },
      TableName: tableName,
    };

    const result = await this.client.get(params).promise();

    if (isEmpty(result)) {
      return null;
    } else {
      return result.Item;
    }
  }

  async getWhereIdIn(ids: string[], tableName: string): Promise<any[]> {
    const keys = ids.map((id) => ({ id }));
    const params = { RequestItems: {} };
    params.RequestItems[tableName] = { Keys: keys };

    try {
      const result = await this.client.batchGet(params).promise();
      const items = result.Responses[tableName];
      if (isEmpty(items)) {
        return [];
      }
      return items;
    } catch (err) {
      return [];
    }
  }

  async list(
    tableName: string,
    limit?: number,
    nextToken?: string
  ): Promise<{
    nextToken: string;
    items: any[];
  }> {
    if (!limit) {
      limit = DEFAULT_LIMIT;
    }

    const params: DocumentClient.ScanInput = {
      Limit: limit,
      TableName: tableName,
    };
    if (nextToken) {
      params.ExclusiveStartKey = { id: nextToken };
    }

    const result = await this.client.scan(params).promise();

    let newNextToken = null;
    if (has(result, "LastEvaluatedKey")) {
      newNextToken = result.LastEvaluatedKey.id;
    }

    return {
      nextToken: newNextToken,
      items: result.Items,
    };
  }

  async query(
    tableName: string,
    indexName: string,
    hashIndexOpts: any
  ): Promise<any[]> {
    const { attrName, attrValue, operator } = hashIndexOpts;

    const params: DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `${attrName} ${operator} :hkey`,
      ExpressionAttributeValues: {
        ":hkey": attrValue,
      },
    };

    const result = await this.client.query(params).promise();

    return result.Items;
  }

  async update(tableName: string, id: string, data: any): Promise<any> {
    const updateExpressions = [];
    const expressionsValues = {};
    for (const fieldName of Object.keys(data)) {
      const fieldValue = data[fieldName];
      updateExpressions.push(`${fieldName} = :${fieldName}`);
      expressionsValues[`:${fieldName}`] = fieldValue;
    }
    const updateExpression = "set " + updateExpressions.join(", ");

    const params: DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionsValues,
    };

    const result = await this.client.update(params).promise();
    return result;
  }
}
