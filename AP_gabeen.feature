@tagPlaceholder1 @tagPlaceholder2
Feature: Termékoldal
  Scenario: Can be added more than 1 product to the cart
    Given We are on the product page
      And The quantity of the product is 1
    When The user click on the + button to increse tˇhe quantity
    Then The quantity of the product is incresed to 2

Scenario: Color selection
Given I am on the product page
And Two color options are availablefor the product
But The blue color  is not selected

When I select the blue Color

Then The color box id highlighted with a black border
And The color of the product's image change to match the selected color

Feature: Send product link link to a frend
Scenario: Send to a frend pop-up
  Given I am on the product page

  When I click on the "Send to a freind" link

  Then The "Send to a frend" pop-up is display

Scenario: "Send to a freind"  pop-up elements
Given The "Send to a friend" pop-up displayed
When I check the elemnts on the pop-up



Feature: Product filters
Scenario: Prize slider shows the number of matchig items in the selected price interval
GivenI am on a category subpage
And The price slider is on default state 

When I slide the price  slider to the $30 maximum value 

Then The Loading progress animation is shown




     




 


