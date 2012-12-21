Site.class_eval do
  has_many :hotel_reservations, :dependent => :destroy
end