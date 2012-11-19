require "watir-webdriver"
require "features/step_definitions/testpage.rb"

$browser = Watir::Browser.new(:chrome)
 
Before do
#  @browser = browser
end
 
at_exit do
  $browser.close
end

module SiteHelper
  def site
    @site ||= Site.new($browser)
  end
end

World(SiteHelper)
