Feature: User Management API

    Scenario: Create user
        Given I have a random email
        When I create a user with the random email
        Then the response should have status code 201
        Then the response body should include:
            |   gender  | female        |
            |   name    | Custom name   |
            |   status  | active        |
    And the email should match the created email

    Scenario: Get user details
        Given I have created a user
        When I fetch the details of the user by ID
        Then the response should have status code 200
        And the response body should include the created user's details

    Scenario: Update full user details
        Given I have created a user
        And I have updated user details with a new email
        When I update the user with the new details
        Then the response should have status code 200
        Then the response body should include:
            |   gender  | male        |
            |   name    | Updated user   |
            |   status  | inactive        |
        And the email should match the updated email

    Scenario: Update only one user field
        Given I have created a user
        And I have updated only the email of the user
        When I update the user with the partial details
        Then the response should have status code 200
        Then the response body should include:
            |   gender  | female        |
            |   name    | Custom name   |
            |   status  | active        |
        And the email should match the updated email

    Scenario: Delete user
        Given I have created a user
        When I delete the user by ID
        Then the response should have status code 204

    Scenario: Users schema validation
        Given I have access to the Users API
        When I fetch the users' data
        Then the response should match the defined user schema