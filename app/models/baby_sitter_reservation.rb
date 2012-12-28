class BabySitterBooking < ActiveRecord::Base
  
  belongs_to :hotel_reservation
  
  attr_accessible(
   :book_date,
   :children,
   :duration,
   :comments
  )

  validates :book_date, :presence => true
  validates :children, :presence => true
  validates :duration, :presence => true
  validates :hotel_reservation_id, :presence => true

end