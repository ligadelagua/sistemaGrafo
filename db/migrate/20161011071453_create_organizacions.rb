class CreateOrganizacions < ActiveRecord::Migration
  def change
    create_table :organizacions do |t|
      t.string :nombre
      t.text :descripcion
      t.attachment :logo
      t.attachment :banner

      t.timestamps null: false
    end
  end
end
