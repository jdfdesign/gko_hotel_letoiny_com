class TableReservation < ActiveRecord::Base

  belongs_to :hotel_reservation
  
  attr_accessible(
   :restaurant_name,
   :book_date,
   :guests,
   :lunch
  )
  
  def dinner
    !!lunch
  end
  
  validates :book_date, :presence => true
  validates :guests, :presence => true
  validates :hotel_reservation_id, :presence => true

end

