class AdjustHotelReservations < ActiveRecord::Migration
  def up
    add_column :hotel_reservations, :food_comments, :text unless column_exists?(:hotel_reservations, :food_comments) 
  end

  def down
    remove_column :hotel_reservations, :food_comments
  end
end