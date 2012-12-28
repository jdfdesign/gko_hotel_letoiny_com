class HotelReservation < ActiveRecord::Base
  
  belongs_to :site
  
  has_many :table_reservations, :order => :book_date, :dependent => :destroy
  accepts_nested_attributes_for :table_reservations
  
  has_many :spa_reservations, :order => :book_date, :dependent => :destroy
  accepts_nested_attributes_for :spa_reservations
  
  has_many :baby_sitter_reservations, :order => :book_date, :dependent => :destroy
  accepts_nested_attributes_for :baby_sitter_reservations
  
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

   :activity_comments, 

   :suite_preferences_comments, 
   :additional_service_comments, 
   :about_comments, 
   :guest_count,
   :child_count,
   :arrival_airport,
   :arrival_time, 
   :arrival_flight,
   :arrival_airline,
   :departure_airport,
   :departure_time,
   :departure_flight, 
   :departure_airline,
   :transport_comments,
   :food_comments,
   :spa_reservations_attributes,
   :table_reservations_attributes,
   :baby_sitter_reservations_attributes
  )
  
  ## options ##
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
  has_option :boating_half_day_outing, :default => false, :type => :boolean 
  has_option :boating_full_day_outing, :default => false, :type => :boolean 
  has_option :sunset_cruise, :default => false, :type => :boolean
  has_option :diving, :default => false, :type => :boolean
  has_option :deep_sea_fishing, :default => false, :type => :boolean 
  has_option :jet_skiing, :default => false, :type => :boolean 
  has_option :surfing, :default => false, :type => :boolean
  has_option :windsurfing, :default => false, :type => :boolean
  has_option :car_requirement
  has_option :newspaper_requirement
     	  
  validates :reference, :presence => true
  validates :email, :presence => true
  validates :name, :presence => true
  validates :checkin, :presence => true
  validates :checkout, :presence => true
  validates :guest_count, :presence => true

end

