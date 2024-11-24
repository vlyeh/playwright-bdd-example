import addFormats from "ajv-formats";
import Ajv from "ajv";
import { expect } from "@playwright/test";
import { Resource } from "../../helpers/types";

export function validateSchema(
  schemaJson: any,
  responseData: Resource | Resource[]
) {
  const ajv = new Ajv();
  addFormats(ajv);
  const valid = ajv.validate(schemaJson, responseData);
  expect(valid).toBe(true);
}
