require 'pages_controller'
PagesController.class_eval do
  def show
    seo_metas
    respond_with( resource, :template => template? )
  end
  def seo_metas
    unless request.xhr?
      if site.site_title_on_all_pages
        site_title = site.meta_title.presence ? site.meta_title : site.title
      else
        site_title = nil
      end

      page_title = resource.meta_title.presence ? resource.meta_title : resource.title
      @meta_title = [page_title, site_title].compact.join(" | ")
      @meta_description = resource.meta_description.presence ? resource.meta_description : truncate(strip_tags(resource.body), :length => 100)
      robot_follow = resource.respond_to?(:robot_follow) ? resource.robot_follow : false
      robot_index = resource.respond_to?(:robot_index) ? resource.robot_index : false
      @meta_robots = "#{robot_index ? "" : "no"}index, #{robot_follow ? "" : "no"}follow"
      
      if site.localized? && site.include_alternate_links
        links = []
        site.available_locales.all_codes.reject {|e| current_locale?(e.to_sym)}.each do |locale|
          links << tag( :link, :rel => :alternate, :hreflang => locale.to_s, 
                        :href => [request.protocol, request.host_with_port, resource.public_url(locale)].join)
        end
        @alternate_links = links.compact.uniq
      end
    end
  end
end
