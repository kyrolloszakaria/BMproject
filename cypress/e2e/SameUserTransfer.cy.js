import ParaBank from "../POM/ParaBank";
import result from "../POM/ParaBank";

describe("SameUserTransfer", () => {
  let ball;
  const paraBank = new ParaBank();
  beforeEach(function () {
    paraBank.navigate();
    cy.fixture("example").then((data) => {
      this.accounts = data.Accounts; // set the data.Accounts to this.accounts which is test related variable
      this.amounts = data.Amounts;
      paraBank.login(data.Cred["Username"], data.Cred["Password"]);
      //cy.log(this.accounts['13677']) // for debugging
      // cy.log(this.amounts["validAmount"]) // for debugging
    });
  });

  it("check Transfer Funds page UI interactivity", () => {
    paraBank.navigateToTransfer();
    paraBank.getTransferFundsTitle().should("have.text", "Transfer Funds");
    paraBank.getAmountTxtbox().should("be.empty");
    paraBank.getFromAccountDropMenu().should("be.enabled");
    paraBank.getToAccountDropMenu().should("be.enabled");
    paraBank.getTransferButton().should("be.enabled");
  });

  it("Transfer available amount from Checking to Checking account", function () {
    //  cy.log(this.accounts['checking1']) // for debugging
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["checking2"][0];
    let amount = this.amounts["validAmount"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);

    // var Accounts = [
    //   {id:String,
    //   balance:String}
    // ];

    // cy.get("tbody > tr").each((el, index, list) => {
    //   var accountNumber = el.find("a").text();
    //   var balance = el.find("td[class = ng-binding]").text(); // want to find first child
    //   const temp = new AccountDetails(accountNumber, balance);
    //   Accounts.push(temp);
    // });

    //>>>//// Can't get text of '#balance' !!!!

    // paraBank.go_to(sender)
    // cy.wait(1500)

    // Using Aliases
    //cy.get('#balance').invoke('text').as('bal')

    // Using then
    //   cy.log( "before "+this.accounts['checking1'][1])
    //   cy.get('#balance').then(($btn) => {
    //     // redefine text reference
    //     ball = $btn.text()
    //     cy.log("inside " +  ball)
    //     this.accounts['checking1'][1] = ball
    //   })
    //    cy.log( "after "+this.accounts['checking1'][1])
  });

  it("Transfer available amount from Checking to Savings account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["validAmount"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer available amount from Savings to Savings account", function () {
    const sender = this.accounts["savings1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings2"][0];
    let amount = this.amounts["validAmount"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer available amount from savings to Checking account", function () {
    const sender = this.accounts["savings1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["checking1"][0];
    let amount = this.amounts["validAmount"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer amount more than balance from Savings account to Checking account", function () {
    const sender = this.accounts["savings1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["checking1"][0];
    let amount = this.amounts["moreThanBalance"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer amount more than balance from Checking account to Savings account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["moreThanBalance"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer amount more than balance from Checking account to Savings account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["moreThanBalance"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("send", sender, amount);
    paraBank.validate("receive", receiver, amount);
  });
  it("Transfer '$0.00' from Checking account to Savings  account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["0"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("0_error");
  });
  it("Transfer '$0.00' from Savings account to Checking  account", function () {
    const sender = this.accounts["savings1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["checking1"][0];
    let amount = this.amounts["0"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("0_error");
  });
  it("Transfer negative amount from Checking account to Checking account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["negativeAmount"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("negative amount error");
  });
  it("Transfer invalid value (special char) from Checking account to Checking account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["specialChar"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("specialChar error");
  });
  it("Transfer invalid value (char) from Checking account to Checking account", function () {
    const sender = this.accounts["checking1"][0]; // zero index is always the account number and 1 index is for the balance
    const receiver = this.accounts["savings1"][0];
    let amount = this.amounts["char"];
    paraBank.Transfer(sender, receiver, amount);
    paraBank.validate("char error");
  });

});
