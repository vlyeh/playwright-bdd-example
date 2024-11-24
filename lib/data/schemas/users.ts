export const user_schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "array",
  items: {
    type: "object",
    properties: {
      id: {
        type: "integer"
      },
      name: {
        type: "string"
      },
      email: {
        type: "string",
        format: "email"
      },
      gender: {
        type: "string",
        enum: ["male", "female"]
      },
      status: {
        type: "string",
        enum: ["active", "inactive"]
      }
    },
    required: ["id", "name", "email", "gender", "status"]
  }
};
