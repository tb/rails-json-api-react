class Post < ApplicationRecord
  belongs_to :category
  has_many :comments, dependent: :destroy

  validates :title, presence: true, uniqueness: true

  scope :title_contains, -> (value) { where('title ILIKE ?', "%#{value.join}%") }
end
