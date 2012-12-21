# app/controllers/admin/hotel_reservations.rb
class Admin::HotelReservationsController < Admin::ResourcesController
  belongs_to :site
  respond_to :html, :js
end