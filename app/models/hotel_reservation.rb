class HotelReservation < ActiveRecord::Base
  
  belongs_to :site
  
  has_many :table_reservations, :dependent => :destroy
  accepts_nested_attributes_for :table_reservations
  
  has_many :spa_reservations, :dependent => :destroy
  accepts_nested_attributes_for :spa_reservations
  
  attr_accessible(
   :reference,
   :email,
   :name,
   :language,
   :checkin,
   :checkout,
   :address,
   :address2,
   :city,
   :state_id,
   :zip,
   :country_id,
   :phone,
   :guest_count,
   :child_count,
   :airline,
   :flight,
   :arrival_airport,
   :arrival_time,
   :departure_airport,
   :departure_time,
   :activity_comments, 
   :arrival_airline, 
   :departure_flight, 
   :departure_airline, 
   :suite_preferences_comments, 
   :additional_service_comments, 
   :about_comments, 
   :arrival_flight, 
   :transport_comments
  )
  
  ## options ##
  has_option :transfer_option , :default => false, :type => :boolean   
    
  #has_option :car_rental, :default => false, :type => :boolean
  #has_option :transport_to_hotel, :default => false, :type => :boolean
  #has_option :car_seat, :default => false, :type => :boolean
  
  has_option :extra_pillows, :default => false, :type => :boolean
  has_option :hypoallergenic_pillows, :default => false, :type => :boolean
  has_option :high_chair, :default => false, :type => :boolean
  has_option :rollaway_bed, :default => false, :type => :boolean
  has_option :kosher_utensils, :default => false, :type => :boolean
  has_option :private_chef, :default => false, :type => :boolean
  has_option :wait_staff, :default => false, :type => :boolean
  has_option :bartender, :default => false, :type => :boolean
  has_option :horseback_riding, :default => false, :type => :boolean
  has_option :sunset_cruise, :default => false, :type => :boolean
  has_option :visit_stbarth, :default => false, :type => :boolean
  has_option :visit_st_maarten, :default => false, :type => :boolean
  has_option :private_boat, :default => false, :type => :boolean
  has_option :scuba_diving, :default => false, :type => :boolean
  has_option :visit_scilly_cay, :default => false, :type => :boolean
  has_option :visit_prickly_pear, :default => false, :type => :boolean
  has_option :glass_bottom_boat_tours, :default => false, :type => :boolean
  has_option :nature_trails, :default => false, :type => :boolean
  has_option :deep_sea_fishing_trips, :default => false, :type => :boolean
  has_option :golf_at_temenos, :default => false, :type => :boolean
  has_option :scuba_diving_lessons, :default => false, :type => :boolean
  has_option :bike_tours, :default => false, :type => :boolean
  has_option :historic_tours, :default => false, :type => :boolean
  has_option :yoga_classes, :default => false, :type => :boolean
  has_option :spinning_classes, :default => false, :type => :boolean
  has_option :tennis, :default => false, :type => :boolean
  has_option :spa, :default => false, :type => :boolean
  has_option :kids_activities, :default => false, :type => :boolean

  has_option :sxm_personal_escort, :default => false, :type => :boolean
  
  # In Villa Preferences
  #allergies
  #under_three_years_old_amenities
  has_option :additional_bed, :default => 0, :type => :integer
  has_option :welcome_champagne_moet_chanfon, :default => 0, :type => :integer
  has_option :welcome_champagne_perrier_rose, :default => 0, :type => :integer 
  has_option :welcome_european_bouquet, :default => 0, :type => :interger
  has_option :welcome_european_bouquet_price, :default => 0, :type => :integer
  has_option :welcome_exotic_bouquet, :default => 0, :type => :integer
  has_option :welcome_exotic_bouquet_price, :default => 0, :type => :integer
  has_option :welcome_colorful_fruit_plate, :default => 0, :type => :integer
  has_option :welcome_cheese_cracker_plate, :default => 0, :type => :integer
  has_option :food_allergies
  has_option :food_preference
  has_option :yoga_personal_trainer, :default => false, :type => :boolean
  has_option :pilates_personal_trainer, :default => false, :type => :boolean
  has_option :fitness_personal_trainer, :default => false, :type => :boolean
  has_option :natural_hike, :default => false, :type => :boolean
  has_option :island_tour, :default => false, :type => :boolean
  has_option :tennis, :default => false, :type => :boolean	 
  has_option :tennis_with_pro, :default => false, :type => :boolean  
  has_option :boating_half_ay_outing, :default => false, :type => :boolean 
  has_option :boating_full_day_outing, :default => false, :type => :boolean 
  has_option :sunset_cruise, :default => false, :type => :boolean
  has_option :diving, :default => false, :type => :boolean
  has_option :deep_sea_fishing, :default => false, :type => :boolean 
  has_option :jet_skiing, :default => false, :type => :boolean 
  has_option :surfing, :default => false, :type => :boolean
  has_option :windsurfing, :default => false, :type => :boolean
     	  
  validates :reference, :presence => true
  validates :email, :presence => true
  validates :name, :presence => true
  validates :checkin, :presence => true
  validates :checkout, :presence => true
  validates :guest_count, :presence => true

end

