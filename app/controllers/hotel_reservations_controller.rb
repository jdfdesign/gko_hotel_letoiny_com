# app/controllers/stay_forms.rb
class HotelReservationsController < BaseController

  respond_to :html

    def new
      @hotel_reservation = site.hotel_reservations.new
      respond_with(@hotel_reservation)
    end

    def create
      @hotel_reservation = site.hotel_reservations.new(params[:hotel_reservation])
      flash[:notice] = "Successfully created hotel_reservation: #{@hotel_reservation.name}." if @hotel_reservation.save
      respond_with(@hotel_reservation, :location => edit_resource_url(site, @hotel_reservation))
    end

    def edit
      respond_with(resource)
    end

    def update
      flash[:notice] = "Successfully updated hotel_reservation." if resource.update_attributes(params[:hotel_reservation])
      respond_with(@hotel_reservation, :location => edit_resource_url(site, @hotel_reservation))
    end

  def resource
    get_resource_ivar || begin
      set_resource_ivar(end_of_association_chain.send(method_for_find, params[:id]))
    end
  end
  
 protected
 
 def layout?
   "prepare_stay"
 end
 
end