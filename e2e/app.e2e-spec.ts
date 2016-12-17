import { AngularTimePage } from './app.po';

describe('angular-time App', function() {
  let page: AngularTimePage;

  beforeEach(() => {
    page = new AngularTimePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
