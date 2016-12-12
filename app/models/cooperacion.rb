class Cooperacion < ActiveRecord::Base
    has_one :organizacion
    
    has_attached_file :banner, 
        :storage => :google_drive,
        :google_drive_credentials => "#{Rails.root}/config/google_drive.yml",
        :google_drive_options => {
            :public_folder_id => "0BxckPDmdZqdpYWgzbnVwUEhPVVU",
            :default_image => "missing.png", 
            :path => proc { |style| "#{style}_#{id}_#{banner.original_filename}"
        }
    }
        
    validates_attachment :banner, 
        content_type:{content_type:["image/jpg","image/jpeg","image/png"]},
        size: { in: 0..1000.kilobytes }
    
    validates_presence_of :organizacion1, :organizacion2, :descripcion, :banner
    validates :organizacion1, uniqueness: { scope: :organizacion2 } 
    validate :check_organizaciones
    validates :descripcion, length: { maximum: 1000,
    too_long: "Se ha excedido el máximo de %{count} caracteres" }

    def check_organizaciones
        errors.add(:organizacion1, "Las Organizaciones no pueden ser iguales") if organizacion1 == organizacion2
    end
    
end