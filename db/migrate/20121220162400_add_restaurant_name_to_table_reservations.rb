class AddRestaurantNameToTableReservations < ActiveRecord::Migration
  def up
    add_column :table_reservations, :restaurant_name, :string
    add_column :table_reservations, :lunch, :boolean, :default => false
  end

  def down
    remove_column :table_reservations, :restaurant_name
    remove_column :table_reservations, :lunch
  end
end