class SpaReservation < ActiveRecord::Base

  belongs_to :hotel_reservation
  
  attr_accessible(
   :book_date,
   :guests,
   :service_name
  )

  validates :book_date, :presence => true
  validates :service_name, :presence => true
  validates :guests, :presence => true
  validates :hotel_reservation_id, :presence => true

end

