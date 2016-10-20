ActiveAdmin.register Organizacion do
    permit_params :id, :nombre, :descripcion, :logo, :banner
    menu label: "Organizaciones", priority: 2
    config.sort_order = 'id_asc'
    
    index do
      selectable_column
      column "ID", :id
      column "Nombre", :nombre
      column "Descripción", :descripcion
      # column "Banner", :banner do |obj|
      #   image_tag(obj.banner.url)
      # end
    actions
    end

    form multipart: true do |f|
      f.inputs "Organización" do
        f.input :nombre, :label => "Nombre"
        f.input :descripcion, :label => "Descripción" 
        f.input :logo, as: :file, hint: image_tag(f.object.logo.url), label: "Logo"
        f.input :banner, as: :file, hint: image_tag(f.object.banner.url), label: "Banner"
      end
      f.actions
    end

    show do |b|
      attributes_table do
        row :nombre, :label => "Nombre"
        row :descripcion, :label => "Descripción"
        row :logo, :label => "Logo" do
          image_tag(b.logo.url)
        end
        row :urllogo do
          b.logo.url
        end
        row :banner, :label => "Banner" do
          image_tag(b.banner.url)
        end
        row :urlbanner do
          b.banner.url
        end
      end
      # active_admin_comments
    end
end