JSONAPI.configure do |config|
  # built in paginators are :none, :offset, :paged
  config.default_paginator = :none
  config.default_page_size = 10
  config.maximum_page_size = 999
  config.top_level_meta_include_record_count = true
  config.top_level_meta_record_count_key = :total
end
