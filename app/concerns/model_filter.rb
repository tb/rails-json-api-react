# see https://github.com/cerebris/jsonapi-resources/issues/460
module ModelFilter
  def model_filter(name, opts = {})
    opts[:apply] = ->(records, value, _options) do
      records.public_send(name, value)
    end

    filter name, opts
  end

  def model_filters(*names)
    names.each { |name| model_filter(name, names.extract_options!) }
  end
end
