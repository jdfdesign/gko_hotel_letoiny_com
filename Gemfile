source :rubygems

group :assets do
  gem 'sass-rails',   '~> 3.2.6'
  gem 'coffee-rails', '~> 3.2.2'
  gem 'uglifier', '>= 1.0.3'
end

group :production do
  git "git@github.com:jdfdesign/gko_cms3.git", :tag => "v0.6.30.rc8" do
   gem 'gko_core'
   gem 'gko_auth'
   gem 'gko_images'
   gem "gko_documents"
   gem 'gko_inquiries'
   gem 'gko_newsletters'
   gem 'gko_twits' 
   gem 'gko_hotel'  
   gem 'gko_categories' 
   gem 'gko_image_bank'
  end
  gem 'gko_concierge', '0.0.06', :git => 'git@github.com:jdfdesign/gko_concierge.git'
end

#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_images", :path => '~/Github/gko_cms3/gko_images'
#  gem "gko_documents", :path => '~/Github/gko_cms3/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_blog", :path => '~/Github/gko_cms3/gko_blog'
#  gem "gko_newsletters", :path => '~/Github/gko_cms3/gko_newsletters'
#  gem "gko_twits", :path => '~/Github/gko_cms3/gko_twits' 
#  gem "gko_hotel", :path => '~/Github/gko_cms3/gko_hotel'
#  gem "gko_categories", :path => '~/Github/gko_cms3/gko_categories'
#  gem "gko_image_bank", :path => '~/Github/gko_cms3/gko_image_bank'
#  gem "gko_concierge", :path => '~/Github/gko/gko_concierge'
#end
