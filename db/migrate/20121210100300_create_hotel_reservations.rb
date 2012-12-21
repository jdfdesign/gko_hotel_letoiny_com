class CreateHotelReservations < ActiveRecord::Migration
  def up
    unless table_exists?(:hotel_reservations)
      create_table :hotel_reservations do |t|
        t.integer :site_id
        t.string :reference
        t.string :email
        t.string :name
        t.string :language
        t.date :checkin
        t.date :checkout
        t.string :address
        t.string :address2
        t.string :city
        t.integer :state_id
        t.string :zip
        t.integer :country_id
        t.string :phone
        t.integer :guest_count
        t.integer :child_count
        t.string :arrival_airline
        t.integer :arrival_flight
        t.string :arrival_airport
        t.datetime :arrival_time
        t.string :departure_airport
        t.datetime :departure_time
        t.string :departure_airline
        t.integer :departure_flight
        t.text :options
        t.text :suite_preferences_comments
        t.text :about_comments
        t.text :transport_comments
        t.text :activity_comments
        t.text :additional_service_comments
        t.timestamps
      end
      add_index :hotel_reservations, :site_id
      
      create_table :table_reservations do |t|
        t.integer :site_id
        t.integer :hotel_reservation_id
        t.date :book_date
        t.integer :guests
        t.timestamps
      end
      
      add_index :table_reservations, :site_id
      add_index :table_reservations, :hotel_reservation_id
      
      create_table :spa_reservations do |t|
        t.integer :site_id
        t.integer :hotel_reservation_id
        t.date :book_date
        t.integer :guests
        t.string :service_name
        t.timestamps
      end
      
      add_index :spa_reservations, :site_id
      add_index :spa_reservations, :hotel_reservation_id
      
    end
  end

  def down
    drop_table :table_reservations
    drop_table :hotel_reservations
    drop_table :spa_reservations
  end
end

