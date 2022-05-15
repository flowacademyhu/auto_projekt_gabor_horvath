Feature: Samsung T220 tablet product page 
#browser used: <firefox>
   #No.1
    Scenario: Product color selection
        Given I am on the product page
            And Two color options are available for the product 
            But The silver color is not selected by default 
        When I selected the silver color 
        Then The color of the product's images changes to the selected color
            And The price of the product changes
            And Change of color in the name of the product
            And Change of color in the name of the product at the breadcrumb

    #No.2
    Scenario: Product picture selection
        Given I am on the product page
        When I check the picture of product 
        Then I clkick the small images under the image of product
            And The product's image changes to the selected image
    
    #No.3
    Scenario Outline: "ÁRFIGYELŐ" section 
        Given I am on the product page
        When I check the "ÁRFIGYELŐ" section
            And I hover the mouse over it
        Then A date is displayed: <date>
            And The associated price is display: <price>
        Examples: 
        |date      |price|
        |21.dec.09.|57690|
        |21.dec.10.|55590|
        |21.dec.13.|60890|
        |21.dec.20.|60890|
        |21.dec.21.|66290|
        |21.dec.26.|66290|
        |21.dec.27.|65289|
        |21.dec.28.|63090|
        |22.jan.02.|63090|
        |22.jan.03.|66290|
        |22.jan.04.|75090|
        |22.jan.08.|66290|

    #No.4
    Scenario: Product add to favourite 
        Given I am on the product page
            And I loged in
        When I click the "Elmentem" button
        Then The text is changed to "Elmentve"
            And The heart icon will be red

    #No.5
    Scenario: Product delete from favourite
        Given I am on the product page
            And I loged in
            And The product add the favourite
            And The heart icon is red
        When I clkick the "Elmentve" button
        Then The text is changed to "Elmentem" 
            And The heart will be white with a black border

    #No.6
    Scenario: The "tovább" button operation 
        Given I am on the product page
        When I clkick the "tovább" button
        Then The page jumnp the "RÉSZLETES LEÍRÁS" section

    #No.7
    Scenario: Add extended warranty 
        Given I am on the product page
        When I check the "IPon kiterjesztett garancia" section
            And I choose the radio button of the "+1 év garancia (9 011 Ft)" 
        Then The extended warranty price will be added the product price 

    #No.8
    Scenario: Delete from extended warranty
        Given I am on the product page
            And Choose "+1 év garancia (9 011 Ft)" extended warranty
        When I click on the red x icon after the product price
        Then The extended warranty price deleted at the product price
            And The radio button is not choose

    #No.9
    Scenario: Add 1 product to basket
        Given I am on the product page
            And In the basket input field the default piece is one
        When I click the basket icon
        Then Display the basket pop-up window
           
    #No.10
    Scenario: The basket pop-up window elements
        Given I am on the product paige  
            And Display the basket pop-up window
        When I check the pop-up window elements    
        Then Exact name of the product
            And The price of the product
            And Two options of the extended warranty
            And "TOVÁBB" button

    #No.11
    Scenario Outline:The basket input field text <inputVariables>
        Given I am on the product paige
            And In the basket input field the default piece is one
        When I type in the input field <inputVariables>
            And I click the basket button
        Then The input field shown the "Nan" text
            And Display a toast message 

        Examples:
        |inputVariables|
        |-5            |
        |five          |
    
    #No.12
    Scenario: Basket input field with wrong value toast message elements
        Given I type the wrong value in the basket input field
            And I click the basket button
            And Display the toast message
        When I check the toast message elements
        Then The message background color is red
            And Shown a red text "Nem megfelelő darabszám"
            And On the left is a red x icon
    
    #No.13
    Scenario: Display the "Hibás adat?" pop-up window 
        Given I am on the product page
            And I logged in
        When I click the "Hibás adat?" button
        Then Display the pop-up window 

    #No.14
    Scenario: Check the "Hibás adat?" pop-up window elements
        Given The "Hibás adat?" pop-up window is display
        When I check the pop-up window elements
        Then "HIBA BEJELENTÉSE" is the header
            And An x icon in the top right corner
            And "A hiba leírása" text arae is shown
            And "KÜLDÉS" button is shown

    #No.15
    Scenario: Display the "Értesítést kérek" pop-up window
        Given I am on the product page
            But I am not logged in
        When I click the "Értesítést kérek" button 
        Then Display the "Éretsítést kérek" pop-up window 

    #No.16
    Scenario: Check the "Értesítést kérek" pop-up window elements
        Given The "Értesítést kérek" pop-up window is display
        When I check the pop-up window elements
        Then "Add meg az e-mail címed, amin értesíteni tudunk" is the header
            And An x icon in the top right corner
            And "E-mail" input field is shown
            And "Ár" input field is shown
            And "ÉRTESÍTÉST KÉREK" button is shown
    
    #No.17
    Scenario Outline: Displaying the <buttonName> pop-up window without logged in 
        Given I am on the product page
            But I am not logged in
        When I clicke the <buttonName> 
        Then The "BEJELENTKEZÉS" pop-up window is displayed
        Examples:
        |buttonName |
        |Elmentem   |
        |Hibás adat?|

    #No.18
    Scenario: Check the "BEJELENTKEZÉS" pop-up window elements
        Given The "BEJELENTKEZÉS" pop-up is displayed
        When I check the elements on the pop-up
        Then The "BEJELENTKEZÉS" header is shown
            And An x icon in the top right corner
            And "E-mail cím / Felhasználónév" input field is shown
            And "Jelszó" input field is shown
            And "Emlékezz rám" check box is shown
            And The check box is tick
            And "BEJELENTKEZÉSs" button is shown
            And "REGISZTÁCIÓ" button is shown
            And "FACEBOOK BELÉPÉS / REGISZTRÁCIÓ" button is shown
            And "APPLE BELÉPÉS / REGISZTRÁCIÓ" button is shown
            And "BEJELENTKEZÉS MAGIC LINKEL" button is shown

    #No.19
    Scenario: Shown full specifications
        Given I am on the product page
            And I check the "SPECIFIKÁCIÓ" section
        When I click the "Teljes specifikáció" button
        Then All specification is shown in the extension modul

    #No.20
    Scenario: Shown less the specifications
        Given I am on the product page
            And All specification is shown in the extension modul
        When I click the "Mutass kevesebbet" button
        Then The specifications is shown less in the extension modul

    #No.21
    Scenario: Back to top of the page
        Given I am on the product page
            And  I am at the bottom of the page
        When I click the "Vissza az oldal tetejére" button
        Then Jumps to the top of the page



    
        
    

