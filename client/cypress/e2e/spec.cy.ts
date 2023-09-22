import type {} from "cypress";

const mockPet = {
  name: "Tuxie",
  type: {
    name: "cat",
  },
  breed: "Domestic short hair",
  location: "Helsinki, FI",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget eleifend quam, rutrum euismod magna. Mauris consequat aliquet libero sed dictum. Proin posuere pulvinar imperdiet. Maecenas ut sollicitudin diam. Donec ullamcorper et ligula eget viverra. Donec placerat arcu ut augue auctor tristique. Etiam vel arcu viverra, congue massa ut, bibendum justo. Suspendisse varius interdum justo, vel dictum turpis placerat ac. Nunc dignissim nisi non turpis facilisis, vel aliquam diam viverra. Aliquam eget nibh enim. Curabitur quis orci vestibulum, convallis nibh tempor, tempus dui. Phasellus lacinia eros ac felis molestie pellentesque. Aliquam vehicula odio velit, ut iaculis metus dictum eu.",
  adoptionFee: "€100.00",
  characteristic: {
    age: "Baby",
    gender: "Male",
    size: "Small",
    personality: ["Gentle", "Playful", "Smart", "Independent", "Curious"],
    coatLength: "Short",
    houseTrained: "No",
    health: ["Vaccinations up to date"],
  },
};

const mockNewPet = {
  name: "Test",
  nameUpdated: "Testupdated",
  type: {
    name: "cat",
  },
  breed: "Domestic short hair",
  location: "Helsinki, FI",
  description: "Lorem ipsum dolor sit amet.",
  adoptionFee: "100",
  characteristic: {
    age: "Baby",
    gender: "Male",
    size: "Small",
    personality: ["Gentle", "Playful", "Smart", "Independent", "Curious"],
    coatLength: "Short",
    houseTrained: "No",
    health: ["Vaccinations up to date"],
  },
};

const mockAnimal = {
  name: "cat",
};

const mockNewAnimal = {
  name: "parrot",
};

const mockAdmin = {
  username: "admin",
  firstname: "Admin",
  lastname: "Lastname",
  email: "admin@gmail.com",
  emailUpdated: "adminUpdated@gmail.com",
  password: "thisisatest",
  favorites: [mockPet],
};

const mockNewUser = {
  username: "testuser",
  firstname: "Test",
  lastname: "User",
  email: "testuser@gmail.com",
  emailUpdated: "userUpdated@gmail.com",
  password: "thisisatest",
  favorites: [mockPet],
};

describe("Pet Adoption App", function () {
  beforeEach(function () {
    cy.visit("/pet-adoption-app");
  });

  describe("front page", function () {
    it("can be opened", function () {
      cy.contains("Pet Adoption");
      cy.contains("Find your new best friend!");
      cy.contains(
        "Pets are not our whole life, but they make our lives whole."
      );

      cy.contains("Pets available for adoption");

      cy.contains("Planning To Adopt?");
      cy.contains("View list of pets");
      cy.contains(
        "See our wonderful list of pets, categorized for your convenience."
      );
      cy.contains("Read our FAQs");
      cy.contains("Read answers to questions you're wondering about.");
      cy.contains("Fill the adoption form");
      cy.contains(
        "Already have a pet that caught your eyes? Fill the form and adopt your new friend before it's too late!"
      );
    });

    it("can be used to search for animal", function () {
      cy.get(`input[data-testid="searchbarInput"]`).type(mockAnimal.name);
      cy.get(`button[data-testid="searchbarBtn"]`).click();

      cy.location("pathname").should(
        "eq",
        `/pet-adoption-app/browse-pets/${mockAnimal.name}`
      );
    });

    it("can be used to navigate to pet browsing page", function () {
      cy.contains("Meet them now").click();

      cy.location("pathname").should("eq", `/pet-adoption-app/browse-pets`);

      cy.get(`[data-testid="catOption"]`).click();
      cy.contains("Find pets").click();

      cy.location("pathname").should(
        "eq",
        `/pet-adoption-app/browse-pets/${mockAnimal.name}`
      );
    });
  });

  it("user can register", function () {
    cy.contains("Register").click();
    cy.get("#username").type(mockNewUser.username);
    cy.get("#firstname").type(mockNewUser.firstname);
    cy.get("#lastname").type(mockNewUser.lastname);
    cy.get("#email").type(mockNewUser.email);
    cy.get("#password").type(mockNewUser.password);
    cy.get("button").contains("Register").click();

    cy.contains("Register user successfully! Navigating to login page...");
  });

  it("user can login", function () {
    cy.contains("Log in").click();
    cy.get("#username").type(mockNewUser.username);
    cy.get("#password").type(mockNewUser.password);
    cy.get("button").contains("Log in").click();
    cy.get(`[data-testid="userIcon"]`).click();

    cy.contains(`Hello, ${mockNewUser.firstname} ${mockNewUser.lastname}`);
  });

  describe("when logged in", function () {
    describe("as a user", function () {
      beforeEach(function () {
        cy.contains("Log in").click();
        cy.get("#username").type(mockNewUser.username);
        cy.get("#password").type(mockNewUser.password);
        cy.get("button").contains("Log in").click();
        cy.wait(500);
      });

      it("can favorite a single pet", function () {
        cy.contains("Find a pet").click();
        cy.contains(mockPet.type.name).click();
        cy.contains(mockPet.name).click();

        cy.get("[data-testid=addFavoriteBtn]").click();
        cy.get("[data-testid=addFavoriteBtn]").should("not.exist");
      });

      describe("profile page", function () {
        beforeEach(function () {
          cy.get(`[data-testid="userIcon"]`).click();
          cy.wait(500);
          cy.contains("Profile").click();
        });

        it("can be viewed", function () {
          cy.contains(mockNewUser.firstname);
          cy.contains(mockNewUser.lastname);
          cy.contains(mockNewUser.username);
          cy.contains(mockNewUser.email);
        });

        it("can be used to update information", function () {
          cy.contains("Edit information").click();

          cy.contains("Update personal profile");
          cy.get("#email").clear();
          cy.get("#email").type(mockNewUser.emailUpdated, { delay: 0 });
          cy.contains("Save changes").click();

          cy.contains("Update user successfully!");
          cy.contains(mockNewUser.emailUpdated);
          cy.contains(mockNewUser.email).should("not.exist");
        });
      });

      describe("favorite pets page", function () {
        beforeEach(function () {
          cy.get(`[data-testid="userIcon"]`).click();
          cy.wait(500);
          cy.contains("Favorite pets").click();
        });

        it("can be viewed", function () {
          cy.contains(mockNewUser.favorites[0].name);
        });

        it("can be used to navigate to adoption form", function () {
          cy.contains("Start adoption process").click();

          cy.contains("Submit your application");
          cy.contains("Contact info");
          cy.contains(mockNewUser.firstname);
          cy.contains(mockNewUser.lastname);
          cy.contains(mockNewUser.emailUpdated);
          cy.contains("I want to adopt");
          cy.contains(mockNewUser.favorites[0].name);
          cy.contains("Adoption Fee:");
          cy.contains(mockNewUser.favorites[0].adoptionFee);
        });
      });

      it("can log out", function () {
        cy.get(`[data-testid="userIcon"]`).click();
        cy.wait(500);
        cy.contains("Log out").click();
        cy.location("pathname").should("eq", "/pet-adoption-app");
      });
    });

    describe("as an admin", function () {
      beforeEach(function () {
        cy.contains("Log in").click();
        cy.get("#username").type(mockAdmin.username);
        cy.get("#password").type(mockAdmin.password);
        cy.get("button").contains("Log in").click();
        cy.wait(500);
      });

      describe("admin panel page", function () {
        beforeEach(function () {
          cy.get(`[data-testid="userIcon"]`).click();
          cy.wait(500);
          cy.contains("Admin panel").click();
        });

        it("can be viewed", function () {
          cy.contains("Animals management");
          cy.contains("Pets management");
          cy.contains("Users management");
        });

        describe("animals management component", function () {
          beforeEach(function () {
            cy.contains("Animals management").click();
          });

          it("can be used to view animals", function () {
            cy.contains("List of animals");
          });

          it("can be used to add animals", function () {
            cy.contains("Add new animal").click();
            cy.get("#name").type(mockNewAnimal.name);
            cy.contains("Add animal").click();

            cy.contains("Add animal successfully!");
            cy.contains(mockNewAnimal.name);
          });

          it("can be used to search animals", function () {
            cy.get(`input[placeholder="Search for animal name"]`).type(
              mockAnimal.name
            );
            cy.get(`[data-testid="searchAnimalNameBtn"]`).click();

            cy.contains(mockAnimal.name);
            cy.contains(mockNewAnimal.name).should("not.be.visible");
          });

          it("can be used to delete animals", function () {
            cy.get(`#deleteAnimalBtn-${mockNewAnimal.name}`).click();

            cy.contains("Are you sure you want to delete this animal?");
            cy.contains(
              "Doing so will delete all pets belong to this animal type."
            );

            cy.contains("Confirm Delete").click();

            cy.contains("Delete animal successfully!");
            cy.contains(mockNewAnimal.name).should("not.be.visible");
          });
        });

        describe("pets management component", function () {
          beforeEach(function () {
            cy.contains("Pets management").click();
          });

          it("can be used to view pets", function () {
            cy.contains("List of pets");
          });

          it("can be used to add pets", function () {
            cy.contains("Add new pet").click();

            cy.get("#name").type(mockNewPet.name);
            cy.wait(500);
            cy.get("#type").type(mockNewPet.type.name);
            cy.get("#breed").type(mockNewPet.breed);
            cy.get("#location").type(mockNewPet.location);
            cy.get("#description").type(mockNewPet.description);
            cy.get("#adoptionFee").clear();
            cy.get("#adoptionFee").type(mockNewPet.adoptionFee);
            cy.get("#age").select(mockNewPet.characteristic.age);
            cy.get(
              `#gender-${mockNewPet.characteristic.gender.toLowerCase()}`
            ).click();
            cy.get("#size").select(mockNewPet.characteristic.size);
            cy.get("#personality").type(
              mockNewPet.characteristic.personality.join(", ")
            );
            cy.get("#coatLength").type(mockNewPet.characteristic.coatLength);
            cy.get(
              `${
                mockNewPet.characteristic.houseTrained
                  ? "#houseTrained-yes"
                  : "#houseTrained-no"
              }`
            ).click();
            cy.get("#health").type(mockNewPet.characteristic.health.join(", "));

            cy.contains("Add pet").click();

            cy.contains("Add pet successfully!");
            cy.contains(mockNewPet.name);
            cy.contains(mockNewPet.type.name);
          });

          it("can be used to search pets", function () {
            cy.get(`input[placeholder="Search for pet name"]`).type(
              mockPet.name
            );
            cy.get(`[data-testid="searchPetNameBtn"]`).click();

            cy.contains(mockPet.name);
            cy.contains(mockNewPet.name).should("not.exist");
          });

          it("can be used to edit pets", function () {
            cy.contains(mockNewPet.name).click();

            const el = cy.get(`input[value="${mockNewPet.name}"]`);
            el.clear();
            el.type(mockNewPet.nameUpdated);
            cy.get("button:visible").contains("Submit").click();

            cy.contains("Update pet successfully!");
            cy.wait(500);
            cy.contains(mockNewPet.nameUpdated);
            cy.contains(/^mockNewPet.name$/).should("not.exist");
          });

          it("can be used to delete pets", function () {
            cy.contains(mockNewPet.nameUpdated)
              .parent()
              .find(`[data-testid="deletePetBtn"]`)
              .click();
            cy.contains("Are you sure you want to delete this pet?");
            cy.contains(
              "Doing so will permanently delete this pet and all its properties."
            );

            cy.contains("Confirm Delete").click();

            cy.contains("Delete pet successfully!");
            cy.wait(500);
            cy.contains(mockNewPet.nameUpdated).should("not.exist");
          });
        });

        describe("users management component", function () {
          beforeEach(function () {
            cy.contains("Users management").click();
          });

          it("can be used to view users", function () {
            cy.contains("List of users");
          });

          it("can be used to search users", function () {
            cy.get(`input[placeholder="Search for username"]`).type(
              mockNewUser.username
            );
            cy.get(`[data-testid="searchUserNameBtn"]`).click();

            cy.contains(mockNewUser.username);
            cy.contains(mockAdmin.username).should("not.exist");
          });

          it("can be used to update user role", function () {
            cy.contains(mockNewUser.username)
              .parent()
              .find(`[data-testid="userRoleSelect"]`)
              .select("ADMIN");
            cy.contains("Update user successfully!");

            // reset role
            cy.contains(mockNewUser.username)
              .parent()
              .find(`[data-testid="userRoleSelect"]`)
              .select("USER");
          });
        });
      });

      it("can log out", function () {
        cy.get(`[data-testid="userIcon"]`).click();
        cy.contains("Log out").click();
        cy.location("pathname").should("eq", "/pet-adoption-app");
      });
    });
  });

  describe("about us page", function () {
    it("can be viewed", function () {
      cy.contains("About us").click();
      cy.contains("Lorem ipsum dolor sit amet, consectetur adipisicing elit.");
    });
  });

  describe("pet list page", function () {
    beforeEach(function () {
      cy.contains("Find a pet").click();
      cy.wait(500);
      cy.contains(mockPet.type.name).click();
    });

    it("can be viewed", function () {
      cy.contains(mockPet.name);
    });

    it("can be used to view a single pet", function () {
      cy.contains(mockPet.name).click();

      cy.contains(mockPet.name);
      cy.contains(mockPet.breed);
      cy.contains(mockPet.location);
      cy.contains(mockPet.description);
      cy.contains(mockPet.adoptionFee);
      cy.contains(mockPet.characteristic.age);
      cy.contains(mockPet.characteristic.gender);
      cy.contains(mockPet.characteristic.size);
      cy.contains(mockPet.characteristic.coatLength);
      cy.contains(mockPet.characteristic.houseTrained);
      mockPet.characteristic.personality.map((per) => cy.contains(per));
      mockPet.characteristic.health.map((health) => cy.contains(health));
    });

    it("can be filtered", function () {
      cy.contains("Age")
        .parent()
        .find(`[data-testid="filterDropdown"]`)
        .click();
      cy.contains("Adult").click();

      cy.contains(mockPet.name).should("not.exist");
    });
  });

  describe("single pet page", function () {
    beforeEach(function () {
      cy.contains("Log in").click();
      cy.get("#username").type(mockNewUser.username);
      cy.get("#password").type(mockNewUser.password);
      cy.get("button").contains("Log in").click();

      cy.wait(500);

      cy.contains("Find a pet").click();
      cy.contains(mockPet.type.name).click();
      cy.contains(mockPet.name).click();
    });

    it("can be viewed", function () {
      cy.contains(mockPet.name);
      cy.contains(mockPet.breed);
      cy.contains(mockPet.location);
    });

    it("can be used to navigate to faq page", function () {
      cy.contains("Read FAQs").click();

      cy.contains("FAQs");
      cy.contains("How do I search for a pet?");
      cy.contains("How do I adopt a pet?");
      cy.contains("Can I return the pet I adopted?");
      cy.contains(
        "Do you still have a question? Contact us and we'll be happy to help."
      );
    });

    it("can be used to navigate to adoption form", function () {
      cy.contains("Fill the form").click();

      cy.contains("Submit your application");
      cy.contains("Contact info");
      cy.contains(mockNewUser.firstname);
      cy.contains(mockNewUser.lastname);
      cy.contains(mockNewUser.emailUpdated);
      cy.contains("I want to adopt");
      cy.contains(mockNewUser.favorites[0].name);
      cy.contains("Adoption Fee:");
      cy.contains(mockNewUser.favorites[0].adoptionFee);
    });
  });

  describe("adopt a pet page", function () {
    describe("when not logged in", function () {
      it("shows correct content", function () {
        cy.contains("Adopt a pet").click();
        cy.contains("Login to start adopting a pet!");
        cy.contains("Login");
        cy.contains("Go back");
      });
    });

    describe("when logged in", function () {
      it("shows correct content", function () {
        cy.contains("Log in").click();
        cy.get("#username").type(mockNewUser.username);
        cy.get("#password").type(mockNewUser.password);
        cy.get("button").contains("Log in").click();

        cy.wait(500);

        cy.contains("Adopt a pet").click();

        cy.contains("Submit your application");
        cy.contains("Contact info");
        cy.contains(mockNewUser.firstname);
        cy.contains(mockNewUser.lastname);
        cy.contains(mockNewUser.emailUpdated);
        cy.contains("I want to adopt");
        cy.get(`input[placeholder="Select a pet"]`);
        cy.contains("Adoption Fee:");
        cy.contains("€0.00");
      });
    });
  });

  describe("", function () {
    it("user can delete their account", function () {
      cy.contains("Log in").click();
      cy.get("#username").type(mockNewUser.username);
      cy.get("#password").type(mockNewUser.password);
      cy.get("button").contains("Log in").click();

      cy.wait(500);

      cy.get(`[data-testid="userIcon"]`).click();
      cy.contains("Profile").click();
      cy.contains("Delete account").click();

      cy.contains("Are you sure you want to delete your account?");
      cy.contains(
        "Doing so will permanently delete your account from our database."
      );

      cy.contains("Confirm Delete").click();
      cy.location("pathname").should("eq", "/pet-adoption-app");
    });
  });
});
