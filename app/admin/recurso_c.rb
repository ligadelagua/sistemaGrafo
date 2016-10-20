ActiveAdmin.register RecursoC do
  
    permit_params :id, :nombreC, :titulo, 
                  :recursoUrl, :recursoUpload
    menu parent: "Añadir Recursos", label: "Cooperación", priority: 4
    config.sort_order = 'id_asc'
    
    index do
      selectable_column
      # column "ID", :id
      column "Nombre Cooperación", :nombreC
      column "Título Recurso", :titulo
      # column "Tipo Recurso", :tipo
    actions
    end
    
    form multipart: true do |f|
      f.inputs "Recursos Cooperaciones" do
        f.input :nombreC, :as => :select, :collection =>
            Cooperacion.all.map {|cooperacion|
              [cooperacion.organizacion1+" + "+cooperacion.organizacion2] },
            label: "Nombre Cooperación"
         
        f.input :titulo, :label => "Título Recurso"   
        f.input :recursoUrl, :label => "Añadir Url"
        f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
            label: "Añadir recurso"
          
        # f.input :tipo, :as => :select, :collection => ["Imagen", "Archivo", "Vídeo"],
        #     :label => "Tipo Recurso"
        # f.input :tipoCarga, :as => :select, :collection => ["URL", "Subir Archivo"],
        #     :label => "Subir como"
            
        # if f.object.tipoCarga == "URL" 
        #   f.input :recursoUrl, :label => "Añadir Url", :input_html => { :disabled => false}
        #   f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
        #     label: "Añadir recurso", :input_html => { :disabled => true }
        # elsif f.object.tipoCarga == "Subir Archivo" 
        #   f.input :recursoUrl, :label => "Añadir Url", :input_html => { :disabled => true}
        #   f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
        #     label: "Añadir recurso", :input_html => { :disabled => false }
        # elsif f.object.tipoCarga == "" 
        #   f.input :recursoUrl, :label => "Añadir Url", :input_html => { :disabled => true}
        #   f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
        #     label: "Añadir recurso", :input_html => { :disabled => true}
        # end
        
      end
      f.actions
    end
    
    show do |b|
      attributes_table do
        row :nombreC, :label => "Nombre Cooperación"
        row :titulo, :label => "Título Recurso" 
    
        # row :tipo, :label => "Tipo de recurso" 
        # row :tipoCarga, :label => "Subido Como" 
        
        row :recursoUrl, :label => "URL"
        row :recursoUpload, :label => "Recurso Subido" do
          image_tag(b.recursoUpload.url)
        end
        row :urlRecursoSubido do
          b.recursoUpload.url
        end
      end
    end

end
