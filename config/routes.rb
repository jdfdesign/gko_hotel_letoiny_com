GkoLetoinyCom::Application.routes.draw do
  
  resources :hotel_reservations
  
  namespace :admin do
    resources :sites do
      resources :hotel_reservations
    end
  end
end
