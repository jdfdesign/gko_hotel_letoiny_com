require 'pages_controller'
PagesController.class_eval do
  def load_homepage_datas
    @twits ||= site.twits.visible.with_translations(I18n.locale).order("twits.published_at ASC").limit(3)
  end
end
