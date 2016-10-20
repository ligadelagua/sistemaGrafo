class CreateRecursoCs < ActiveRecord::Migration
  def change
    create_table :recurso_cs do |t|
      t.string :nombreC
      t.string :titulo
      t.string :recursoUrl
      t.attachment :recursoUpload

      t.timestamps null: false
    end
  end
end
