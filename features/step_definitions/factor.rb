require 'env.rb'

Given /^I am on the test page$/ do
  @test_page ||= site.test_page.open
  Watir::Wait.until { @test_page.loaded }
end

When /^I enter an (.*?)$/ do |amount|
  @test_page.amount_field.set amount
  @test_page.factor_button.click
end

Then /^I should see the (.*?)$/ do |denominations|
  @test_page.result_field.include? denominations
end
