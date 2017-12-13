import {binding, when} from 'cucumber-tsflow';
import {browser, by, element} from 'protractor';
import {PublicMatchFormPage} from '../../../pages/public-match/public-match-form.page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

@binding()
class CreatePublicMatchSteps {
  private datasetForm = new PublicMatchFormPage();

  @when(/^I create a public match with date "([^"]*)", court type "([^"]*)" and level "([^"]*)"$/)
  public iCreateAPublicMatch (date: string, courtType: string, level: string, callback): void {
    element(by.linkText('Public Matches')).click();
    element(by.linkText('Create New Public Match')).click();
    this.datasetForm.setStartDate(date);
    this.datasetForm.setDuration('PT60M');
    this.datasetForm.setCourtType(courtType);
    this.datasetForm.setLevel(level);
    this.datasetForm.submitForm();
    browser.waitForAngular();
    callback();
  }

}

export = CreatePublicMatchSteps;
