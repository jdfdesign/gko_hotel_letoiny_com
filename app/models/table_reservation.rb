class TableReservation < ActiveRecord::Base
  
  belongs_to :site
  belongs_to :hotel_reservation
  
  attr_accessible(
   :restaurant_name,
   :book_date,
   :guests
  )
  
  def dinner
    !!lunch
  end
  
  validates :book_date, :presence => true
  validates :guests, :presence => true
  validates :site_id, :presence => true
  validates :hotel_reservation_id, :presence => true

end

