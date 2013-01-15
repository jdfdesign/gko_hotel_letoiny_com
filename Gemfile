source :rubygems

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.5'
  gem 'coffee-rails', '~> 3.2.2'
  gem 'uglifier', '>= 1.0.3'
end

prod_location = 'git@github.com:jdfdesign/gko_cms3.git'
prod_version = "= 0.6.04"

group :production do
 gem 'gko_core', prod_version, :git => prod_location
 gem 'gko_auth', prod_version, :git => prod_location
 gem 'gko_images', prod_version, :git => prod_location
 gem "gko_documents", prod_version, :git => prod_location
 gem 'gko_inquiries', prod_version, :git => prod_location
 gem 'gko_newsletters', prod_version, :git => prod_location
 gem 'gko_twits', prod_version, :git => prod_location 
 gem 'gko_hotel', prod_version, :git => prod_location  
 gem 'gko_categories', prod_version, :git => prod_location 
 gem 'gko_image_bank', prod_version, :git => prod_location
 gem 'gko_concierge', '0.0.03', :git => 'git@github.com:jdfdesign/gko_concierge.git'
end

#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_images", :path => '~/Github/gko_cms3/gko_images'
#  gem "gko_documents", :path => '~/Github/gko_cms3/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_newsletters", :path => '~/Github/gko_cms3/gko_newsletters'
#  gem "gko_twits", :path => '~/Github/gko_cms3/gko_twits' 
#  gem "gko_hotel", :path => '~/Github/gko_cms3/gko_hotel'
#  gem "gko_categories", :path => '~/Github/gko_cms3/gko_categories'
#  gem "gko_image_bank", :path => '~/Github/gko_cms3/gko_image_bank'
#  gem "gko_concierge", :path => '~/Github/gko/gko_concierge'
#end
