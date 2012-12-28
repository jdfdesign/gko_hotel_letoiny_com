class AddDefaultValueHotelReservations < ActiveRecord::Migration
  def up
    change_column :table_reservations, :guests, :integer, :default => 2 
    change_column :spa_reservations, :guests, :integer, :default => 1
    add_column :spa_reservations, :start_time, :time, :site_id unless column_exists?(:spa_reservations, :start_time)
    remove_column :spa_reservations, :site_id if column_exists?(:spa_reservations, :site_id) 
    remove_column :table_reservations, :site_id if column_exists?(:table_reservations, :site_id) 
    remove_column :baby_sitter_bookings, :site_id if column_exists?(:baby_sitter_bookings, :site_id) 
    add_column :baby_sitter_bookings, :start_time, :time unless column_exists?(:baby_sitter_bookings, :start_time)
    change_column :baby_sitter_bookings, :children, :integer, :default => 1
    change_column :baby_sitter_bookings, :duration, :string
    rename_column :baby_sitter_bookings, :start_book_date, :book_date if column_exists?(:baby_sitter_bookings, :start_book_date)
    
    
  end

end