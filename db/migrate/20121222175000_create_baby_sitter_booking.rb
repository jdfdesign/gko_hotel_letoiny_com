class CreateBabySitterBooking < ActiveRecord::Migration
  def up
    unless table_exists?(:baby_sitter_bookings)
      create_table :baby_sitter_bookings do |t|
        t.integer :site_id
        t.integer :hotel_reservation_id
        t.datetime :start_book_date
        t.integer :children
        t.decimal :duration
        t.timestamps
      end
      
      add_index :baby_sitter_bookings, :site_id
      add_index :baby_sitter_bookings, :hotel_reservation_id
    end
  end

  def down
    drop_table :baby_sitter_bookings
  end
end
