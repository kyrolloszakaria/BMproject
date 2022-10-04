/// <reference types = "Cypress" />


class ParaBank { // rename to TrasnferFunds
  getUsernameTxtBox() {
    // Locator using attributes
    return cy.get("input[name = username]").clear();
  }
  getPasswordTxtBox() {
    return cy.get("input[name = password]").clear();
  }
  getTransferFundsTitle() {
    return cy.get(".title");
  }
  getAmountTxtbox() {
    return cy.get("#amount");
  }
  getFromAccountDropMenu() {
    return cy.get("#fromAccountId");
  }
  getToAccountDropMenu() {
    return cy.get("#toAccountId");
  }
  getTransferButton() {
    return cy.get("input[value = Transfer]");
  }
  navigate() {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  }
  login(username, password) {
    this.getUsernameTxtBox().type(username);
    this.getPasswordTxtBox().type(password);
    cy.get("input[class = button]").click();
  }
  navigateToTransfer() {
    cy.contains("Transfer Funds").click();
    cy.wait(1500);
  }
  Transfer(sender, receiver, amount) {
    this.navigateToTransfer();
    this.getAmountTxtbox().type(amount);
    this.getFromAccountDropMenu().select(sender);
    this.getToAccountDropMenu().select(receiver);
    this.getTransferButton().click();
  }
  go_to(account) {
    cy.contains("Accounts Overview").click();
    cy.wait(1500);
    cy.get("tbody > tr > td > a").each((el, index, list) => {
      if (el.text() == account) {
        list[index].click();
      }
    });
  }

  validate(mode, account, amount) {
    if (mode == "send" || mode == "receive") {
      this.go_to(account);
      let loc = "";
      if (mode == "send") {
        loc = ".ng-binding.ng-scope";
      } else if (mode == "receive") {
        loc = ".ng-scope";
      }
      cy.get("tbody > tr > " + loc).each((el, index, list) => {
        if (index == list.length - 1) {
          if (el.text() == "$" + amount + ".00") {
            assert.isOk(
              "true",
              "The transferred amount is reflected successfully in the account activity."
            );
          } else {
            assert.isNotOk(
              "true",
              "The transferred amount conflicts with the account activity."
            );
          }
        }
      });
    } else if (mode == "0_error") {
      cy.get("#amount.errors").should(
        "have.text",
        "The minimum amount for transfer is $1.00"
      );
    } else if (mode == "negative amount error" || mode == "specialChar error" || mode == "char error") {
      cy.get(".error.ng-scope").should(
        "have.text",
        "Please enter a valid amount."
      );
    }
  }
  getBalanceValue(account) {
    this.go_to(account);
    cy.wait(1500);
    cy.get("#balance").invoke("text").as("bal");
    cy.log("inside " + bal);
    cy.log("aoutside  " + balance);
    //return cy.get('#balance').text().replace("$", "").then(parseInt)
  }
  saveAccountInfo(dataObj, account) {
    dataObj.accountNumber = account;
  }
  intiAccounts() {
    let accNum = "";
    let balance = "";
    cy.get("tr[ng-repeat='account in accounts']").each((el) => {
      accNum = el.find("a").text();
      balance = el.find("td").eq(1).text().replace("$", "");
      // .eq(1) gets first element if it finds two or more
      localStorage.setItem(accNum, balance);
      cy.log(accNum);
    });

    cy.window().its("localStorage");

    cy.getLocalStorage("13677").then(($lastSearches) => {
      expect($lastSearches.should("eq", "100.00"));
    });

    // cy.writeFile("fixtures/example.json", );

    // cy.readFile("fixtures/example.json").then((user) => {
    //   let data = [user, { name: "gggggg", email: "eliza@jjjjjj.com" }];

    // });
    // let ACCs = this.intiAccounts_helper(
    //   localStorage.getItem(accNum),
    //   localStorage.getItem(balance)
    // );
    // cy.log(ACCs);
  }
}
export default ParaBank;
