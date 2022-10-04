describe("draft to manipulate JSON files", () => {
  beforeEach(function () {  
    // Used to edit the json file and save the edits globally during all tests
    // For more info: https://docs.cypress.io/api/commands/fixture#this-context
    cy.fixture("example2").then((Accounts) => { // VERY IMPORTANT THIS WORKS ONLY WHEN YOU PASS ANONYMS FUNCTION TO BEFOREEACH NOT AN ARROW FUNCTION
        // here update all the values
        Accounts["checking1"] = "12345";
        // here store them in this.accounts
        // "this" points at the test context object so it exists all over the test
      this.Accounts = Accounts;
    });
  });
  it.only("retrieve data", () => {
    cy.fixture("example2").then((Accounts) => {
      //const { data } = JSON.parse(res.body) // needs configuration to work
      // cy.log(Accounts.acc1.checking1); // logs account number correctly // was working on old file
      // expect(Accounts[0]).to.include('John') // it will work if you are search for an element inside an array
     // expect(Accounts[0].accountNumber).to.eq("John");

      // wants to edit property in JSON file
    });
  });
  it.only("modifying data", function () {
    cy.fixture("example").then((Accounts) => {
     // this.Accounts = Accounts;
      //this.Accounts["checking1"] = "12345";
     // expect(this.Accounts["checking1"]).to.eq("12345"); // it will not be overwritten in the file but during program runtime it dynamically changes
    }); // changes will not be reflected outside this scope

    cy.log(this.Accounts["checking1"]);
  });
  it.only("try whether it will work on ParaBank", function ()  {
    this.Accounts["checking1"] = 23
    cy.log(this.Accounts["checking1"]); // here it prints 12345 which is the updated value
  });
});
