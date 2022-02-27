/* globals gauge*/
"use strict";
const path = require('path');
const {
    $,
    goBack,
    toRightOf,
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    hover,
    resizeWindow,
    currentURL,
    scrollDown,
    radioButton,
    button,
    to,
    clear,
} = require('taiko');
const assert = require("assert");
const exp = require('constants');
const expect = require("chai").expect;
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    /*await openBrowser({
        headless: headless
    })*/
});

afterSuite(async () => {
    await closeBrowser();
});

afterScenario(async () => {
    await closeBrowser();
});


// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});

step("View <type> tasks", async function (type) {
    await click(link(type));
});

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

step("Open <page> with headless mode <isheadless>", async function (page, isheadless) {
    let headlessParam = isheadless.toLowerCase() === 'true';
    await openBrowser({headless: headlessParam});
    await goto(page);
    let currentUrl = await currentURL();
    expect(currentUrl).to.contain(page);
});

step("Click on Documentation button", async function () {
    await click("Documentation");
});

step("Click on Search input", async function () {
    await click($(`[placeholder="Search"]`));
});

step("Click on error button", async function (){
    /*try{
    await click($(`#error`));
    } catch(e){
        console.log('Az error gomb nem található');
        console.log(e);

    }*/
});

step("Hover on Blog button", async function() {
	await hover($(`.link_examples`));
});

step("Write <searchParam> in the search field", async function(searchParam) {
	await write(searchParam, $(`#search`));
});

step("Press Enter", async function() {
	await press('Enter');
});

step("Find Plugins nav item", async function() {
    let pluginListItem = await listItem('Plugins');
    console.log(await pluginListItem.attribute('class'));
    if(pluginListItem.isDisabled == false){
	await click(pluginListItem);
    }
});

step("Click on the bejelentkezés", async function() {
	//await resizeWindow({width:700, heighht: 800})
    let loginBtn = await $(`site-sub-nav__link site-sub-nav__link--has-icon`);
    let hamburgerMenu = await $(`.hamburger-box`);
    let megjelent = await hamburgerMenu.isVisible();
    if(megjelent == true){
        await click(hamburgerMenu);
        await click($(`a[href='/belepes']`));
        console.log("Sikeres bejelentkezés");
    }else{
    await click(loginBtn);
    }
});


step("Write out category", async function() {
	let categoryElement = await $(`home-section home-section--shop-categories`).elements();
    for(let category of categoryElement){
        console.log(await category.text());
    }
});


step("Login on the product page", async function() {
    await click($(`li.site-sub-nav__item a.site-sub-nav__link.site-sub-nav__link--has-icon`));
    await write('fonokur12@yahoo.com', $(`#_username`));
    await write('PinaRelloPf2,3', $(`#_password`));
    await click($(`.control__label--remember-me-checkout.control__label`));
    await click($(`[class='button button--lg button--fluid form__button js-profile__login-button`));
});

step("Search to dell word", async function() {
    await click($(`a[title='Keresés']`));
    await write('dell', $('input.search-bar__input.js-search-bar__input'));
    await press('Enter', {waitForEvents: ['DOMContentLoaded']});
});

step("Open the dell ms116 mouse page", async function() {
    await click($(`a[href*='ms116-fekete']`));
    await goBack();
});

step("Add to cart 3rd element of the result list", async function() {
    await hover($(`(//div[@class="search-list__grid--cards__item grid-col-1 grid-col-md-3-12"])[3]`));
    await click($(`a.shop-card__button.shop-to-cart-button.shop-to-cart-button--basic`));
    await click($(`.basket__delete-all-link`));
    await click($(`.basket__delete-all-link`));
    await click($(`.button__text`));
    await goBack({waitForEvents: ['DOMContentLoaded']});
});

step("Open the hit to the right of KB216", async function() {
	await click(link('DELL'), toRightOf($(`//a[@href="/shop/termek/dell-kb216-magyar-fekete/1208930"]`)));
});

step("Write out category names", {countinueOnFailer : true}, async function() {
    let categoryList = await link({class:'home-shop-categories__card__link'}).elements();
    expect(await categoryList[0].text()).to.equal("Gépösszerakó");
    assert.strictEqual(await categoryList[0].text(), "Gépösszerakó");
    expect(await categoryList[0].text() == "Gépösszerakó").to.be.ok;
    expect(categoryList).to.have.lengthOf(1);
    expect(categoryList.lenght == 10).to.be.ok;
    /*for (let category of categoryList) {
        let szoveg = await category.text();
        console.log(await link(szoveg).attribute('href'));
    }*/
});


step("Check the basket input field", async function() {
	let basketInputField = $(`.shop-to-cart-quantity__input`).isVisible();
    });

step("Click the basket icon", async function() {
	await click($(`.shop-to-cart-button.shop-to-cart-button--vlg.product__to-cart-button`));
});

step("Must display tha basket pop-up window", async function() {
	expect(await $(`#checkout-related-products-popup`).exists()).to.be.ok;
});

step("Check the basket pop-up window elemnts", async function() {
    expect(await $(`#checkout-related-products-popup div.modal-header`).text()).to.contain('IPON KITERJESZTETT GARANCIA');
    expect(await $(`p.related-products-modal__info`).text()).to.contain('Szeretnéd teljes biztonságban tudni új eszközödet? iPon kiterjesztett garanciával még nyugodtabb a jövő!');
    expect(await $(`div.tabs-wrapper:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)`).text()).to.contain('iPon kiterjesztett garancia');
    expect(await radioButton('+1 év garancia (7 955 Ft)').exists()).to.be.ok;
    expect(await radioButton('+2 év garancia (22 539 Ft)').exists()).to.be.ok;
    expect(await button('Tovább').exists()).to.be.ok;
});

step("Must display the toast messege", async function() {
	expect(await $('div#toast-container')).exists().to.be.ok;
});

step("Delet the default value on the input field", async function() {
    await click($(`div.product__delivery-cta-wrapper input.shop-to-cart-quantity__input`));
    expect(await $(`div.product__delivery-cta-wrapper input.shop-to-cart-quantity__input`).exists()).to.be.ok;
    await press('Backspace', {waitForEvents: ['DOMContentLoaded']});
});

step("Write wrong value the input field", async function() {
    await write('five', $(`div.product-main-details__block.product__delivery-cta-wrapper input.shop-to-cart-quantity__input`));
});

step("Must have 'NaN' text the input field", async function() {
    await click($(`button.shop-to-cart-button.shop-to-cart-button--vlg.product__to-cart-button`));
    waitFor("div.toast-title")
    expect(await $(`div.product-main-details__block.product__delivery-cta-wrapper input.shop-to-cart-quantity__input`).text()).to.contain('NaN');
});

step("Check the toast message elemnts", async function() {
	expect(await $(`div.toast-title`).text()).to.contain('Nem megfelelő darabszám!');
});

step("Click the 'Értesítést kérek' button", async function() {
	await click($(`button.product-pricegraph__notification__button.button.button--primary.button--text--default.button--cta`));
});

step("Must display this pop-up window", async function() {
    expect(await $(`#price-watcher-popup`).exists()).to.be.ok;
});

step("Check the 'Értesítést kérek' pop-up window", async function() {
    expect(await $(`#price-watcher-popup h5.modal-title`).text()).to.contain('Add meg az e-mail címed, amin értesíteni tudunk');
    expect(await textBox('E-mail').exists()).to.be.ok;
    expect(await textBox('Ár').exists()).to.be.ok;
});

step("Click the 'Elmentem' button", async function() {
	await click($(`span.action-link__state.js-state--not-saved.is-active`));
});

step("Must display 'Bejelntkezés' pop-up window", async function() {
    expect(await $(`div#profile-login-popup`).exists()).to.be.ok;
});

step("Must have the text 'Elmentve'", async function() {
    expect(await $(`span.action-link__state.js-state--saved.is-active`).text()).to.contain('Elmentve');
});

step("The heart icon must be red", async function() {
    expect(await $(`i.icon--red`).exists()).to.be.ok;
});

step("Click the 'Elmentve' button", async function() {
	await click($(`span.action-link__state.js-state--saved.is-active`));
});

step("Check the 'Elmentve' button", async function() {
	throw 'Unimplemented Step';
});

step("Must have the text 'Elmentem'", async function() {
    expect(await $(`span.action-link__state.js-state--not-saved.is-active`).text()).to.contain('Elmentem');
});

step("The heart must be white with a black border", async function() {
    expect(await $(`i.action-link__icon.far.fa-heart`).exists()).to.be.ok;
});

step("Click the 'Hibás adat?' button", async function() {
	await click($(`div.product-box__title__wrapper a.product__link`));
});

step("Must display 'Hibás adat?' pop-up window", async function() {
    expect(await $(`div#product-report-error-popup`).exists()).to.be.ok;
});

step("Check the 'Hibás adat?' pop-up window", async function() {
    expect(await $(`div#product-report-error-popup h5.modal-title`).text()).to.contain('HIBA BEJELENTÉSE');
    expect(await textBox('A hiba leírása')).to.be.ok;
    expect(await button('KÜLDÉS')).to.be.ok;
});

step("Check the default colour", async function() {
    expect(await $(`div.product__title-wrapper h1.product__title`).text()).to.contain('szürke');
});

step("Click on the silver colour option", async function() {
	await click($(`div.product__title-wrapper a.product-color[title="Ezüst"]`));
});

step("Check the product colour is change", async function() {
    expect(await $(`div.product__title-wrapper h1.product__title`).text()).to.contain('ezüst');
});

step("Check the breadcrumb is change", async function() {
	expect(await $(`li.breadcrumb__item.breadcrumb__item--active`).text()).to.contain('ezüst');
});

step("Back to the default color", async function() {
	await goBack();
});

step("Check the picture of product", async function() {
    expect(await $(`div#slick-slide50`).exists()).to.be.ok;
});

step("I clkick the small images under the image of product", async function() {
    await click($(`button#slick-slide-control51`));
    expect(await $(`div#slick-slide51`).exists()).to.be.ok;
});

step("Must change to the selected image", async function() {
    expect(await $(`div#slick-slide51`).exists()).to.be.ok;
});

step("Click the 'tovább' button", async function() {
	await click($(`a.product__link.product__link--underlined`));
});

step("The page jumnp the 'RÉSZLETES LEÍRÁS' section", async function() {
    expect(await $(`div.product-box.product-details`).exists()).to.be.ok;
});

step("Check the 'Ipon kiterjesztett garancia' section", async function() {
    expect(await $(`div.product__guarantee div.tabs-wrapper`).exists()).to.be.ok;
});

step("Choose the radio button of the '+1 év garancia (7 295 Ft)'", async function() {
    await click($(`div.tabs-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > label:nth-child(1)`));
});

step("The extended warranty price will be added the product price", async function() {
    expect(await $(`div.product__price-wrapper div.product__guarantee-value`).text()).to.contain('+1 év iPon kiterjesztett garancia (7 295 Ft)');
});

step("Click on the red x icon after the product price", async function() {
	await click($(`div.product__price-wrapper a.product__guarantee-delete`));
});

step("Check the extended warranty price has been deleted from the product price", async function() {
    expect(await $(`div.product__price-wrapper div.product__guarantee-price`).isDisabled()).to.be.ok;
});

step("Close the 'Értesítést kérek' pop-up window", async function() {
	await press('Escape', {waitForEvents: ['DOMContentLoaded']});
});

step("Check the 'SPECIFIKÁCIÓ' section", async function() {
    expect(await $(`div#specifikacio`).exists()).to.be.ok;
});

step("Click the 'Teljes specifikáció' button", async function() {
	await click($(`div.product-box__accordion__control--specification div.layout-box__footer i.fas.fa-arrow-down`, {waitForEvents: ['DOMContentLoaded']}));
});

step("Check the all specification is shown", async function() {
    expect(await $(`div.grid-col-1.grid-col-lg-5-12 div.collapse.show`).exists()).to.be.ok;
});

step("Click the 'Mutass kevesebbet' button", async function() {
	await click($(`div.product-box__accordion__control--specification div.layout-box__footer i.fas.fa-arrow-up`));
});

step("Check the shown specification is less", async function() {
    expect(await $(`div.product-box__accordion__control.product-box__accordion__control--specification div.product__link`).text()).to.contain('Teljes specifikáció')
});

step("Scroll down at the bottom of the page", async function() {
    await scrollDown($(`div.site-footer__minuscule__text`));
});

step("Click the 'Vissza az oldal tetejére' button", async function() {
	await click($(`a.site-footer__back-to-top-link.js-site-footer-back-to-top-link i.fas.fa-arrow-up.button__icon`));
});

step("Checke that it has jumped back to the top of the page", async function() {
expect(await $(`body.is-sticky-header-visible`).exists()).to.be.ok;
});

step("Search to 'Samsung T220 tab' word", async function() {
	await click($(`a[title='Keresés']`));
    await write('Samsung t220 tab', $('input.search-bar__input.js-search-bar__input'));
    await press('Enter', {waitForEvents: ['DOMContentLoaded']});
});

step("Open the product page", async function() {
	await click($(".search-list__grid--cards__item.grid-col-1.grid-col-md-3-12:nth-child(1)"));
});

step("Checke the 'Bejelentkezés' pop-up window elements", async function() {
    expect(await $(`#profile-login-popup h5.modal-title`).text()).to.contain('BEJELENTKEZÉS');
    expect(await textBox('E-mail cím / Felhasználónév').exists()).to.be.ok;
    expect(await textBox('Jelszó').exists()).to.be.ok;
    expect(await link('Elfelejtett jelszó?').exists()).to.be.ok;
    expect(await checkBox('Emlékezz rám').exists()).to.be.ok;
    expect(await button('BEJELENTKEZÉS').exists()).to.be.ok;
    expect(await link('REGISZTRÁCIÓ').exists()).to.be.ok;
    expect(await link('FACEBOOK BELÉPÉS / REGISZTRÁCIÓ').exists()).to.be.ok;
    expect(await link('APPLE BELÉPÉS / REGISZTRÁCIÓ').exists()).to.be.ok;
    expect(await link('BEJELENTKEZÉS MAGIC LINKKEL').exists()).to.be.ok;
});


step("The radio button is not choose", async function() {
	expect(await $(`div.tabs-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > label:nth-child(1) > span:nth-child(2)`).exists()).to.not.active;
});
