require_dependency 'layouts/mobile_base.rb'
class Layouts::Mobile < Layouts::MobileBase
  include do
    def html
      content_for :after_stylesheet_libraries do
        stylesheet_link_tag("mobile", "slideshow", "mobile.slideshow.css", :cache => "compiled/mobile")
      end
      content_for :after_javascript_libraries do
        javascript_include_tag("jquery.lightbox.js", "webcam", :cache => "compiled/mobile")
      end
      super
    end
  end
end
