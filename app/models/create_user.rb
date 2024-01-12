class CreateUser < ApplicationRecord
  has_secure_password 
  before_validation :ensure_session_token

  validates :email, uniqueness: true, length: { in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, uniqueness: true, length: { in: 3..15 }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 7..40 }, allow_nil: true

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :name
    user = CreateUser.find_by(field => credential)
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
      return token unless CreateUser.exists?(session_token: token)
    end 
  end

end
