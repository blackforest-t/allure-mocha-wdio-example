import { log } from "../config/log4js.config";
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string) {
    const url = `https://the-internet.herokuapp.com/${path}`;
    log.debug(` [ACTION] -> going to ${url}`);
    return browser.url(url);
  }
}
