class User < ApplicationRecord
  has_secure_password 
  before_validation :ensure_session_token

  validates :email, uniqueness: true, length: { in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, uniqueness: true, length: { in: 3..50 }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 7..40 }, allow_nil: true

  # has_many :products, class_name: 'product', foreign_key: 'seller_id'
  has_many :carts



  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :name
    user = User.find_by(field => credential)
    if user&.authenticate(password)
      return user 
    else 
      nil 
    end
  end
  
  def reset_session_token! 
    self.session_token = generate_unique_session_token
    self.save!
    session_token
  end
  
  private 

  def ensure_session_token 
    self.session_token ||= generate_unique_session_token
  end 
  
  def generate_unique_session_token
    while true 
      token = SecureRandom.urlsafe_base64 
      return token unless User.exists?(session_token: token)
    end 
  end

end
