class BrowserContainer
  def initialize(browser)
    @browser = browser
  end
end

class Site < BrowserContainer
  def test_page
    @test_page = TestPage.new(@browser)
  end

  def close
    @browser.close
  end
end # Site

class TestPage < BrowserContainer
  URL = 'file:///Users/mgw/Documents/CVs/Jobs/BBC%20Principal:Senior%20Web%20Developer%20913464/913464-technical-test/index.html'

  def open
    @browser.goto URL
    self
  end

  def amount_field
    @browser.text_field(:name => "amount")
  end

  def factor_button
    @browser.button(:id => "factor")
  end

  def result_field
    @browser.text_field(:id => "result").to_s
  end
  
  def loaded
    self.factor_button.exists?
  end

end # TestPage
