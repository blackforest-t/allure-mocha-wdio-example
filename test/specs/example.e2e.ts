import LoginPage from "../pageobjects/login.page";
import SecurePage from "../pageobjects/secure.page";
import { log } from "../config/log4js.config";

describe("My Login application", () => {
  // before(() => log.info("before hook"));
  // after(() => log.info("after hook"));

  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("tomsmith", "SuperSecretPassword!");

    log.debug("    [EXPECT] -> assert element");
    await expect(SecurePage.flashAlert).toBeExisting();
    log.debug("    [EXPECT] -> assert element");
    await expect(SecurePage.flashAlert).toHaveTextContaining(
      "You logged into a secure area!"
    );
  });
});
