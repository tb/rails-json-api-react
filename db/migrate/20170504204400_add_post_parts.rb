class AddPostParts < ActiveRecord::Migration[5.0]
  def change
    remove_column :posts, :body
    add_column :posts, :parts, :json
    execute "ALTER TABLE posts ALTER COLUMN parts SET DEFAULT '[]'::JSON"
  end
end
