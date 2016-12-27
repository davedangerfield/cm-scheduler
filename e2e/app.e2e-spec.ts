import { CmSchedulerPage } from './app.po';

describe('cm-scheduler App', function() {
  let page: CmSchedulerPage;

  beforeEach(() => {
    page = new CmSchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
