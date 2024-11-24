Feature: Playwright Home Page

    Scenario: Check title
        Given I amz on Playwright home page
        When I clickz link "Get started"
        Then I seez in title "Installation"